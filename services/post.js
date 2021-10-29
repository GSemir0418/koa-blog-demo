const fs = require('fs')
const bluebird = require('bluebird')
bluebird.promisifyAll(fs)

// 文章数据
const posts = []
// 文章id
let postId = 1

// 文章列表
exports.list = function () {
    return posts.map(item => item)
}

// 文章发布
exports.publish = (title, content) => {
    posts.push({
        id: postId++,
        title,
        content,
        time: (new Date()).toLocaleString()
    })
}
// 文章详情
exports.show = (id) => {
    return posts.find(i => i.id == id)
}
// 修改文章
exports.update = (id, title, content) => {
    posts.forEach(i => {
        if (i.id == id) {
            i.title = title
            i.content = content
            i.time = (new Date()).toLocaleString()
        }
    })
}