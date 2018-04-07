import $router from '@/router/index'
import utils from '@/utils/utils'
let { is } = utils;
export default {
    namespaced: true,
    state: {
        cacheList: ['$root']
    },
    mutations: {
        /*添加一个页面到缓存中 */
        addCache(state, value) {
            if (state.cacheList.indexOf(value) == -1) {
                state.cacheList.push(value);
            }
        },
        /**删除指定缓存 */
        removeCache(state, value) {
            if (state.cacheList.indexOf(value) !== -1) {
                let index = state.cacheList.indexOf(value);
                state.cacheList.splice(index, 1);
            }
        },
        /**刷新指定缓存 */
        refresh(state, value) {
            if (!value) {
                state.cacheList = ['$root'];
                setTimeout(() => {
                    state.cacheList = ['$root'].concat(initCache());
                });
                return;
            }
            let index = state.cacheList.indexOf(value);
            if (index !== -1) {
                state.cacheList.splice(index, 1);
                setTimeout(() => {
                    state.cacheList.push(value);
                });
            }
        },
        /**不刷新指定缓存 */
        notRefresh(state, value){
            state.cacheList = ['$root',value];
            setTimeout(() => {
                state.cacheList = ['$root'].concat(initCache());
            });
        },
        /**删除页面缓存 */
        clearCache(state, value) {
            state.cacheList = ['$root'];
        },
        /**初始化缓存 */
        initCache(state, value) {
            state.cacheList = ['$root'].concat(initCache());
        }
    }
}
function initCache() {
    let { routes } = $router.options;
    let names = [];
    getCache(routes, names)
    return names;
}
function getCache(routes, result) {
    if (!is().Array(routes)) {
        return;
    }
    if (routes.length == 0) {
        return;
    }
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i];
        if (route.meta && route.meta.keepAlive) {
            result.push(route.name);
        }
        getCache(route.children, result)
    }
}

