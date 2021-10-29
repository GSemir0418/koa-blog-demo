
// 认证中间件
async function access(ctx, next) {
    const logged = ctx.cookies.get('logged', { signed: true })
    ctx.state.logged = !!logged
    await next()
}
module.exports = access