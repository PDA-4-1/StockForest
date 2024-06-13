var express = require('express');
var pool = require('../../config/db.connect.js');
var router = express.Router();

router.post('/response', async (req, res) => {
    //TODO : 사용자가 퀴즈에 답한 내용을 기록. 어떤 종목인지, 오를지 내릴지
})

router.post('/answer', async(req, res) => {
    //TODO : 퀴즈 답 확인, 맞았을 경우 보상받은 포인트까지 계산할 것
})


module.exports = router;