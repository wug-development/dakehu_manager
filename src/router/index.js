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
import AllUser from '@/components/MUsers/AllUser'
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
            name: '',
            component: Index,
            meta: {
                keepAlive: true,// 此组件需要被缓存                
                isBack: false// 用于判断上一个页面是哪个
            },
            children: [
                {
                    path: '',
                    name: '今日订单',
                    component: NowDayOrder,
                },
                {
                    path: 'gjorderlist',
                    name: '国际航班预定',
                    component: GJOrderList,
                },
                {
                    path: 'gnorderlist',
                    name: '国内航班查询',
                    component: GNOrderList,
                },
                {
                    path: 'pnrcreat',
                    name: 'PNR生成',
                    component: PNRCreat,
                },
                {
                    path: 'writeinfo',
                    name: '填写信息',
                    component: WriteInfo,
                },
                {
                    path: 'manager',
                    name: '管理员管理',
                    component: ManagerList,
                },
                {
                    path: 'register',
                    name: '用户注册',
                    component: Register,
                },
                {
                    path: 'sendemail',
                    name: '发送邮件',
                    component: SendEmail,
                },
                {
                    path: 'muser',
                    name: '用户管理',
                    component: AllUser
                },
                {
                    path: 'userbll',
                    name: '',
                    component: UserList,
                    children: MyUser
                },
                {
                    path: 'edituser',
                    name: '编辑用户',
                    component: EditUser
                },
                {
                    path: 'card',
                    name: '需要催款客户',
                    component: NotPurchased,
                },
                {
                    path: 'nuser',
                    name: '连续30天未出票客户',
                    component: PressMoney,
                }
            ]
        }
    ]
})
