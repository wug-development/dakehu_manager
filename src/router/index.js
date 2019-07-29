import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import NowDayOrder from '@/components/Main/NowDayOrder'
import GJOrderList from '@/components/Main/GJOrderList'
import GJOrderDetail from '@/components/Main/GJOrderDetail'
import GNOrderList from '@/components/Main/GNOrderList'
import GNOrderDetail from '@/components/Main/GNOrderDetail'
import PNRCreat from '@/components/Main/PNRCreat'
import WriteInfo from '@/components/Main/WriteInfo'
import ManagerList from '@/components/Manager/ManagerList'
import Register from '@/components/MUsers/Register'
import SendEmail from '@/components/MUsers/SendEmail'
import UserList from '@/components/MUsers/UserList'
import EditUser from '@/components/MUsers/EditUser'
import NotPurchased from '@/components/DealWith/NotPurchased'
import PressMoney from '@/components/DealWith/PressMoney'

import MyUser from './muser'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/main',
            component: Index,
            meta: {
                keepAlive: true,// 此组件需要被缓存                
                isBack: false// 用于判断上一个页面是哪个
            },
            children: [
                {
                    path: '',
                    name: 'NowDayOrder',
                    component: NowDayOrder,
                },
                {
                    path: 'index',
                    name: 'NowDayOrder',
                    component: NowDayOrder,
                },
                {
                    path: 'gjorderlist',
                    name: 'GJOrderList',
                    component: GJOrderList,
                },
                {
                    path: 'gjorderdetail',
                    name: 'GJOrderDetail',
                    component: GJOrderDetail,
                },
                {
                    path: 'gnorderlist',
                    name: 'GNOrderList',
                    component: GNOrderList,
                },
                {
                    path: 'gnorderdetail',
                    name: 'GNOrderDetail',
                    component: GNOrderDetail,
                },
                {
                    path: 'pnrcreat',
                    name: 'PNRCreat',
                    component: PNRCreat,
                },
                {
                    path: 'writeinfo',
                    name: 'WriteInfo',
                    component: WriteInfo,
                },
                {
                    path: 'manager',
                    name: 'Manager',
                    component: ManagerList,
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register,
                },
                {
                    path: 'sendemail',
                    name: 'SendEmail',
                    component: SendEmail,
                },
                {
                    path: 'muser',
                    component: UserList,
                    children: MyUser
                },
                {
                    path: 'edituser',
                    name: 'EditUser',
                    component: EditUser
                },
                {
                    path: 'card',
                    name: 'NotPurchased',
                    component: NotPurchased,
                },
                {
                    path: 'nuser',
                    name: 'PressMoney',
                    component: PressMoney,
                }
            ]
        }
    ]
})
