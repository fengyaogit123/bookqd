/**按需引用 */
import Vue from 'vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Layout from '@/components/Layout/Layout'
import Block from '@/components/Layout/Block'
import AnimateNumber from './components/AnimateNumber.vue'
import FullScreen from '@/components/fullScreen'
import Upload from '@/components/Upload'
import SearchBox from '@/components/Layout/SearchBox'
Vue.use(iView);
/**自定义组件 */
Vue.component('FyLayout', Layout)
Vue.component('Block', Block)
Vue.component('AnimateNumber', AnimateNumber)
Vue.component('FullScreen', FullScreen)
Vue.component("SearchBox",SearchBox)