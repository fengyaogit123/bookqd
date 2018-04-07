import $store from '@/store/index'
import utils from '@/utils/utils'

import { filterMiddle } from './filterMiddle'
import { isLoginMiddle } from './isLoginMiddle'
const fns = [filterMiddle, isLoginMiddle];
export const beforeEach = (to, from, next) => {
    $store.commit('menu/currPageName', to.name)
    let isNext = null;
    let i = 0;
    while (i < fns.length) {
        isNext = fns[i](to, from, next);
        if (!isNext) break;
        i++;
    }
    if (isNext) { next() }
}

export const afterEach = ({ path, name, params, query }) => {
    utils.openNewPage({ path, name, params, query }, $store)
}
