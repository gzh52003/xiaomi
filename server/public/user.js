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
        size,
        _id
    } = req.query

    if (_id) {
        try {
            const data = await mongo.find('userList', {
                _id
            }, {})

            res.send(sendDate({
                data
            }))
        } catch (err) {
            res.send(sendDate({
                code: 0
            }))
        }
    } else {

        try {
            const data = await mongo.find('userList', {}, {
                skip: (page - 1) * size,
                limit: size
            })

            res.send(sendDate({
                data
            }))
        } catch (err) {
            res.send(sendDate({
                code: 0
            }))
        }
    }
})
// 查找用户是否存在
router.get('/checkname', async (req, res) => {
    const {
        username
    } = req.query

    // console.log(username)
    try {
        const data = await mongo.find('userList', {
            username
        }, {})

        // 长度为零时，说明用户名不存在，返回成功 code =1
        if (data.length == 0) {
            res.send(sendDate({}))
        } else {
            res.send(sendDate({
                code: 0
            }))
        }
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }

})

// 删除用户
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    // console.log(id)
    // console.log(_id)
    try {
        const result = await mongo.remove('userList', {
            _id
        })
        // console.log(result)
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
    console.log(_id)
    // 编辑用户信息，某条不做编辑时，输入框也是存在数据的，不会出现为空的问题？
    const {
        username,
        password,
        role,
        gender
    } = req.body
    console.log(username, gender, role)
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
            code: 0
        }))
    }
})
module.exports = router