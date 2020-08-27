const express = require("express")
const router = express.Router()
const mongo = require("./utils/mongoDB")

const {
    sendDate
} = require("./utils/sendDate")
const {
    insert,
    update
} = require("./utils/mongoDB")

// 获取用户列表
router.get('/', async (req, res) => {
    const {
        page,
        size
    } = req.query
    const data = await mongo.find('userList', {}, {
        skip: page,
        limit: size
    })

    res.send(sendDate({
        data
    }))
})

// 删除用户
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    // console.log(id)
    console.log(_id)
    try {
        const result = await mongo.remove('userList', {
            _id
        })
        console.log(result)
        res.send(sendDate({
            code: 1
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})

// 添加用户
router.post('/', async (req, res) => {
    const {
        username = "",
            password = "",
            role = "",
            gender = ""
    } = req.body
    try {
        const result = await mongo.insert('userList', {
            username,
            password,
            role,
            gender
        })
        res.send(sendDate({}))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})
// 编辑用户信息
router.put("/:_id", async (req, res) => {
    const {
        _id,
    } = req.params

    // 编辑用户信息，某条不做编辑时，输入框也是存在数据的，不会出现为空的问题？
    const {
        username,
        password,
        role,
        gender
    } = req.body
    const newdata = {
        username,
        password,
        role,
        gender
    }
    try {
        const result = await update('userList', {
            _id
        }, {
            $set: newdata
        })
        res.send(sendDate({
            data: {
                _id,
                ...newdata
            }
        }))
    } catch (err) {
        res.send(sendDate({
            code: 1
        }))
    }
})
module.exports = router