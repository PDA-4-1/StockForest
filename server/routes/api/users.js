var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();
const bcrypt = require("bcrypt");
const { createToken, verifyToken } = require("../../utils/auth");

function getRandomInt1to4() {
    return Math.floor(Math.random() * 4) + 1;
}

router.get("/", async (req, res) => {
    //TODO : 사용자 정보 불러오기(nickname, 수익률, pdi, 턴, 프로필사진)
    const token = req.cookies.authToken;

    if (!token) {
        return res.status(401).json({ permission: "access denied" });
    }

    const decoded = verifyToken(token);
    const userId = decoded.id;

    const query = `SELECT nickname, avg_price as user_pdi, turn, img FROM user u join hold_stock h on u.id = h.user_id where u.id = ? and h.stock_id = 10;`;
    const query2 = `SELECT user_returns from ranking WHERE user_id = ?;`;

    try {
        const [result] = await pool.query(query, [userId]);
        const [result2] = await pool.query(query2, [userId]);
        if (result.length === 0 || result2.length === 0) {
            return res.status(404).send("유저를 찾을 수 없습니다.");
        }
        result[0] = {
            ...result[0],
            user_returns: result2[0].user_returns,
        };
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/signup", async (req, res) => {
    //회원가입 로직
    try {
        const { nickname, password } = req.body;

        const [nicknameRows] = await pool.query(
            "SELECT nickname FROM user WHERE nickname = ?",
            [nickname]
        );

        if (nicknameRows.length > 0) {
            const error = new Error("이미 존재하는 닉네임입니다.");
            error.name = "NicknameDuplicatedError";
            throw error;
        }

        // 비밀번호 해시화
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const img = getRandomInt1to4();
        // 사용자 생성
        const [result] = await pool.query(
            "INSERT INTO user (nickname, password, turn, img) VALUES (?, ?, ?, ?)",
            [nickname, hashedPassword, 1, img]
        );

        // 생성된 유저의 ID 가져오기
        const userId = result.insertId;

        // ranking 테이블에 유저 ID 삽입
        await pool.query("INSERT INTO ranking (user_id) VALUES (?)", [userId]);

        // hold_stock 테이블에 유저 기본 정보 삽입
        await pool.query(
            "INSERT INTO hold_stock (user_id, stock_id, quantity, avg_price, returns) VALUES (?, ?, ?, ?, ?)",
            [userId, 10, 1, 100000, 0]
        );
        // 생성된 사용자 정보 반환
        res.status(200).json(nickname);
    } catch (err) {
        if (err.name === "NicknameDuplicatedError") {
            return res.status(409).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { nickname, password } = req.body;

        // 사용자 조회
        const [userRows] = await pool.query(
            "SELECT * FROM user WHERE nickname = ?",
            [nickname]
        );
        if (userRows.length === 0) {
            const error = new Error("존재하지 않는 아이디입니다.");
            error.name = "IdNotFoundError";
            throw error;
        }

        const user = userRows[0];

        // 비밀번호 비교
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            const error = new Error("비밀번호가 일치하지 않습니다.");
            error.name = "PasswordMismatchError";
            throw error;
        }

        // 토큰 생성
        const tokenMaxAge = 60 * 60 * 24 * 3;
        const token = createToken(
            { id: user.id, nickname: user.nickname },
            tokenMaxAge
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: tokenMaxAge * 1000,
        });

        res.status(200).json({ id: user.id, nickname: user.nickname });
    } catch (err) {
        console.error("Error occurred:", err);
        if (err.name === "IdNotFoundError") {
            return res.status(404).json({ message: err.message });
        } else if (err.name === "PasswordMismatchError") {
            return res.status(401).json({ message: err.message });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch("/ending", async (req, res) => {
    //TODO: 모든 턴 종료시 사용자 정보 비우기
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.status(401).json({ permission: "access denied" });
        }

        const decoded = verifyToken(token);
        const userId = decoded.id;
        //user table -> turn 초기화
        const query = `Update user set turn=1 where id=?;`;
        await pool.query(query, [userId]);

        //hold_stock table -> 해당 유저 값 다 삭제
        const del_hold_stock_query = `Delete from hold_stock where user_id=?;`;
        await pool.query(del_hold_stock_query, [userId]);
        const add_hold_stock_query = `Insert into hold_stock values (?,10,1,10000,0);`;
        await pool.query(add_hold_stock_query, [userId]);

        //ranking table -> 해당 유저 값 다 삭제
        const set_ranking_query = `Update ranking set user_pdi=100000, user_returns=0 where user_id=?;`;
        await pool.query(set_ranking_query, [userId]);

        res.status(200).send("reset success");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
