import utils from '@/utils/utils'
// 判断是否登录
export function isLoginMiddle(to, from, next) {
    let users = utils.storage.getLocal('users')
    // 已登录 继续执行
    if (users) {
        return true
    }
    utils.$Message.warning('请登录')
    next({ name:'Login'});
    return false ;
}