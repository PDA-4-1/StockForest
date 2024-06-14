var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/auth");

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

        // 사용자 생성
        const [result] = await pool.query(
            "INSERT INTO user (nickname, password, turn, img) VALUES (?, ?, ?, ?)",
            [nickname, hashedPassword, 0, 1]
        );

         // 생성된 유저의 ID 가져오기
        const userId = result.insertId;

        // ranking 테이블에 유저 ID 삽입
        await pool.query(
            "INSERT INTO ranking (user_id) VALUES (?)",
            [userId]
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

router.get("/exist/:nick", async (req, res) => {
    //TODO : 닉네임 중복 확인 로직 구현
});

router.get("/:id", async (req, res) => {
    //TODO : 사용자 정보 불러오기(nickname, 수익률, pdi, 턴, 프로필사진)
    const query = `SELECT nickname, user_returns, user_pdi, turn, img FROM user u join ranking r on u.id = r.user_id where u.id = ?`;
    try {
        const [result] = await pool.query(query, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).send("유저를 찾을 수 없습니다.");
        }
        res.send(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
