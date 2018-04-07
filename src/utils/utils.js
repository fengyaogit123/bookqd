import Vue from 'vue'
import storage from '@/utils/storage.js'
import $router from '@/router/index'
import QS from 'querystring'
let Message = Vue.prototype.$Message

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * url 格式化
 * @param {*} url
 */
function URLObject(url) {
    url = url || window.location.search
    let theRequest = {}
    let strs = ''
    if (url.indexOf('?') != -1) {
        let str = url.substr(1)
        strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
    }
    return theRequest
}
/**
 * 判断字符串是否为空
 * @param {*} value
 */
function isNull(value) {
    if (!value) return true
    if (value == 'null' && value == 'undefined') return true
    return false
}
/**
 * 判断是否为数组
 * @param {arr}
 */
function isArray(arr) {
    return arr && (arr instanceof Array)
}
/**
 * @description 初始化属性值
 * @param {String} name 属性名 
 * @param {String} type 类型
 * @param {*} default 默认值 
 * */
function attrData(name = '', type = 'String', defaults = '') {
    let value = storage.getLocal(name);
    try {
        value = is()[type](value) ? value : defaults;
    } catch (e) {
        value = defaults;
    }
    return value;
}
function is() {
    let is = {
        types: ["Array","Function", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
    };
    for (let i = 0, c; c = is.types[i++];) {
        is[c] = (function (type) {
            return function (obj) {
                if(type=='Number'&&isNaN(obj)){
                    return false;
                }
                return Object.prototype.toString.call(obj) == "[object " + type + "]";
            }
        })(c);
    }
    return is;
}
/**
 * 对象深拷贝
 */
function OParse(obj) {
    return JSON.parse(JSON.stringify(obj))
}
/**
 * 新增页面
 */
function openNewPage({ path, name, params, query }, $store) {
    let { pageList } = $store.state.menu; // 当前page
    let { title, parent, children } = findTitle($store, name);
    $store.commit('menu/currentPath', { parent, children });
    let index = pageList.map(({ name }) => name).indexOf(name);
    if (index !== -1) {
        let page = pageList[index];
        page.query = query;
        page.params = params;
        pageList.splice(index, 1, page);
        return;
    }
    if (title) {
        $store.commit('menu/addPageList', { path, name, params, query, title })
    }
}
function findTitle($store, name) {
    let { menus } = $store.state.menu
    let parent = {}, children = {}
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i]
        if (menu.routerName == name) {
            if (menu.routerName !== 'Workbench') {
                parent.title = menu.name
                parent.routerName = menu.routerName
            } else {
                parent = null
            }
            children = null
            return {
                title: menu.name,
                parent: parent,
                children: children
            }
        }
        if (menu.hasChildren) {
            for (let k = 0; k < menu.children.length; k++) {
                let cMenu = menu.children[k]
                if (cMenu.routerName == name) {
                    parent.title = menu.name
                    parent.routerName = menu.routerName
                    children.title = cMenu.name
                    children.routerName = cMenu.routerName
                    return {
                        title: cMenu.name,
                        parent: parent,
                        children: children
                    }
                }
            }
        }
    }
    return {}
}
/**
 * @description 去抖
 * @param {Function} fn 
 * @param {Number} delay
 * @return {Function} 
 */
function debounce(fn, delay) {
    let t = null;
    return function (...args) {
        const func = () => {
            fn.apply(this, args)
        }
        clearTimeout(t)
        t = setTimeout(func, delay)
    }
}
/**
 * @description 去抖
 * @param {Function} fn 
 * @param {Number} delay 
 * @param {String} msg  
 * @return {Function} 
 */
function throttle(fn, delay) {
    let start = 0;
    return function (...args) {
        let curr = +new Date();
        if (curr >= (start + delay)) {
            fn.apply(this, args)
            start = curr;
            return;
        }
    }
}
Vue.prototype.$URLObject = URLObject
Vue.prototype.$storage = storage; // 本地存储
Vue.prototype.$OParse = OParse;
Vue.prototype.$is = is;
Vue.prototype.$QS = QS
export default {
    URLObject,
    storage,
    $Message: Message,
    isNull,
    isArray,
    OParse,
    openNewPage,
    debounce,
    throttle,
    is,
    attrData
}
