const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
const md5 = require("md5");
require("dotenv").config();

module.exports = {
    register: async function(req, res) {
        try {
            const { name, username, password } = req.body;

            if(await UserModel.findOne({ username }) !== null)
                return res.status(400).json({ message: "Người dùng đã tồn tại!" });

            const user = await UserModel.create({
                username,
                name,
                password: md5(password) 
            });
            
            const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);

            return res.status(200).json({
                data: { token },
                message: "Đăng ký thành công!"
            });
        } catch {
            return res.status(500).json({ message: "Server lỗi!" });
        }
    },
    login: async function(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username, password: md5(password) });

            if(user === null)
                return res.status(401).json({ message: "Tài khoản hoặc mật khẩu sai!" });

            const token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);

            return res.status(200).json({ 
                data: { token },
                message: "Đăng nhập thành công!"
            });
        } catch {
            return res.status(500).json({ message: "Server lỗi!" });
        }
    }
}