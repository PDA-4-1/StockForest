var express = require("express");
var pool = require("../../config/db.connect.js");
const { verifyToken } = require("../../utils/auth.js");
var router = express.Router();

router.get("/", async (req, res) => {
    // 사용자 농장 식물(주식)정보 받아오기
    // stock_id(1~9)는 주식ID  10은 잔고 잔액
    const token = req.cookies.authToken;
    const decoded = verifyToken(token);
    const userId = decoded.id;

    const query = `SELECT stock_id, quantity, avg_price, returns FROM hold_stock where user_id = ?`;
    try {
        const [result] = await pool.query(query, [userId]);
        if (result.length === 0) {
            return res
                .status(404)
                .send("유저의 주식정보를 불러올 수 없습니다.");
        }
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/stock/:id", async (req, res) => {
    //TODO : 농장에서 클릭하면 요청할 api. 종목명, 보유 주식 수, 평단가, 수익 반환하면 될듯?
});

module.exports = router;
