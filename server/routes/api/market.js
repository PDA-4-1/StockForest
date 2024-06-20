var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();
const moment = require("moment");

router.get("/rank", async (req, res) => {
    //TODO : 랭킹 불러오기. TOP 5 + 본인 몇 등인지
    try {
        // top5 랭킹 불러오기
        const query = `select a.user_id, a.user_pdi, b.nickname, b.img, rank() over(order by a.user_pdi desc) as ranking from ranking a inner join user b on a.user_id=b.id limit 5;`;
        const [result] = await pool.query(query);
        // console.log(result);

        // 본인 랭킹
        const user_query = `select a.user_id, a.user_pdi, b.nickname, b.img, rank() over(order by a.user_pdi desc) as ranking from ranking a inner join user b on a.user_id=b.id where b.id=?;`;
        const [user_result] = await pool.query(user_query, [req.params.id]);
        // console.log(user_result);

        const obj = {
            top5: result,
            amI: user_result,
        };
        res.status(200).send(obj);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/:turn", async (req, res) => {
    //TODO : 시장 화면 첫 진입 시 종목 목록 띄우기 위한 데이터 요청
    try {
        // 종목명, 설명, 산업 + 등락률
        for (let i = 0; i < 7; i++) {
            const date = moment("2020-01-01");
            const query = `select a.id, a.name, b.price, b.diff from stock a inner join stock_price b on a.id=b.stock_id where b.date=?;`;
            const [result] = await pool.query(query, [
                date
                    .add(req.params.turn * 7 - 1 - i, "days")
                    .format("YYYY-MM-DD"),
            ]);
            if (result.length > 0) {
                // 해당하는 turn에 주식이 있으면 응답
                // console.log(result);
                res.status(200).send(result);
                break;
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/next/:turn", async (req, res) => {
    //TODO : 턴 넘기기. 다음 주 날짜로 바꾸기, 뉴스 정보 있으면 받아오기
    try {
        // 주식 목록 불러오기
        let stockResult;
        const date = moment("2020-01-01");
        for (let i = 0; i < 7; i++) {
            const stocQuery = `select a.id, a.name, b.price, b.diff from stock a inner join stock_price b on a.id=b.stock_id where b.date=?;`;
            [stockResult] = await pool.query(stocQuery, [
                date
                    .add(req.params.turn * 7 - 1 - i, "days")
                    .format("YYYY-MM-DD"),
            ]);
            if (stockResult.length > 0) {
                // 해당하는 turn에 주식이 있다면 break
                break;
            }
        }

        // 수익률 업데이트
        const returnsQuery = `update hold_stock c inner join (
        select a.id, b.price from stock a inner join stock_price b on a.id=b.stock_id where b.date=?) d
        on c.stock_id=d.id set c.returns=((d.price-c.avg_price)/c.avg_price)*100;`;
        await pool.query(returnsQuery, [date.format("YYYY-MM-DD")]);
        const rankingQuery = `update ranking a inner join (
        select user_id, sum(avg_price*quantity) as seed from hold_stock group by user_id) b
        on a.user_id=b.user_id set a.user_pdi=b.seed, a.user_returns=((a.user_pdi-100000)/100000)*100;`;
        await pool.query(rankingQuery, []);

        // 뉴스받아오기
        const newsQuery = `select id, content from news where date>=? and date<=?;`;
        const [newsResult] = await pool.query(newsQuery, [
            date.subtract(6, "days").format("YYYY-MM-DD"),
            date.add(6, "days").format("YYYY-MM-DD"),
        ]);

        // user turn 업데이트
        const query = `update user set turn=turn+1 where id=?;`;
        await pool.query(query, [req.userId]);

        const obj = {
            stocks: stockResult,
            news: newsResult,
        };
        res.status(200).send(obj);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/:stockId/:turn", async (req, res) => {
    //TODO : 종목 주가 데이터 요청. 차트에 표시할 과거 1주일간의 데이터 요청
    try {
        const date = moment("2020-01-01");
        const query = `select a.id, a.name, a.description, b.price, b.date, b.diff from stock a inner join stock_price b on a.id=b.stock_id where a.id=? and (b.date>=? and b.date<=?);`;
        const [result] = await pool.query(query, [
            req.params.stockId,
            date.add((req.params.turn - 1) * 7, "days").format("YYYY-MM-DD"),
            date.add(6, "days").format("YYYY-MM-DD"),
        ]);
        // console.log(result);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/sell/:stockId/:turn", async (req, res) => {
    //TODO : 현재 가지고 있는 주식 수, 가격 불러오기
    try {
        for (let i = 0; i < 7; i++) {
            console.log(i);
            const date = moment("2020-01-01");
            const query = `select a.user_id, a.stock_id, a.quantity, b.price from hold_stock a inner join stock_price b on a.stock_id=b.stock_id where a.user_id=? and a.stock_id=? and b.date=?;`;
            const [result] = await pool.query(query, [
                req.userId,
                req.params.stockId,
                date
                    .add(req.params.turn * 7 - 1 - i, "days")
                    .format("YYYY-MM-DD"),
            ]);
            if (result.length > 0) {
                // 해당하는 turn에 주식이 있으면 응답
                // console.log(result);
                res.status(200).send(result);
                break;
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/buy", async (req, res) => {
    //TODO : 주식 매수. request body 값들 활용해서 DB 값 수정하기.
    try {
        const stockId = req.body.stockId;
        const price = req.body.price;
        const quantity = req.body.quantity;

        // 남은 시드머니 조회
        const remainSeedQuery = `select avg_price from hold_stock where user_id=? and stock_id=10;`;
        const [remainSeedResult] = await pool.query(remainSeedQuery, [
            req.userId,
        ]);
        const remainSeed = remainSeedResult[0].avg_price;

        if (remainSeed - price * quantity >= 0) {
            // 매수가능할 경우

            // 매수 정보 거래내역 테이블에 추가
            const stockHistoryQuery = `insert into stock_history (user_id, stock_id, is_buy, price, quantity) values (?, ?, ?, ?, ?);`;
            const [stockHistoryResult] = await pool.query(stockHistoryQuery, [
                req.userId,
                stockId,
                1,
                price,
                quantity,
            ]);

            // 매수 정보 보유주식 테이블에 추가
            // 해당 주식 보유시 update
            //          보유x시 insert
            const holdStockQuery = `insert into hold_stock (user_id, stock_id, quantity, avg_price) values (?, ?, ?, ?)
        on duplicate key update avg_price = ((quantity * avg_price) + (? * ?)) / (quantity + ?), quantity = quantity + ?;`;
            const [holdStockResult] = await pool.query(holdStockQuery, [
                req.userId,
                stockId,
                quantity,
                price,
                quantity,
                price,
                quantity,
                quantity,
            ]);

            // 보유프디 보유잔고 테이블에서 업데이트
            const holdSeedQuery = `update hold_stock set avg_price=avg_price-?*? where user_id=? and stock_id=10;`;
            const [holdSeedResult] = await pool.query(holdSeedQuery, [
                quantity,
                price,
                req.userId,
            ]);

            res.status(200).send(
                "거래내역 테이블에 " +
                    stockHistoryResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n" +
                    "보유주식(해당주식) 테이블에 " +
                    holdStockResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n" +
                    "보유주식(시드머니) 테이블에 " +
                    holdSeedResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n"
            );
        } else {
            // 매수 불가능할 경우
            res.status(400).send("가지고있는 프디가 부족합니다.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/sell", async (req, res) => {
    //TODO : 주식 매도. request body 값들 활용해서 DB 값 수정하기.
    try {
        const stockId = req.body.stockId;
        const price = req.body.price;
        const quantity = req.body.quantity;

        // 해당주식 보유량 조회
        const holdStockQuery = `select quantity from hold_stock where user_id=? and stock_id=?;`;
        const [holdStockResult] = await pool.query(holdStockQuery, [
            req.userId,
            stockId,
        ]);
        const holdStock = holdStockResult[0].quantity;

        if (holdStock >= quantity) {
            // 매도할 수 있는 경우

            // 매도 정보 거래내역 테이블에 추가
            const stockHistoryQuery = `insert into stock_history (user_id, stock_id, is_buy, price, quantity) values (?, ?, ?, ?, ?);`;
            const [stockHistoryResult] = await pool.query(stockHistoryQuery, [
                req.userId,
                stockId,
                0,
                price,
                quantity,
            ]);

            // 매도 정보 보유주식 테이블에 업데이트
            // 해당 주식 update
            const holdStockQuery = `update hold_stock set quantity=quantity-? where user_id=? and stock_id=?;`;
            const [holdStockResult] = await pool.query(holdStockQuery, [
                quantity,
                req.userId,
                stockId,
            ]);

            // 보유 시드 update
            const holdSeedQuery = `update hold_stock set avg_price=avg_price+?*? where user_id=? and stock_id=10;`;
            const [holdSeedResult] = await pool.query(holdSeedQuery, [
                quantity,
                price,
                req.userId,
            ]);

            res.status(200).send(
                "거래내역 테이블에 " +
                    stockHistoryResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n" +
                    "보유주식(해당주식) 테이블에 " +
                    holdStockResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n" +
                    "보유주식(시드머니) 테이블에 " +
                    holdSeedResult.affectedRows +
                    "개의 레코드가 업데이트 되었습니다\n"
            );
        } else {
            // 매도 불가능 경우
            res.status(400).send("가지고있는 주식량보다 더 많이 팔 수 없어요.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
