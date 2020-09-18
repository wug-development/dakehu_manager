export default [
    {
        path: '/',
        name: '订单列表',
        component (resolve) {
            require(['@/components/MUsers/MyUser/OrderList'], resolve)
        }
    },
    {
        path: 'gnorderdetail',
        name: '国内订单详情',
        component (resolve) {
            require(['@/components/MUsers/MyUser/GNOrderDetail'], resolve)
        }
    },
    {
        path: 'gjorderdetail',
        name: '国际订单详情',
        component (resolve) {
            require(['@/components/MUsers/MyUser/GJOrderDetail'], resolve)
        }
    },
    {
        path: 'mpersons',
        name: '乘机人管理',
        component (resolve) {
            require(['@/components/MUsers/MyUser/MPersons'], resolve)
        }
    },
    {
        path: 'payrecord',
        name: '付款记录',
        component (resolve) {
            require(['@/components/MUsers/MyUser/PayRecord'], resolve)
        }
    },
    {
        path: 'bill',
        name: '交易账单',
        component (resolve) {
            require(['@/components/MUsers/MyUser/Bill'], resolve)
        }
    },
]