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

// 获取商品列表
router.get('/', async (req, res) => {
    const {
        page,
        size,
        _id
    } = req.query

    if (_id) {
        // 查询该ID 的列表
        try {
            const data = await mongo.find('goods', {
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
        // 否则返回用户列表，并返回 数据的总数 
        // 得到的数据格式为 data={total:4,data:[]}
        try {
            const data = await mongo.find('goods', {}, {
                skip: (page - 1) * size,
                limit: size,
                total: 1,
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

// 删除商品
router.delete("/:_id", async (req, res) => {
    const {
        _id
    } = req.params
    // console.log(id)
    // console.log(_id)
    try {
        const result = await mongo.remove('goods', {
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
        product_name,
        product_brief,
        product_price,
        product_org_price,
        img_url
    } = req.body

    try {
        const result = await mongo.insert('goods', {
            product_name,
            product_brief,
            product_price,
            product_org_price,
            img_url
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
    // console.log(_id)
    // 编辑商品信息，某条不做编辑时，输入框也是存在数据的，不会出现为空的问题？password在些不做更改
    const {
        product_name,
        product_brief,
        product_price,
        product_org_price,
        img_url
    } = req.body

    // console.log(username, gender, role)
    const newdata = {
        product_name,
        product_brief,
        product_price,
        product_org_price,
        img_url
    }
    console.log(newdata)
    try {
        const result = await update('goods', {
            _id
        }, {
            $set: newdata
        })
        res.send(sendDate({
            data: {
                _id,
                result
            }
        }))
    } catch (err) {
        res.send(sendDate({
            code: 0
        }))
    }
})
module.exports = router