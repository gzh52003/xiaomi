const express = require("express")
const router = express.Router()

const userRouter = require("./user")
const uploadRouter = require("./upload")
const goodsRouter = require("./goods")

const cors = require("./cors")

// 跨域
router.use(cors)
router.use(express.urlencoded({
    extended: false
}), express.json())

router.use("/user", userRouter)
router.use("/goods", goodsRouter)

router.use("/upload", uploadRouter)

module.exports = router