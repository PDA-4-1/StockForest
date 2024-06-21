const schedule = require("node-schedule");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const pool = require("../config/db.connect");

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const date = moment().format("YYYY.MM.DD");

const doJob = async () => {
    const executeJob = async () => {
        var config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://gapi.shinhansec.com:8443/openapi/v1.0/strategy/invest",
            headers: {
                apiKey: "l7xxR7Fe0dP3i8KPZaPKpknI2vWrMeJfwDpk",
            },
            httpsAgent: agent
        };
        const res = await axios(config);
        const data = res.data.dataBody.list
        // console.log(data);
        let todayData;
        if(data[1].reg_date===date && data[1].content.length>=300) {
            todayData = data[1].content;
        }
        else if(data[0].reg_date===date && data[0].content.length>=300) {
            todayData = data[0].content;
        }
        else todayData = data[4].content;
        // console.log(todayData.length);

        const query = `INSERT INTO quiz_news (date, content) VALUES (?,?)`;
        await pool.query(query, [date, todayData]);
    };
    await executeJob();
    schedule.scheduleJob("*/30 * * * * *", executeJob);
};

module.exports = doJob;
