<template>
    <div class="sendemail-box">
        <SiteMap></SiteMap>
        <div>
            <img src="../../assets/images/userregister.png" alt="">
        </div>
        
        <div class="btn-box">
            <div class="btn-other" @click="sendEmail">发送密码重置页面</div>
            <span>至 <input type="text" class="txt-email" v-model="email"></span>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'
export default {
    name: 'SendEmail',
    data () {
        return {
            email: ''
        }
    },
    components: {
        SiteMap
    },
    methods : {
        sendEmail: function () {            
            this.$http.get(this.apis + '/api/company/sendemail', {params: {
                email: this.email
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox('发送成功', '温馨提示')
                }
            })
        }
    },
    created () {
        this.email = sessionStorage.getItem('sendemail')
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.sendemail-box{
    img{
        margin-left: 40px;
    }
    .btn-box{
        padding: 40px;
        box-sizing: border-box;
        display: flex;
        span{
            margin-left: 15px;
            line-height: 40px;
            color: $pubbtncolor;
        }
        .txt-email{
            border: 1px solid #aaa;
            height: 40px;
            box-sizing: border-box;
            text-indent: 1em;
            width: 260px;
            margin-left: 10px;
            color: #333;
        }
    }
}
</style>
