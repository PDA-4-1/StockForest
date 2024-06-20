const { verifyToken } = require("../utils/auth");

function userMiddleware(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        req.userId = null;
    } else {
        const decoded = verifyToken(token);
        const userId = decoded.id;
        req.userId = userId;
    }
    next();
}
function loginRequired(req, res, next) {
    if (!req.userId) {
        return res.status(401).json("로그인 처리 필요");
    }
    next();
}

module.exports.userMiddleware = userMiddleware;
module.exports.loginRequired = loginRequired;
