import axios from '@/utils/request'
import { LOGOUT, MY_MENU } from '@/utils/interface'
import QS from 'querystring'
import $router from '@/router/index'
import utils from '@/utils/utils'
import $store from '@/store/index'
import menuArr from '@/config/menus'
import { Homes, title } from '@/config/config.default.js'
import { User } from "@/service";

let { storage, is, attrData } = utils
//初始化缓存
let root = attrData('root', 'Object', {
    title: title,
    routerName: Homes,
    name: Homes
});
export default {
    namespaced: true,
    state: {
        menus: menuArr,//导航菜单
        currentPath: attrData('currentPath', 'Array', [root]),
        openedArr: attrData('openedArr', 'Array', []), // 要展开的菜单数组
        pageList: attrData('pageList', 'Array', [root]),
        currPageName: attrData('currPageName'),//当前路由name
        theme: attrData('theme'),//当前主题
        themeList: getThemeList(),//主题
        hideMenuText: attrData('hideMenuText', 'Boolean', false),
        root
    },
    mutations: {
        //设置主题
        theme(state, theme) {
            let { themeList } = state;
            state.theme = theme;
            storage.setLocal('theme', theme);
        },
        root(state, root) {
            state.root = root;
            state.pageList.splice(0, 1, root);
            storage.setLocal('root', root);
        },
        menus(state, menus) {
            if (!is().Array(menus)) {
                menus = [];
            }
            menus = setMenu(menus);
            state.menus = menus;
            storage.setLocal('menus', menus);
            function setMenu(menus) {
                if (!is().Array(menus)) { return; }
                if (menus.length == 0) { return; }
                menus = menus.filter(({ routerName, children }, index) => {
                    menus[index].children = setMenu(children)
                    return true;
                });
                return menus;
            }
        },
        hideMenuText(state, value) {
            state.hideMenuText = value !== undefined ? value : (!state.hideMenuText);
            storage.setLocal('hideMenuText', state.hideMenuText);
        },
        currentPath(state, { parent, children }) {
            state.currentPath = [state.root, parent, children];
            storage.setLocal('currentPath', state.currentPath);
        },
        currPageName(state, currPageName) {
            state.currPageName = currPageName;
            storage.setLocal('currPageName', currPageName);
        },
        openedArr(state, openedArr) {
            state.openedArr = openedArr;
            storage.setLocal('openedArr', openedArr);
        },
        addPageList(state, page) {
            state.pageList.push(page);
            storage.setLocal('pageList', state.pageList);
        },
        //切换当前路由 可从缓存中获取参数,若要重新传参,可以直接使用 router.push
        toPage(state, name) {
            let { pageList } = state;
            let index = pageList.map(({ name }) => name).indexOf(name);
            if (index !== -1) {
                let { name, params, query } = pageList[index];
                $router.push({
                    name,
                    params,
                    query
                });
            }
        },
        deletePageList(state, name) {
            let { pageList } = state;
            for (let i = 0; i < pageList.length; i++) {
                let page = pageList[i];
                if (page.name == name) {
                    $store.commit('cache/refresh', name);
                    pageList.splice(i, 1);
                    storage.setLocal('pageList', pageList);
                    page = pageList[pageList.length - 1];
                    $router.push({
                        name: page.name,
                        params: page.params,
                        query: page.query
                    });
                    return;
                }
            }
        },
        updatePageParam(state, { name, params = {}, query = {} }) {
            let { pageList } = state;
            let index = pageList.map(({ name }) => name).indexOf(name);
            if (index > 0) {
                let page = pageList[index];
                page = { name, params, query };
                pageList.splice(index, 1, page);
            }
        },
        pageColoseAll(state) {
            $router.push({ name: state.root.name });
            state.pageList = [state.root];
            $store.commit('cache/refresh');
            storage.setLocal('pageList', state.pageList);
        },
        pageClearOthers(state) {
            let { pageList, currPageName } = state;
            let newPageList = [state.root];
            for (let i = 0; i < pageList.length; i++) {
                let page = pageList[i];
                if (page.name == currPageName && page.name !== state.root.name) {
                    newPageList.push(page);
                    break;
                }
            }
            $store.commit('cache/notRefresh', currPageName);
            state.pageList = newPageList;
            storage.setLocal('pageList', state.pageList);
        },
        //根据权限跳转到对应首页
        toHome(state) {
            let { menus } = state;
            let root = {};
            let i = 0;
            while (i < menus.length) {
                let page = menus[i];
                if (page.routerName == Homes) {
                    root.title = page.name;
                    root.routerName = page.routerName;
                    root.name = page.routerName;
                    break;
                }
                if (is().Array(page.children) && page.children.length > 0) {
                    root.title = page.children[0].name;
                    root.routerName = page.children[0].routerName;
                    root.name = page.children[0].routerName;
                    break;
                }
                i++;
            }
            $store.commit('menu/root', root);
            $router.replace({ name: root.name });
        },
        //清除路由状态
        clearPage(state) {
            state.pageList = [];
            state.openedArr = [];
            state.currentPath = [];
            state.currPageName = '';
            state.root = {};
            storage.setLocal('pageList', '');
            storage.setLocal('openedArr', '');
            storage.setLocal('currentPath', '');
            storage.setLocal('currPageName', '');
            storage.setLocal('root', '');
        },
    },
    actions: {
        //退出登录
        async logOutBtn({ commit }) {
            // await User.loginOut();
            $router.replace({ name: 'Login' });
            $store.commit('users/clearUser');
            commit('clearPage');
        }
    }
}
/**
 * @description 获取主题配置
 */
function getThemeList() {
    return [
        // {
        //     name: "white-cyan",
        //     element: "rgb(0,162,174)"
        // },
        {
            name: "white-blue",
            element: "rgb(16,142,233)"
        },
        // {
        //     name: "white-green",
        //     element: "rgb(0,168,84)"
        // },
        // {
        //     name: "white-red",
        //     element: "rgb(240,65,52)"
        // },
        {
            name: "white-black",
            element: "rgb(55,61,65)"
        },
        // //
        // {
        //     name: 'black-cyan',
        //     element: 'rgb(0, 162, 174)'
        // },
        // {
        //     name: 'black-blue',
        //     element: 'rgb(16, 142, 233)'
        // },
        // {
        //     name: 'black-green',
        //     element: 'rgb(0, 168, 84)'
        // },
        // {
        //     name: 'black-red',
        //     element: 'rgb(240, 65, 52)'
        // },
        // {
        //     name: 'black-black',
        //     element: 'rgb(55, 61, 65)'
        // }
    ]
}
