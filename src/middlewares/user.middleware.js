const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

module.exports = async function(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];

        const userVerify = jwt.verify(token, process.env.PRIVATE_KEY);
        
        if(await UserModel.findById(userVerify.id) === null)
            return res.status(401).json({ message: "Người dùng không tồn tại!" });

        res.locals.user = userVerify;
        return next();
    } catch {
        return res.status(500).json({ message: "Chưa đăng nhập!" });
    }
}