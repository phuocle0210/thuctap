const express = require("express");
const authRouter = require("./auth.route");
const phoneRouter = require("./phone.route");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/phone", phoneRouter);

module.exports = router;