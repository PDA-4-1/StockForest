var express = require("express");
var router = express.Router();

router.get('/:stockId/:action', async (req, res) => {
    // TODO : 종목별(혹은 전체), 매도/매수(혹은 전체) 조회 + 수익 계산
    const userId = req.userId;
    const stockId = req.params.stockId; // 전체는 0
    const action = req.query.action; // 전체는 0 매수 1 매도 2


});

module.exports = router;