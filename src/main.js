// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Notification from 'element-ui/lib/notification'
import MessageBox from 'element-ui/lib/message-box'
import IScroll from 'element-ui/lib/infiniteScroll'

import common from '../common/common'

Vue.config.productionTip = false
Vue.prototype.utils = common.utils
Vue.prototype.$http = Axios
Vue.prototype.apis = process.env.APIS_URL
Vue.prototype.apiw = process.env.APIBook_URL
Vue.prototype.apath = process.env.ICON_URL
Vue.prototype.imguri = process.env.IMGW_URL
Vue.prototype.Notification = Notification
Vue.prototype.MessageBox = MessageBox

Vue.use(ElementUI)
Vue.use(IScroll)
Vue.component(IScroll.name, IScroll)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
