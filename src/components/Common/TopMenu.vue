<template>
    <div class="topmenu-box" @click="handleClick($event)">
        <el-dropdown id="user" :class='activeName == "user"? "cur" : ""'>
            <span class="el-dropdown-link">
                M妙奇艺<i class="el-icon-arrow-down el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>M妙奇艺</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div id="order" :class='activeName == "order"? "cur" : ""'>机票订单</div>
        <div id="payrecord" :class='activeName == "payrecord"? "cur" : ""'>付款记录</div>
        <div id="persons" :class='activeName == "persons"? "cur" : ""'>乘机人管理</div>
        <div id="bill" :class='activeName == "bill"? "cur" : ""'>账单</div>
        <el-badge id="paycount" :value="availableLimit" :class='(activeName == "paycount"? "cur " : "") + "blue"'>
            付款总额
        </el-badge>
        <el-badge id="credit" :value="availableLimit" :class='(activeName == "credit"? "cur " : "") + "warning"'>
            信用额度
        </el-badge>
        <el-badge id="debt" :value="availableLimit" :class='activeName == "debt"? "cur" : ""'>
            欠款总额
        </el-badge>
        <el-badge id="settle" :value="availableLimit" :class='(activeName == "settle"? "cur" : "") + "zi"'>
            急需结算金额
        </el-badge>
        <el-badge id="usable" :value="availableLimit" :class='(activeName == "usable"? "cur" : "") + "green"'>
            可用额度
        </el-badge>
        <el-badge id="lastOrderTime" :value="lastOrderTime" :class='activeName == "lastOrderTime"? "cur" : ""' type="primary">
            上次订单时间
        </el-badge>
    </div>
</template>

<script>
export default {
    name: 'TopMenu',
    data () {
        return {
            activeName: 'user',
            lastOrderTime: '2019-06-12',
            availableLimit: '11111'
        }
    },
    methods: {
        handleClick: function (v) {
            this.activeName = v.target.id || 'user'
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
    >div{
        margin-left: 3.5%;
        height: 100%;
        line-height: 68px;
        cursor: pointer;
        box-sizing: border-box;
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
