import Vue from 'vue'
import Router from 'vue-router'

import MyUser from './muser'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component (resolve) {
                require(['@/components/Login'], resolve)
            }
        },
        {
            path: '/main',
            name: '',
            component (resolve) {
                require(['@/components/Index'], resolve)
            },
            meta: {
                keepAlive: true,// 此组件需要被缓存                
                isBack: false// 用于判断上一个页面是哪个
            },
            children: [
                {
                    path: '',
                    name: '今日订单',
                    component (resolve) {
                        require(['@/components/Main/NowDayOrder'], resolve)
                    }
                },
                {
                    path: 'gjorderlist',
                    name: '国际航班预定',
                    component (resolve) {
                        require(['@/components/Main/GJOrderList'], resolve)
                    }
                },
                {
                    path: 'gnorderlist',
                    name: '国内航班查询',
                    component (resolve) {
                        require(['@/components/Main/GNOrderList'], resolve)
                    }
                },
                {
                    path: 'pnrcreat',
                    name: 'PNR生成',
                    component (resolve) {
                        require(['@/components/Main/PNRCreat'], resolve)
                    }
                },
                {
                    path: 'writeinfo',
                    name: '填写信息',
                    component (resolve) {
                        require(['@/components/Main/WriteInfo'], resolve)
                    }
                },
                {
                    path: 'manager',
                    name: '管理员管理',
                    component (resolve) {
                        require(['@/components/Manager/ManagerList'], resolve)
                    }
                },
                {
                    path: 'register',
                    name: '用户注册',
                    component (resolve) {
                        require(['@/components/MUsers/Register'], resolve)
                    }
                },
                {
                    path: 'sendemail',
                    name: '发送邮件',
                    component (resolve) {
                        require(['@/components/MUsers/SendEmail'], resolve)
                    }
                },
                {
                    path: 'muser',
                    name: '用户管理',
                    component (resolve) {
                        require(['@/components/MUsers/AllUser'], resolve)
                    }
                },
                {
                    path: 'userbll',
                    name: '',
                    component (resolve) {
                        require(['@/components/MUsers/UserList'], resolve)
                    },
                    children: MyUser
                },
                {
                    path: 'edituser',
                    name: '编辑用户',
                    component (resolve) {
                        require(['@/components/MUsers/EditUser'], resolve)
                    }
                },
                {
                    path: 'card',
                    name: '需要催款客户',
                    component (resolve) {
                        require(['@/components/DealWith/NotPurchased'], resolve)
                    }
                },
                {
                    path: 'nuser',
                    name: '连续30天未出票客户',
                    component (resolve) {
                        require(['@/components/DealWith/PressMoney'], resolve)
                    }
                }
            ]
        }
    ]
})
