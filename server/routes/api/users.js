var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.post("/signup", async (req, res) => {
    //TODO : 회원가입 로직 구현
});

router.post("/signin", async (req, res) => {
    //TODO : 로그인 로직 구현
});

router.get("/exist/:nick", async (req, res) => {
    //TODO : 닉네임 중복 확인 로직 구현
});

router.get("/:id", async (req, res) => {
    //TODO : 사용자 정보 불러오기(nickname, 수익률, pdi, 턴, 프로필사진)
    const query = `SELECT nickname, user_returns, user_pdi, turn, img FROM user u join stockforest.rank r on u.id = r.user_id where u.id = ?`;
    try {
        const [result] = await pool.query(query, [req.params.id]);
        if (result.length === 0) {
            return res.status(404).send("User not found");
        }
        console.log(result[0].nickname);
        res.send(result[0].nickname);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
