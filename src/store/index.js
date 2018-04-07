import Vue from 'vue'
import Vuex from 'vuex'
//全局模块
import cache from '@/store/modules/cache'//缓存
import menu from '@/store/modules/menu'
import defaults from '@/store/modules/defaults'
import users from '@/store/modules/users'
//组件模块
const state = {
    modules: {
        cache,
        users,
        menu,
        defaults
    }
};
const store = new Vuex.Store(state);
export default store;