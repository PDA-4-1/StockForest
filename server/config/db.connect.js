const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();
// console.log(process.env.DB_PORT);
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
});

module.exports = pool;

//연결 확인용 테스트 코드
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Database connection successful!");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
}

testConnection();
