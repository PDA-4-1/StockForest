var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();
const moment = require("moment");

router.get("/:turn", async (req, res) => {
    // TODO : 수익률 계산 후 모든 테이블에서 업데이트
    try {
        // 해당 턴에 해당하는 현재 주식값과 평단가 비교해서 수익률 계산해서 업데이트
        let date;
        for (let i = 0; i < 7; i++) {
            date = moment("2020-01-01");
            const query = `select * from stock_price where date=?;`;
            const [result] = await pool.query(query, [
                date
                    .add(req.params.turn * 7 - 1 - i, "days")
                    .format("YYYY-MM-DD"),
            ]);
            if (result.length > 0) {
                // 해당하는 turn에 주식이 있으면 break
                break;
            }
        }

        const returnsQuery = `update hold_stock c inner join (
        select a.id, b.price from stock a inner join stock_price b on a.id=b.stock_id where b.date=?) d
        on c.stock_id=d.id set c.returns=((d.price-c.avg_price)/c.avg_price)*100;`;
        const [returnsResult] = await pool.query(returnsQuery, [
            date.format("YYYY-MM-DD"),
        ]);

        // 유저별 보유시드 랭킹테이블에서 업데이트
        const rankingQuery = `update ranking a inner join (
        select user_id, sum(avg_price*quantity) as seed from hold_stock group by user_id) b
        on a.user_id=b.user_id set a.user_pdi=b.seed, a.user_returns=((a.user_pdi-100000)/100000)*100;`;
        const [rankingResult] = await pool.query(rankingQuery, []);

        res.status(200).send(
            "보유주식 테이블에 " +
                returnsResult.affectedRows +
                "개의 레코드가 업데이트 되었습니다\n" +
                "랭킹 테이블에 " +
                rankingResult.affectedRows +
                "개의 레코드가 업데이트 되었습니다\n"
        );
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
