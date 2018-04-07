
import Vue from 'vue';
const root = '/api'

const User = {
    LOGIN: `${root}/v1/login`,
    CREATE: `${root}/v1/users`,
    UPLOAD: `${root}/v1/upload/image`
}
const Article = {
    ART_ADD: `${root}/v1/article`,//根据add
    ART_BY_USER: (userId) => `${root}/v1/article/byuser/${userId}`,//根据id查询列表
    ART_PUT: artId => `${root}/v1/article/${artId}`
}
Vue.prototype.$Inter = {
    ...User,
    ...Article
}