const express = require("express")
const router = express.Router()

const userRouter = require("./user")
const regRouter = require("./reg")
const loginRouter = require("./login")
const cors = require("./cors")

// 跨域
router.use(cors)
router.use(express.urlencoded({
    extended: false
}), express.json())

router.use('/login', loginRouter)
router.use("/user", userRouter)
router.use("/reg", userRouter)



module.exports = router