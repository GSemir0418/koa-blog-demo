const Router = require('koa-router')
const userService = require('../services/user')

const router = new Router()

router.get('/login', async (ctx) => {
    await ctx.render('login')
})

router.post('/login', async (ctx) => {
    const data = ctx.request.body
    // 确定data中存在非空name和password
    if (!data.username || !data.password) {
        ctx.throw(400, '您的请求有误')
    }
    // 用service层去验证，拿到结果后进行判断以及设置cookie
    const logged = userService.login(data.username, data.password)
    if (!logged) {
        ctx.throw(400, '账号或密码错误')
    }
    ctx.cookies.set('logged', 1, {
        signed: true,
        httpOnly: true
    })
    ctx.redirect('/', '登录成功')
})

router.get('/logout', (ctx) => {
    ctx.cookies.set('logged', 0, {
        maxAge: 0,
        // maxAge：-1表示仅存在浏览器内存中，关闭浏览器就消失了
        // maxAge：0表示删除此cookie
        signed: true
    })
    ctx.redirect('/', '退出登录成功')
})

module.exports = router