const PhoneModel = require("../models/Phone.model");

module.exports = {
    get: async function(req, res) {
        try {
            const { page } = req.query;

            const phoneList = await PhoneModel.paginate({}, {
                page: page === undefined ? 1 : page,
                limit: 10
            });

            return res.status(200).json(phoneList);
        } catch {
            return res.status(500).json({ message: "Server lỗi! "});
        }
    }, 
    create: async function(req, res) {
        try {
            const { name, serial, quantity, price, status } = req.body;
            
            if(await PhoneModel.findOne({ serial }) !== null)
                return res.status(400).json({ message: "Số serial đã tồn tại!" });

            const phone = await PhoneModel.create({
                name,
                price,
                serial,
                quantity,
                status
            });

            return res.status(200).json({
                message: "Tạo sản phẩm thành công!",
                data: phone
            });
        } catch {
            return res.status(500).json({ message: "Server lỗi!" });
        }
    },
    edit: async function(req, res) {
        try {
            const { phoneId: _id } = req.params;
            const { name, serial, price, quantity, status } = req.body;
            
            const phone = await PhoneModel.findById(_id);
            if(phone === null)
                return res.status(400).json({ message: "Không tìm thấy sản phẩm!" });

            await phone.updateOne({
                serial,
                price,
                name,
                quantity,
                status
            });

            return res.status(200).json({ message: "Sửa sản phẩm thành công!" });
        } catch {
            return res.status(500).json({ message: "Server lỗi!" });
        }
    },
    delete: async function(req, res) {
        try {
            const { phoneId: _id } = req.params;
            const phone = await PhoneModel.findById({ _id });
            if(phone === null)
                return res.status(400).json({ message: "Không tìm thấy sản phẩm!" });

            phone.status = false;
            await phone.save();

            return res.status(200).json({ message: "Xóa sản phẩm thành công!" });
        } catch {
            return res.status(500).json({ message: "Server lỗi!" });
        }
    }
}