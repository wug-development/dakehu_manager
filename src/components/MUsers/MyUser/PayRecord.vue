<template>
    <div class="payrecord-box">
        <SiteMap></SiteMap>
        <div class="box-bg">
            <div class="pubtitle">汇款信息</div>
            <div class="div-linebox">
                <div class="div-label">汇款金额:</div>
                <el-input v-model="money" type="number"></el-input>
                <div class="div-labels">汇款方式:</div>
                <el-select v-model="selPayType">
                    <el-option v-for="item in payType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <div class="div-labels">汇款日期:</div>
                <el-date-picker v-model="sdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                <div class="div-labels">汇款单位:</div>
                <el-select v-model="selCompany" value-key="name">
                    <el-option v-for="item in comList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div class="div-labels">备注:</div>
                <el-input v-model="other"></el-input>
                <div class="btn-other" @click="submitRecord">提交</div>
            </div>
        </div>
        <div class="box-bg remit-money">
            <div class="pubtitle">汇款列表</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th></th>
                        <th>汇款金额</th>
                        <th>汇款方式</th>
                        <th>汇款日期</th>
                        <th>付款单位</th>
                        <th>备注</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td>{{item.money}}</td>
                        <td>{{item.method}}</td>
                        <td>{{item.datetime}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.other}}</td>
                        <td :class="item.status == 1?'':'active'">{{item.status == 1? '已确认' : '等待确认'}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '@/components/Common/SiteMap.vue'
export default {
    name: 'PayRecord',
    data () {
        return {
            money: '',
            selPayType: '',
            selCompany: '',
            sdate: '',
            other: '',
            comList: [],
            dataList: [],
            payType: ['银行卡','支付宝','微信'],
            page: 1,
            pageNum: 5,
            pageCount: 1,
            user: {}
        }
    },
    components: {
        SiteMap
    },
    methods: {
        getAlllist () {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: ''
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.comList = res.data.data
                }
            })
        },
        getPayList () {
            this.$http.get(this.apis + '/api/payrecord/getpaylist', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: this.pageNum
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.dataList = res.data.data.data
                    if (res.data.data.pagecount) {
                        this.pageCount = res.data.data.pagecount
                    }
                }
            })
        },
        handleCurrentChange: function (v) {
            this.page = v
            this.getPayList ()
        },
        submitRecord () {
            if (this.money != '') {
                this.$http.post(this.apis + '/api/payrecord/submitpayrecord', {
                    money: this.money,
                    payType: this.selPayType,
                    cid: this.selCompany.id,
                    manage: {
                        id: this.user.id,
                        name: this.user.uname
                    },
                    date: this.sdate,
                    other: this.other,
                })
                .then(res => {
                    console.log(res)
                    if (res && res.data && res.data.status != 0) {
                        this.MessageBox('提交成功', '温馨提示')
                        this.getPayList ()
                        this.money = ''
                        this.selPayType = ''
                        this.sdate = ''
                        this.other = ''
                    } else {
                        this.MessageBox('提交失败', '')
                    }
                })
            }    
        }
    },
    created () {
        this.stateCompany = this.$store.state.selCompany
        let account = sessionStorage.getItem('loginData')
        if (account) {
            this.user = JSON.parse(account)
            this.getAlllist()
            let com = sessionStorage.getItem('selCompany')
            if (com) {
                let c = JSON.parse(com)
                this.selCompany = c
                this.getPayList ()
            }
        }        
    },
    computed: {
        aa () {
            return this.$store.state.selCompany
        }
    },
    watch: {
        aa (newCount, oldCount) {
            this.selCompany = this.$store.state.selCompany
            this.getPayList ()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.payrecord-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .div-linebox{
        white-space: nowrap;
    }
    .el-input__inner{
        padding-right: 10px;
    }
    .el-input__inner::-webkit-outer-spin-button,.el-input__inner::-webkit-inner-spin-button{
        -webkit-appearance: none;
    }
    input[type="number"] {
        -moz-appearance: textfield;
    }
    .btn-other{
        width: 80px;
        margin-left: 20px;
    }
    .remit-money{
        margin-top: 20px;
        height: 100%;
    }
}
</style>
