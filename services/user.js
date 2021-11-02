const user = {
    gsq: 'zs'
}
// 登录
exports.login = (username, password) => {
    if (user[username] === undefined) {
        return false
    }
    return user[username] === password
    // 返回boolean
}