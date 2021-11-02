
// 认证中间件
async function access(ctx, next) {
    const logged = ctx.cookies.get('logged', { signed: true })
    // 把认证结果放到state中，ejs可以直接使用
    ctx.state.logged = !!logged // 强制类型转换为boolean
    await next()
}
module.exports = access