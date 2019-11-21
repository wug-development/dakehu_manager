<template>
    <div class="payrecord-box">
        <SiteMap></SiteMap>
        <div class="box-bg">
            <div class="pubtitle">付款信息</div>
            <div class="div-linebox">
                <div class="div-label">付款金额:</div>
                <el-input v-model="money" type="number"></el-input>
                <div class="div-labels">付款方式:</div>
                <el-select v-model="selPayType">
                    <el-option v-for="item in payType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <div class="div-labels">付款日期:</div>
                <el-date-picker v-model="sdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                <div class="div-labels">付款单位:</div>
                <el-select v-model="payCompany" value-key="name">
                    <el-option v-for="item in comList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div class="div-labels">备注:</div>
                <el-input v-model="other"></el-input>
                <div class="btn-other" @click="submitRecord">提交</div>
            </div>
        </div>
        <div class="box-bg remit-money">
            <div class="pubtitle">付款列表</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th></th>
                        <th>付款金额</th>
                        <th>付款方式</th>
                        <th>付款日期</th>
                        <th>付款单位</th>
                        <th>备注</th>
                        <th>状态</th>
                        <th v-if="isLimitComfirm">操作</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td>{{item.money}}</td>
                        <td>{{item.method}}</td>
                        <td>{{item.datetime}}</td>
                        <td>{{selCompany.name == item.company?item.company:selCompany.name +'-'+ item.company}}</td>
                        <td>{{item.other}}</td>
                        <td :class="item.status == 1?'':'active'">{{item.status == 1? '已确认' : '等待确认'}}</td>
                        <td v-if="isLimitComfirm">
                            <div class="btns-box" v-if="item.status != 1"><div class="btn-save" @click="ComfirmPrice(item)">确认收款</div></div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page" v-if="pageCount">
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
            payCompany: '',
            sdate: '',
            other: '',
            comList: [],
            dataList: [],
            payType: ['现金','支票','对公账户','个人账户','刷卡','支付宝','易宝支付','微信支付'],
            page: 1,
            pageNum: 5,
            pageCount: 0,
            user: {},
            isLimitComfirm: false
        }
    },
    components: {
        SiteMap
    },
    methods: {
        getSubComlist () {
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.comList = res.data.data
                    this.comList.push(JSON.parse(JSON.stringify(this.selCompany)))
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
                    cid: this.payCompany.id,
                    manage: {
                        id: this.user.id,
                        name: this.user.uname
                    },
                    date: this.sdate,
                    other: this.other,
                })
                .then(res => {
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
        },
        ComfirmPrice (item) {
            this.MessageBox.confirm('你确认收款了么？', '温馨提示', {
                confirmButtonText: '取消',
                cancelButtonText: '确定',
                type: 'warning'
            }).then(() => {
                console.log('取消')
            }).catch(()=>{
                this.$http.get(this.apis + '/api/payrecord/comfirmpay', {params: {
                    id: item.id,
                    mid: this.user.id
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        this.Notification({
                            title: '保存成功',
                            type: 'success'
                        })
                        this.getPayList()
                    }
                })
            })
        }
    },
    created () {
        let sel = JSON.stringify(this.$store.state.selCompany)
        this.selCompany = JSON.parse(sel)
        this.payCompany = JSON.parse(sel)
        this.getSubComlist()
        this.getPayList ()
        this.$store.state.topmenu = 'payrecord'
        let account = sessionStorage.getItem('loginData')
        if (account) {
            this.user = JSON.parse(account)
            let _g = this.user.limits.findIndex(e => {
                return e.name === '收款确认'
            })
            if (_g > -1) {
                this.isLimitComfirm = true
            }
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
