import $store from '@/store/index'
import utils from '@/utils/utils'
export function filterMiddle(to, from, next) {
    let filter = ['Login']
    if (filter.indexOf(to.name) !== -1) {
        next(true)
        return false
    }
    return true
}