const Router = require('koa-router')
const postService = require('../services/post')

const router = new Router()

// 发布博客页面
router.get('/publish', async (ctx) => {
    await ctx.render('publish')
})
// 发布处理
router.post('/publish', async (ctx) => {
    const data = ctx.request.body
    if (!data.title || !data.content) {
        ctx.throw(400, '您的请求有误')
    }
    postService.publish(data.title, data.content)
    ctx.redirect('/', '发布成功！')

})
// 详情页
router.get('/post/:id', async (ctx) => {
    const id = ctx.params.id
    const post = postService.show(id)
    if (!post) {
        ctx.throw(404, '文章不存在')
    }
    await ctx.render('post', { post: post })
})
// 编辑页
router.get('/update/:id', async (ctx) => {
    const id = ctx.params.id
    const post = postService.show(id)
    if (!post) {
        ctx.throw(404, "文章不存在")
    }
    await ctx.render('update', { post })
})
router.post('/update/:id', async (ctx) => {
    const id = ctx.params.id
    const post = ctx.request.body
    postService.update(id, post.title, post.content)
    ctx.redirect('/', '修改成功！')
})
// 删除
router.get('/delete/:id', async (ctx) => {
    const id = ctx.params.id
    postService.delete(id)
    ctx.redirect('/', '删除成功！')
})

module.exports = router