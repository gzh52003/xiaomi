//  中间件 配置 可跨域访问
function cors(req, res, next) {

    // res.set({
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "Content-Type,Content-Length,Authorization,Accept,X-Requested-With",
    //     "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS"
    // })

    // if (req.method == "OPTIONS") {
    //     res.sendStatus(200)
    // } else {
    //     next()
    // }
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Content-Length,Authorization,Accept,X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS"
    })
    // 跨域请求CORS中的预请求
    if (req.method == "OPTIONS") {
        res.sendStatus(200); /*让options请求快速返回*/
    } else {
        next();
    }
}

module.exports = cors