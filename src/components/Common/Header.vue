<template>
    <div class="header-box">
        <div class="title">凯行网企业月结平台</div>
        <div class="info">
            <div class="headimg">
                <div class="el-icon-user-solid"></div>
                <span>{{name}}</span>
            </div>
            <div class="exit" @click="loginOut">退出 <span class="iconfont">&#xe637;</span></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            name: ''
        }
    },
    methods: {
        loginOut: function () {
            sessionStorage.setItem('loginData', '')
            this.$router.push({
                path: '/'
            })
        }
    },
    created () {
        let data = sessionStorage.getItem('loginData')
        if (data) {
            let account = JSON.parse(data)
            this.name = account.realname
        } else {
            this.$router.push({
                path: '/'
            })
        }     
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.header-box{
    height: 84px;
    background: url('../../assets/images/logo.png') no-repeat left center;
    background-color: $pubcolor;
    background-position: 30px 20px;
    box-shadow: 0 4px 5px #ccc;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 40px 0 230px;
    .title{
        padding-top: 30px;
        font-size: 24px;
        line-height: 24px;
        box-sizing: border-box;
    }
    .info{
        display: flex;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
        padding-top: 20px;
        cursor: pointer;
        .headimg{
            display: flex;
            margin-right: 15px;
            div{
                width: 40px;
                height: 40px;
                line-height: 40px;
                border-radius: 40px;
                background-color: #fff;
                overflow: hidden;
                box-sizing: border-box;
                text-align: center;
                font-size: 28px;
                margin-right: 10px;
                color: $pubcolor;
            }
        }
        .exit{
            display: flex;
            margin-top: 10px;
            height: 20px;
            line-height: 20px;
            border-left: 1px solid #ccc;
            padding-left: 15px;
            span{
                font-size: 24px;
                margin-left: 5px;
            }
        }
    }
}
</style>
