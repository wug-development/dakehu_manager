import AllUser from '@/components/MUsers/MyUser/AllUser'
import MPersons from '@/components/MUsers/MyUser/MPersons'
import PayRecord from '@/components/MUsers/MyUser/PayRecord'
import Bill from '@/components/MUsers/MyUser/Bill'

export default [
    {
        path: '/',
        name: 'AllUser',
        component: AllUser
    },
    {
        path: 'mpersons',
        name: 'MPersons',
        component: MPersons
    },
    {
        path: 'payrecord',
        name: 'PayRecord',
        component: PayRecord
    },
    {
        path: 'bill',
        name: 'Bill',
        component: Bill
    },
]