const jwt = require("jsonwebtoken");

function createToken(visibleUser, maxAge = 60 * 60 * 24 * 3) {
    return jwt.sign(visibleUser, process.env.JWT_SECRET || "MyJWT", {
        expiresIn: maxAge,
    });
}

function verifyToken(token) {
    if (!token) {
        return null;
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET || "MyJWT");
    return verifiedToken;
}

module.exports = { createToken, verifyToken };
