/** 用户 */
import utils from '@/utils/utils';
let { storage, is, attrData } = utils;
export default {
    namespaced: true,
    state: initState(),
    mutations: {
        users(state, users) {
            state.users = users;
            storage.setLocal('users', users);
        },
        clearUser(state) {
            initState(state)
        }
    }
}
/**
 * @description  初始化state state存在则清空缓存,不存在则从缓存中初始化state
 * @param {Object} state 
 */
function initState(state) {
    state && storage.remove('users');//清空所有缓存
    state = state || {};
    state.users = attrData('users', 'Object', {});
    state.isLogin = false;
    return state;
}