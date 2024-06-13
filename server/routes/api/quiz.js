var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.post("/response", async (req, res) => {
    //TODO : 사용자가 퀴즈에 답한 내용을 기록. 어떤 종목인지, 오를지 내릴지
    try {
        const userId = req.body.userId;
        const stockId = req.body.stockId;
        const date = req.body.date;
        const upDown = req.body.upDown;

        const resQuery = `INSERT INTO quiz (user_id, stock_id, date, up_down) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(resQuery, [
            userId,
            stockId,
            date,
            upDown,
        ]);
        console.log(result.affectedRows);
        res.send(result.affectedRows + "개의 레코드가 추가되었습니다");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.put("/answer", async (req, res) => {
    //TODO : 퀴즈 답 확인, 맞았을 경우 보상받은 포인트까지 계산할 것
    const userId = req.body.userId;
    const date = req.body.date;
    const isCorrect = req.body.isCorrect;

    const answerQuery = `UPDATE quiz SET is_correct = ? WHERE user_id = ? AND date = ?`;
    const [result] = await pool.query(answerQuery, [isCorrect, userId, date]);

    // 맞았을 경우 사용자의 pdi 추가
    const addPointQuery = `UPDATE hold_stock SET avg_price = avg_price + 500 WHERE user_id = ? AND stock_id = 10`;
    let result2;
    if (isCorrect) {
        [result2] = await pool.query(addPointQuery, [userId]);
    }
    res.send({
        success : result.affectedRows,
        isCorrect : result2.affectedRows
    });
});

module.exports = router;
