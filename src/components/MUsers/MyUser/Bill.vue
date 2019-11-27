<template>
    <div class="bill-box">
        <SiteMap></SiteMap>
        <div class="box-bg">
            <div class="div-linebox">
                <div class="div-labels">时间查询:</div>
                <el-date-picker v-model="sedate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                <!-- <div class="div-labels">客户:</div>
                <el-select v-model="selPerson" value-key="name">
                    <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select> -->
                <div class="btn" @click="searchData">搜索</div>
            </div>
        </div>
        <div class="box-bg remit-money">
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th style="width:20px;"></th>
                        <th style="width:10%;">乘机人</th>
                        <th style="width:10%">行程</th>
                        <th style="width:10%">航班号</th>
                        <th style="width:10%">出发日期</th>
                        <th style="width:5%">舱位</th>
                        <th style="width:5%">票价</th>
                        <th style="width:5%">机建税金</th>
                        <th style="width:5%">合计</th>
                        <th style="width:10%">票号</th>
                        <th style="width:5%">折扣</th>
                        <th style="width:25%">备注</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td class="active" @click="showBillLayer(item)">{{item.dcPersonName}}</td>
                        <td>{{item.dcStartCity}}-{{item.dcBackCity}}</td>
                        <td>{{item.dcFlightNumber}}</td>
                        <td>{{item.dcStartDate}}</td>
                        <td>{{item.dcRakedClass}}</td>
                        <td>{{item.dnSellPrice}}</td>
                        <td>{{item.dnTax}}</td>
                        <td>{{item.dnCountPrice}}</td>
                        <td>{{item.dcTicketNO}}</td>
                        <td>{{checkDiscount(item.dnDiscount)}}</td>
                        <td style="word-break: break-all;">{{item.dcOther}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page" v-if="pageCount">
                <div class="btns">
                    <div class="btn-label btn-export" id="at" @click="exportExcel">导出</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>

        <div class="layer" v-if="showLayer">
            <div class="layer-box">
                <div class="title">账单详情<i class="el-icon-error" @click="showLayer = false"></i></div>
                <div class="bill-info" cellspacing="0" cellpadding="0">
                    <div><span>乘机人：</span>{{billinfo.dcPersonName}}</div>
                    <div><span>行程：</span>{{billinfo.dcStartCity}}-{{billinfo.dcBackCity}}</div>
                    <div><span>航班号：</span>{{billinfo.dcFlightNumber}}</div>
                    <div><span>出发日期：</span>{{billinfo.dcStartDate}}</div>
                    <div><span>舱位：</span>{{billinfo.dcRakedClass}}</div>
                    <div><span>票价：</span>{{billinfo.dnTotalPrice}}</div>
                    <div><span>票号：</span>{{billinfo.dcTicketNO}}</div>
                    <div><span>折扣：</span>{{billinfo.dnDiscount}}</div>
                    <div v-if="checkField('航空公司') > -1"><span>航空公司：</span>{{billinfo.dcAirCompanyName}}</div>
                    <div v-if="checkField('服务费') > -1"><span>服务费：</span>{{billinfo.dnServicePrice}}</div>                    
                    <div v-if="checkField('记录编号') > -1"><span>记录编号：</span>{{billinfo.dcOrderCode}}</div>
                    <div v-if="checkField('代理费') > -1"><span>代理费：</span>{{billinfo.dnReturnPoint1}}</div>
                    <div v-if="checkField('基建税金') > -1"><span>基建税金：</span>{{billinfo.dnTax}}</div>
                    <div v-if="checkField('人数') > -1"><span>人数：</span>{{billinfo.dnPersonNumber}}</div>
                    <div v-if="checkField('保险') > -1"><span>保险：</span>{{billinfo.dnSafePrice}}</div>
                    <div v-if="checkField('应收') > -1"><span>应收：</span>{{billinfo.dnYingShouPrice}}</div>
                    <div v-if="checkField('合计') > -1"><span>合计：</span>{{billinfo.dnCountPrice}}</div>
                    <div v-if="checkField('实际到账') > -1"><span>实际到账：</span>{{billinfo.dnShiJiDaoZhang}}</div>
                    <div v-if="checkField('结算价') > -1"><span>结算价：</span>{{billinfo.dnJieSuanPrice}}</div>
                    <div v-if="checkField('利润') > -1"><span>利润：</span>{{billinfo.dnLiRun}}</div>
                    <div v-if="checkField('出票点') > -1"><span>出票点：</span>{{billinfo.dcOutTicketName}}</div>
                    <div v-if="checkField('起落时间') > -1"><span>起落时间：</span>{{billinfo.dcFlightTime}}</div>
                    <div v-if="checkField('客户') > -1"><span>客户：</span>{{billinfo.dcCompanyName}}</div>
                    <div v-if="checkField('送票方式') > -1"><span>送票方式：</span>{{billinfo.dcSendTicketType}}</div>
                    <div v-if="checkField('送票员') > -1"><span>送票员：</span>{{billinfo.dcSendTicketerName}}</div>
                    <div v-if="checkField('账单票价') > -1"><span>账单票价：</span>{{billinfo.dnFlightPrice}}</div>
                    <div v-if="checkField('订单号') > -1"><span>订单号：</span>{{billinfo.dcOrderID}}</div>
                    <div v-if="checkField('奖金') > -1"><span>奖金：</span>{{billinfo.dnBonus}}</div>
                    <div v-if="checkField('收款方式') > -1"><span>收款方式：</span>{{billinfo.dcPaymentMethod1}}</div>
                    <div v-if="checkField('订票日期') > -1"><span>订票日期：</span>{{billinfo.dtAddTime.split('T')[0]}}</div>
                    <div style="width: 100%;"><span>备注：</span>{{billinfo.dcOther}}</div>
                </div>
            </div>
        </div>
        <div v-show="islist">
            <table id="billlist">
                <thead>
                    <tr>
                        <th></th>
                        <th>乘机人</th>
                        <th>行程</th>
                        <th>航班号</th>
                        <th>出发日期</th>
                        <th>舱位</th>
                        <th>票价</th>
                        <th>票号</th>
                        <th>折扣</th>
                        <th v-if="checkField('航空公司') > -1">航空公司</th>
                        <th v-if="checkField('服务费') > -1">服务费</th>
                        <th v-if="checkField('记录编号') > -1">记录编号</th>
                        <th v-if="checkField('代理费') > -1">代理费</th>
                        <th v-if="checkField('机建税金') > -1">机建税金</th>
                        <th v-if="checkField('人数') > -1">人数</th>
                        <th v-if="checkField('保险') > -1">保险</th>
                        <th v-if="checkField('应收') > -1">应收</th>
                        <th v-if="checkField('合计') > -1">合计</th>
                        <th v-if="checkField('实际到账') > -1">实际到账</th>
                        <th v-if="checkField('结算价') > -1">结算价</th>
                        <th v-if="checkField('利润') > -1">利润</th>
                        <th v-if="checkField('出票点') > -1">出票点</th>
                        <th v-if="checkField('起落时间') > -1">起落时间</th>
                        <th v-if="checkField('客户') > -1">客户</th>
                        <th v-if="checkField('送票方式') > -1">送票方式</th>
                        <th v-if="checkField('送票员') > -1">送票员</th>
                        <th v-if="checkField('账单票价') > -1">账单票价</th>
                        <th v-if="checkField('订单号') > -1">订单号</th>
                        <th v-if="checkField('奖金') > -1">奖金</th>
                        <th v-if="checkField('收款方式') > -1">收款方式</th>
                        <th v-if="checkField('订票日期') > -1">订票日期</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in bList" :key="i">
                        <td></td>
                        <td>{{item.dcPersonName}}</td>
                        <td>{{item.dcStartCity}}-{{item.dcBackCity}}</td>
                        <td>{{item.dcFlightNumber}}</td>
                        <td>{{item.dcStartDate}}</td>
                        <td>{{item.dcRakedClass}}</td>
                        <td>{{item.dnTotalPrice}}</td>
                        <td>{{item.dcTicketNO}}</td>
                        <td>{{item.dnDiscount}}</td>
                        <td v-if="checkField('航空公司') > -1">{{item.dcAirCompanyName}}</td>
                        <td v-if="checkField('服务费') > -1">{{item.dnServicePrice}}</td>
                        <td v-if="checkField('记录编号') > -1">{{item.dcOrderCode}}</td>
                        <td v-if="checkField('代理费') > -1">{{item.dnReturnPoint1}}</td>
                        <td v-if="checkField('机建税金') > -1">{{item.dnTax}}</td>
                        <td v-if="checkField('人数') > -1">{{item.dnPersonNumber}}</td>
                        <td v-if="checkField('保险') > -1">{{item.dnSafePrice}}</td>
                        <td v-if="checkField('应收') > -1">{{item.dnYingShouPrice}}</td>
                        <td v-if="checkField('合计') > -1">{{item.dnCountPrice}}</td>
                        <td v-if="checkField('实际到账') > -1">{{item.dnShiJiDaoZhang}}</td>
                        <td v-if="checkField('结算价') > -1">{{item.dnJieSuanPrice}}</td>
                        <td v-if="checkField('利润') > -1">{{item.dnLiRun}}</td>
                        <td v-if="checkField('出票点') > -1">{{item.dcOutTicketName}}</td>
                        <td v-if="checkField('起落时间') > -1">{{item.dcFlightTime}}</td>
                        <td v-if="checkField('客户') > -1">{{item.dcCompanyName}}</td>
                        <td v-if="checkField('送票方式') > -1">{{item.dcSendTicketType}}</td>
                        <td v-if="checkField('送票员') > -1">{{item.dcSendTicketerName}}</td>
                        <td v-if="checkField('账单票价') > -1">{{item.dnFlightPrice}}</td>
                        <td v-if="checkField('订单号') > -1">{{item.dcOrderID}}</td>
                        <td v-if="checkField('奖金') > -1">{{item.dnBonus}}</td>
                        <td v-if="checkField('收款方式') > -1">{{item.dcPaymentMethod1}}</td>
                        <td v-if="checkField('订票日期') > -1">{{item.dtAddTime.split('T')[0]}}</td>
                        <td style="width:700px;">{{item.dcOther}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import SiteMap from '@/components/Common/SiteMap.vue'
export default {
    name: 'Bill',
    data () {
        return {
            money: '',
            selCompany: '',
            sedate: [],
            other: '',
            selPerson: '',
            personList: [],
            dataList: [],
            bList: [],
            filedList: [],
            showLayer: false,
            page: 1,
            pageNum: 10,
            pageCount: 0,
            billinfo: {},
            islist: false
        }
    },
    components: {
        SiteMap
    },
    methods: {
        searchData () {
            this.page = 1
            this.getDataList()
        },
        handleCurrentChange (v) {
            this.page = v
            this.getDataList()
        },
        getDataList () {
            this.$http.get(this.apis + '/api/ticket/getticketlist', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: this.pageNum,
                filterdate: this.sedate.join(',')
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
        getAllPer () {
            this.$http.get(this.apis + '/api/passenger/getalllist', {params: {
                cid: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.personList = res.data.data
                }
            })
        },
        showBillLayer (v) {
            this.showLayer = true
            this.billinfo = v
        },
        exportExcel () {
            this.$http.get(this.apis + '/api/ticket/exportticket', {params: {
                cid: this.selCompany.id,
                filterdate: this.sedate.join(',')
            }})
            .then(res => {
                this.bList = res.data.data
                setTimeout(()=>{
                    createExcel('billlist', this.sedate)
                },200)
            })
        },
        getField () {
            this.$http.get(this.apis + '/api/company/getfield', {params: {
                cid: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.filedList = res.data.data
                }
            })
        },
        checkField (v) {
            return this.filedList.findIndex(e => {
                return e.name === v
            })
        },
        checkDiscount (v) {
            if (v === 10) {
                return "全价"
            } else {
                return v + "折"
            }
        }
    },
    created () {
        this.selCompany = this.$store.state.selCompany
        let account = sessionStorage.getItem('loginData')
        if (account) {
            this.$store.state.topmenu = "bill"
            this.user = JSON.parse(account)
            let com = sessionStorage.getItem('selCompany')
            if (com) {
                let c = JSON.parse(com)
                this.selCompany = c
                this.getDataList ()
                this.getAllPer()
                this.getField()
            }
        }
    }
}

function createExcel(v, _d) {
    var _head = '<html><head><meta charset="UTF-8"></head><body>'
    var _footer = '</body></html>'
    var html = _head + document.getElementById(v).outerHTML + _footer

    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    var blob = new Blob([html], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    let _t = []
    if (_d.length > 0) {
        for (const key in _d) {
            _t.push(_d[key].replace(/-/g, ''))
        }
    }
    let filename = "交易账单" + _t.join('-') + ".xls"
    const downloadElement = document.createElement('a')
    let href = ''
    if(window.URL) href = window.URL.createObjectURL(blob)
    else href = window.webkitURL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = filename
    document.body.appendChild(downloadElement)
    downloadElement.click()
    if(window.URL) window.URL.revokeObjectURL(href)
    else window.webkitURL.revokeObjectURL(href)
    document.body.removeChild(downloadElement)
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.bill-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .div-linebox{
        padding-top: 20px;
        .div-label{
            margin-left: 10px;
        }
    }
    .btn{
        width: 80px;
        margin-left: 20px;
    }
    .remit-money{
        margin-top: 20px;
        height: 100%;
    }
    .layer-box{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1000px;
        height: 360px;
        margin-left: -500px;
        margin-top: -180px;
        background-color: #fff;
        .title{
            background-color: $pubcolor;
            color: #fff;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            .el-icon-error{
                float: right;
                margin-top: 7px;
                font-size: 26px;
                cursor: pointer;
            }
        }
        .bill-info{
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            div{
                width: 25%;
                height: 30px;
                line-height: 30px;
                span{
                    display: inline-block;
                    width: 75px;
                    color: #7f7f7f;
                }
            }
            table{
                width: 100%;
                td{
                    height: 30px;
                    line-height: 30px;
                }
                td:nth-child(odd){
                    color: #7f7f7f;
                    padding-left: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>
