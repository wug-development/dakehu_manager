<template>
    <div class="menu-box">
        <el-menu :default-openeds="OpenNode">
            <template v-for="item in menuList">
                <template v-if="item.children">
                    <el-submenu>
                        <template slot="title"><i :class='"el-icon-menu el-icon-" + item.keys'></i><span slot="title">{{item.name}}</span></template>
                        <el-menu-item-group>
                            <el-menu-item :class="isCheck==((i + 1) + '-' + (j + 1))?'is-active':''" v-for="(m, j) in item.children" :key="j" :index="(i + 1) + '-' + (j + 1)" @click="checkItem(i, j, m.href)">{{m.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :class="isCheck==item.keys?'is-active':''" @click="checkParent(item.keys)">
                        <i :class='"el-icon-menu el-icon-" + item.keys'></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data () {
        return {
            OpenNode: ['1'],
            isCheck: "1-1",
            menuList: []
        }
    },
    methods: {
        checkItem: function (i, j, href) {
            this.isCheck = (i + 1) + '-' + (j + 1)
            this.$router.push({
                path: href
            })
        },
        checkParent: function (v) {
            this.isCheck = v
            v = v === 'index'? '' : v
            this.$router.push({
                path: '/main/' + v
            })
        }
    },
    created () {
        let logindata = sessionStorage.getItem('loginData')
        if (logindata) {
            let _d = JSON.parse(logindata)
            this.menuList = _d.menus
        }
    }
}

function getMenuList () {
    return [
        {
            name: '首页',
            key: 'index',
            href: '',
            isOpen: true,
            children: [
                {
                    name: '今日订单',
                    href: '/',
                    isActive: true
                },{
                    name: '国际订单',
                    href: '/main/gjorderlist',
                    isActive: false
                },{
                    name: '国内订单',
                    href: '/main/gnorderlist',
                    isActive: false
                },{
                    name: 'PNR生成',
                    href: '/main/pnrcreat',
                    isActive: false
                }
            ]
        },{
            name: '用户管理',
            key: 'user',
            href: 'musers',
            isOpen: false
        },{
            name: '需要催款客户',
            key: 'card',
            href: 'notpurchased',
            isOpen: false
        },{
            name: '连续30天未出票客户',
            key: 'nuser',
            href: 'pressmoney',
            isOpen: false
        },{
            name: '客户注册',
            href: 'register',
            key: 'uset',
            isOpen: false
        },{
            name: '管理员管理',
            href: 'manager',
            key: 'manage',
            isOpen: false
        }
    ]
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.menu-box{
    width: 300px;
    height: 100%;
    background-color: #212a2f;
    color: #fff;
    padding-top: 30px;
    box-sizing: border-box;
    .el-menu{
        background-color: #212a2f;
        border-right: solid 1px #212a2f;
        .el-menu-item{
            background-color: #212a2f;
        }
        .el-submenu__title{
            color: #fff;
            font-size: 16px;
            display: flex;
            position: relative;
            i{
                color: #fff;
            }
        }
        .el-menu-item{
            color: #fff;
            font-size: 16px;
        }
        .el-menu-item:hover{
            background-color: #171d22;
        }
        .el-submenu [class^=el-icon-]{
            font-size: 22px;
            padding-top: 17px;
            margin-right: 15px;
            color: #fff;
        }
        .el-submenu__title:hover{
            background-color: #171d22;
            color: $pubcolor;
            [class^=el-icon-]{
                color: $pubcolor;
            }
        }
        .el-submenu__title:hover::before,.el-menu-item.is-active::before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 5px;
            height: 100%;
            background-color: $pubcolor;
        }
        .el-menu-item.is-active{
            background-color: #171d22;
            color: $pubcolor;
            position: relative;
        }
        .el-menu-item.is-active::after{
            content: '';
            position: absolute;
            right: -2px;
            top: 17px;
            display: block;
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 12px solid #fff;
        }
        .el-icon-menu{
            font-family: iconfont!important;
        }
        .el-icon-index:before{
            content: '\e605';
        }
        .el-icon-muser:before{
            content: '\e667';
        }
        .el-icon-card:before{
            content: '\e633';
        }
        .el-icon-nuser:before{
            content: '\e643';
        }
        .el-icon-register:before{
            content: '\e60b';
        }
        .el-icon-manager:before{
            content: '\e638';
        }
    }
}
</style>
