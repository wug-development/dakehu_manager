// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Notification from 'element-ui/lib/notification'
import MessageBox from 'element-ui/lib/message-box'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.apis = process.env.APIS_URL
Vue.prototype.Notification = Notification
Vue.prototype.MessageBox = MessageBox

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
