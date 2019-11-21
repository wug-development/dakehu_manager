<template>
    <div class="login-box">
        <div class="formbox">
            <div class="login-form-body">
                <div class="fix-box">
                    <div class="fix-box-title">欢迎登录</div>
                    <div class="fix-box-line"><span>Welcome landing</span></div>
                    <input type="text" class="txt-form txt-acount" maxlength="40" v-model="username" placeholder="请输入登录账号">
                    <input type="password" class="txt-form txt-password" maxlength="40" v-model="password" placeholder="请输入登录账号">
                    <div class="fix-box-tip" v-show="isCheck">提示：用户名或者密码错误!</div>
                    <div class="btn btn-login" @click="login">登 录 <i v-if="isLogining" class="el-icon-loading"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            isCheck: false,
            username: '',
            password: '',
            isLogining: false
        }
    },
    methods: {
        login: function () {
            if (this.username == '' || this.password == '') {
                this.isCheck = true
            } else {
                this.isLogining = true
                this.$http.get(this.apis + '/api/account/login', {params: {
                    'uname': this.username,
                    'upass': this.password
                }})
                .then(res => {
                    this.isLogining = false
                    if (res && res.data && res.data.status != 0) {
                        let _d = res.data.data
                        _d.logintime = this.utils.dateFormat('yyyy-MM-dd hh:mm:ss')
                        
                        sessionStorage.setItem('loginData', JSON.stringify(_d))
                        this.$router.push({
                            path: '/main'
                        })
                    } else {
                        this.isCheck = true
                    }
                }).catch(res => {
                    this.isLogining = false
                    this.MessageBox('网络连接失败，请检查网络！')
                })
            }
        }
    },
    created () {
        let that = this
        document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which
            if (keycode == 13) {
                that.login()
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/set.scss';
.login-box{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../assets/images/login_bg.png') no-repeat center;
    .formbox{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1060px;
        height: 642px;
        margin-left: -530px;
        margin-top: -321px;
        box-shadow: 0 5px 5px #333;
        background: url('../assets/images/login_left.png') no-repeat left center;
        background-color: #fff;
        .login-form-body{
            width: 572px;
            height: 100%;
            text-align: center;
            float: right;
            .fix-box{
                width: 412px;
                margin: 0 auto;
                height: 100%;
                padding-top: 80px;
                box-sizing: border-box;
                .fix-box-title{
                    font-size: 28px;
                }
                .fix-box-line{
                    font-size: 14px;
                    color: #6b6b6b;
                    width: 200px;
                    height: 10px;
                    border-bottom: 1px solid #6b6b6b;
                    margin: 5px auto;
                    span{
                        padding: 0 10px;
                        background-color: #fff;
                    }
                }
                .txt-form{
                    margin-top: 35px;
                    border: 0;
                    width: 100%;
                    height: 50px;
                    font-size: 16px;
                    color: #c2c1c1;
                    padding-left: 50px;
                    border-bottom: 1px solid #c2c1c1;
                    box-sizing: border-box;
                }        
                .txt-acount{
                    background: url('../assets/images/icon_login_account.png') no-repeat center;
                    background-position-x: 15px;
                }
                .txt-password{
                    background: url('../assets/images/icon_login_pass.png') no-repeat center;
                    background-position-x: 15px;
                }
                .txt-acount:focus{
                    background: url('../assets/images/icon_login_account_focus.png') no-repeat center;
                    background-position-x: 15px;
                }
                .txt-password:focus{
                    background: url('../assets/images/icon_login_pass_focus.png') no-repeat center;
                    background-position-x: 15px;
                }
                .txt-form:focus{
                    color: #0e0e0e;
                    border-bottom: 1px solid $pubcolor;    
                }
                .txt-form:focus::placeholder{
                    color: #0e0e0e;
                }
                .fix-box-tip{
                    height: 20px;
                    color: #f00000;
                    font-size: 14px;
                    margin: 10px;
                    text-align: left;
                }
                .btn{
                    width: 100%;
                    height: 60px;
                    line-height: 60px;
                    font-size: 20px;
                    color: #fff;
                    background-color: $pubcolor;
                    border-radius: 10px;
                    margin-top: 30px;
                    box-shadow: 0 5px 5px #aaa;
                    cursor: pointer;
                    user-select: none;
                    position: relative;
                }
                .btn:active{
                    background-color: $pubcoloractive;
                }
                .el-icon-loading{
                    position: absolute;
                    top: 21px;
                    margin-left: 10px;
                }
            }
        }
    }
}
</style>
