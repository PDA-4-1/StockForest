var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.get("/:stockId/:action", async (req, res) => {
    // TODO : 종목별(혹은 전체), 매도/매수(혹은 전체) 조회 + 수익 계산
    const userId = req.userId;
    const stockId = req.params.stockId; // 전체는 0
    const action = req.params.action; // 전체는 0 매수 1 매도 2

    try {
        // 전체 조회
        const allQuery = `SELECT is_buy, price, quantity, turn FROM stock_history WHERE user_id = ?`;
        if (stockId == 0) {
            const [allResult] = await pool.query(allQuery, [userId]);
            console.log(allResult);
            if (allResult.length == 0) {
                res.send({
                    code: 0,
                });
            } else {
                res.send({
                    code: 1,
                    result: allResult,
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;
