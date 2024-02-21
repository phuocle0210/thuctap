const express = require("express");
const phoneController = require("../controllers/phone.controller");
const userMiddleware = require("../middlewares/user.middleware");

const router = express.Router();

router.use(userMiddleware);
router.get("/", phoneController.get);
router.post("/", phoneController.create);
router.put("/:phoneId", phoneController.edit);
router.delete("/:phoneId", phoneController.delete);

module.exports = router;