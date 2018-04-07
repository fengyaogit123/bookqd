// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './app.js'
import router from './router'
import App from './App.vue'
import axios from '@/utils/request'
import store from '@/store/index'
import utils from '@/utils/utils'
import '@/utils/filters'
import './render'

Vue.config.silent = false
Vue.config.productionTip = false
Vue.prototype.$Message.config({
    duration: 1
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    created() {
        this.$store.commit('cache/initCache')
    },
    components: {
        App
    }
})
