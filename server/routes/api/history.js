var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.get("/:stockId/:action", async (req, res) => {
    // TODO : 종목별(혹은 전체), 매도/매수(혹은 전체) 조회 + 수익 계산
    const userId = req.userId;
    const stockId = req.params.stockId; // 전체는 0
    const action = req.params.action; // 전체는 2 매수 1 매도 0

    try {
        // 전체 조회
        const baseQuery = `SELECT stock_id, is_buy, price, quantity, turn FROM stock_history WHERE user_id = ?`;
        let subQuery = baseQuery;
        let params = [userId];
        if (stockId == 0) {
            if (action != 2) {
                // 종목만 전체
                subQuery += ` AND is_buy = ?`;
                params.push(action);
            }
        } else {
            if (action == 2) {
                // 거래만 전체
                subQuery += ` AND stock_id = ?`;
                params.push(stockId);
            } else {
                // 종목, 거래 골라서
                subQuery += ` AND stock_id = ? AND is_buy = ?`;
                params.push(stockId);
                params.push(action);
            }
        }
        const [result] = await pool.query(subQuery, params);
        console.log(result);
        if (result.length == 0) {
            res.send({
                code: 0,
            });
        } else {
            res.send({
                code: 1,
                result: result,
            });
        }
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;
