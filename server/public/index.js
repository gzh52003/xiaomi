const express = require("express")
const router = express.Router()

const userRouter = require("./user")
const orderRouter=require("./order")
const cors = require("./cors")

// 跨域
router.use(cors)
router.use(express.urlencoded({
    extended: false
}), express.json())

router.use("/user", userRouter)
router.use("/order", orderRouter)




module.exports = router