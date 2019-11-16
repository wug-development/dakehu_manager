<template>
    <div class="topmenu-box" @click="handleClick($event)">
        <!-- <el-dropdown id="user" :class='$store.state.topmenu == "user"? "cur" : ""' @command="composeValue">
            <span class="el-dropdown-link">
                {{selCompany.name}} <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="(item, i) in comList" :key="i"  :command='item'>{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->
        <div class="el-dropdown-link">
            {{selCompany.firstletter}}{{selCompany.name}}
        </div>
        <div id="index" :class='$store.state.topmenu == "index"? "cur" : ""'>机票订单</div>
        <div id="payrecord" :class='$store.state.topmenu == "payrecord"? "cur" : ""'>付款记录</div>
        <div id="mpersons" :class='$store.state.topmenu == "mpersons"? "cur" : ""'>乘机人管理</div>
        <div id="bill" :class='$store.state.topmenu == "bill"? "cur" : ""'>账单</div>
        <template v-if="acountInfo">
        <el-badge id="paycount" :value="acountInfo.paycount" :class='(activeName == "paycount"? "cur " : "") + "blue"'>
            付款总额
        </el-badge>
        <el-badge id="credit" :value="acountInfo.creditcount" :class='(activeName == "credit"? "cur " : "") + "warning"'>
            信用额度
        </el-badge>
        <el-badge id="debt" :value="acountInfo.debt" :class='activeName == "debt"? "cur" : ""'>
            欠款总额
        </el-badge>
        <el-badge id="settle" :value="acountInfo.urgentmoney" :class='(activeName == "settle"? "cur" : "") + "zi"'>
            急需结算金额
        </el-badge>
        <el-badge id="usable" :value="acountInfo.credit" :class='(activeName == "usable"? "cur" : "") + "green"'>
            可用额度
        </el-badge>
        <el-badge id="lastOrderTime" :value="acountInfo.lastdate" :class='activeName == "lastOrderTime"? "cur" : ""' type="primary">
            上次订单时间
        </el-badge>
        </template>
    </div>
</template>

<script>
export default {
    name: 'TopMenu',
    data () {
        return {
            activeName: '',
            lastOrderTime: '2019-06-12',
            availableLimit: '11111',
            comList: [],
            selCompany: '',
            credit: '',
            acountInfo: {}
        }
    },
    methods: {
        getAlllist () {
            // this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
            //     name: ''
            // }})
            // .then(res => {
            //     if (res && res.data && res.data.status != 0) {
            //         this.comList = res.data.data
            //         let com = sessionStorage.getItem('selCompany')
            //         if (com) {
            //             this.selCompany = JSON.parse(com)
            //         } else {
            //             this.selCompany = res.data.data[0]
            //             sessionStorage.setItem('selCompany', JSON.stringify(this.selCompany))
            //         }
            //         this.getAccount(this.selCompany.id)
            //     }
            // })
        },
        getAccount (id) {
            this.$http.get(this.apis + '/api/company/getcompanyaccount', {params: {
                id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.acountInfo = res.data.data[0]
                }
            })
        },
        handleClick: function (v) {
            let path = '/main';
            switch(v.target.id){
                case 'index': path += '/userbll'; break;
                case 'payrecord': path += '/userbll/payrecord'; break;
                case 'mpersons': path += '/userbll/mpersons'; break;
                case 'bill': path += '/userbll/bill'; break;
            }
            if (path != '/main') {
                this.$router.push({
                    path: path
                })
                this.$store.state.topmenu = v.target.id
            }      
            if (v.target.id === 'user') {
                this.$store.state.topmenu = 'user'
            }  
        }
    },
    created () {
        let data = sessionStorage.getItem('loginData')
        if (data) {
            this.selCompany = this.$store.state.selCompany
            if (!this.selCompany || !this.selCompany.id){
                this.selCompany = JSON.parse(sessionStorage.getItem('selCompany'))
                this.$store.state.selCompany = this.selCompany
            }
            this.getAccount(this.$store.state.selCompany.id)
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.topmenu-box{
    height: 68px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px #ddd;
    display: flex;
    align-items: center;
    padding: 0 60px 0 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
    .el-dropdown-link{
        color: $pubcolor;
    }
    >div{
        margin-left: 3.5%;
        height: 100%;
        line-height: 68px;
        cursor: pointer;
        box-sizing: border-box;
        white-space: nowrap;
    }
    >div:first-child{
        margin: 0;
    }
    .cur{
        border-bottom: 2px solid $pubcolor;
    }
    .el-dropdown{
        color: #000;
        .el-icon-caret-bottom{
            color: $pubcolor;
            font-size: 18px;
        }
    }
    .el-badge__content{
        top: 15px;
        right: 20px;
    }
    .blue{
        .el-badge__content{
            background-color: #00b9cc;
        }
    }
    .warning{
        .el-badge__content{
            background-color: #ffa623;
        }
    }
    .zi{
        .el-badge__content{
            background-color: #8957a1;
        }
    }
    .green{
        .el-badge__content{
            background-color: #80c269;
        }
    }
}
</style>
