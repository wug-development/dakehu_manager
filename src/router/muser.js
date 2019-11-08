import OrderList from '@/components/MUsers/MyUser/OrderList'
import GNOrderDetail from '@/components/MUsers/MyUser/GNOrderDetail'
import GJOrderDetail from '@/components/MUsers/MyUser/GJOrderDetail'
import MPersons from '@/components/MUsers/MyUser/MPersons'
import PayRecord from '@/components/MUsers/MyUser/PayRecord'
import Bill from '@/components/MUsers/MyUser/Bill'

export default [
    {
        path: '/',
        name: '订单列表',
        component: OrderList
    },
    {
        path: 'gnorderdetail',
        name: '国内订单详情',
        component: GNOrderDetail
    },
    {
        path: 'gjorderdetail',
        name: '国际订单详情',
        component: GJOrderDetail
    },
    {
        path: 'mpersons',
        name: '乘机人管理',
        component: MPersons
    },
    {
        path: 'payrecord',
        name: '付款记录',
        component: PayRecord
    },
    {
        path: 'bill',
        name: '交易账单',
        component: Bill
    },
]