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
    console.log(page, size, _id);

    if (_id) {
        try {
            const data = await mongo.find('OrderList', {
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
            const data = await mongo.find('OrderList', {}, {
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

// 删除用户
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    // console.log(id)
    // console.log(_id)
    try {
        const result = await mongo.remove('OrderList', {
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
        orderNumber = '',
            orderTime = '',
            amount = '',
            monetary = '',
            done = false,
            deliveryTime = '',
            remarks = '',
    } = req.body
    try {
        const result = await mongo.insert('OrderList', {
            orderNumber,
            orderTime,
            amount,
            monetary,
            done,
            deliveryTime,
            remarks,
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
        orderNumber = '',
            orderTime = '',
            amount = '',
            monetary = '',
            done = false,
            deliveryTime = '',
            remarks = '',
    } = req.body
    const newdata = {
        orderNumber,
        orderTime,
        amount,
        monetary,
        done,
        deliveryTime,
        remarks,
    }
    try {
        const result = await update('OrderList', {
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