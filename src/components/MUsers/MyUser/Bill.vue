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
                        <th></th>
                        <th>乘机人</th>
                        <th>行程</th>
                        <th>航班号</th>
                        <th>出发日期</th>
                        <th>舱位</th>
                        <th>票价</th>
                        <th>机建税金</th>
                        <th>合计</th>
                        <th>票号</th>
                        <th>折扣</th>
                        <th>备注</th>
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
                        <td>{{item.dnTotalPrice}}</td>
                        <td>{{item.dnTax}}</td>
                        <td>{{item.dnJieSuanPrice}}</td>
                        <td>{{item.dcTicketNO}}</td>
                        <td>{{item.dnReturnPoint1}}%</td>
                        <td>{{item.dcOther}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <div class="btns">
                    <div class="btn-label btn-export">导出</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>

        <div class="layer" v-if="showLayer">
            <div class="layer-box">
                <div class="title">账单详情<i class="el-icon-error" @click="showLayer = false"></i></div>
                <div class="bill-info" cellspacing="0" cellpadding="0">
                    <table>
                        <tbody>
                            <tr>
                                <td>航空公司：</td>
                                <td>{{billinfo.dcAirCompanyName}}</td>
                                <td>记录编号：</td>
                                <td>{{billinfo.dcOrderCode}}</td>
                                <td>行程：</td>
                                <td>{{billinfo.dcStartCity}}-{{billinfo.dcBackCity}}</td>
                                <td>票价：</td>
                                <td>{{billinfo.dnTotalPrice}}</td>
                            </tr>
                            <tr>
                                <td>代理费：</td>
                                <td>{{billinfo.dnServicePrice}}</td>
                                <td>基建税金：</td>
                                <td>{{billinfo.dnTax}}</td>
                                <td>人数：</td>
                                <td>{{billinfo.dnPersonNumber}}</td>
                                <td>保险：</td>
                                <td>{{billinfo.dnServicePrice}}</td>
                            </tr>
                            <tr>
                                <td>应收：</td>
                                <td>{{billinfo.dnSellPrice}}</td>
                                <td>服务费：</td>
                                <td>{{billinfo.dnServicePrice}}</td>
                                <td>合计：</td>
                                <td>{{billinfo.dnJieSuanPrice}}</td>
                                <td>实际到账：</td>
                                <td>{{billinfo.dnShiJiDaoZhang}}</td>
                            </tr>
                            <tr>
                                <td>结算价：</td>
                                <td>{{billinfo.dnJieSuanPrice}}</td>
                                <td>利润：</td>
                                <td>{{billinfo.dnLiRun}}</td>
                                <td>出票点：</td>
                                <td>{{billinfo.dcOutTicketName}}</td>
                                <td>票号：</td>
                                <td>{{billinfo.dcTicketNO}}</td>
                            </tr>
                            <tr>
                                <td>起落时间：</td>
                                <td>{{billinfo.dcFlightTime}}</td>
                                <td>客户：</td>
                                <td>{{billinfo.dcCompanyName}}</td>
                                <td>送票方式：</td>
                                <td>不送</td>
                                <td>送票员：</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td>乘机人：</td>
                                <td>{{billinfo.dcPersonName}}</td>
                                <td>航班号：</td>
                                <td>{{billinfo.dcFlightNumber}}</td>
                                <td>出发日期：</td>
                                <td>{{billinfo.dcStartDate}}</td>
                                <td>账单票价：</td>
                                <td>{{billinfo.dnFlightPrice}}</td>
                            </tr>
                            <tr>
                                <td>舱位：</td>
                                <td>{{billinfo.dcRakedClass}}</td>
                                <td>折扣：</td>
                                <td>{{billinfo.dnReturnPoint1}}%</td>
                                <td>订单号：</td>
                                <td>{{billinfo.dcOrderID}}</td>
                                <td>奖金：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>收款方式：</td>
                                <td>{{billinfo.dcPaymentMethod1}}</td>
                                <td>订票日期：</td>
                                <td>{{billinfo.dtAddTime.split('T')[0]}}</td>
                            </tr>
                            <tr>
                                <td>备注：</td>
                                <td colspan = "7">{{billinfo.dcOther}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
            showLayer: false,
            page: 1,
            pageNum: 10,
            pageCount: 1,
            billinfo: {}
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
                    console.log(res.data)
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
            }
        }


        // let arr = []
        // for (let i = 0; i < 5; i++) {
        //     arr.push({
        //         name: '王平',
        //         flight: '鞍山-北京',
        //         flightNO: 'CZ6113',
        //         datetime: '2018-1-22',
        //         site: '经济舱',
        //         price: 980,
        //         tax: 5,
        //         money: 100000,
        //         ticketNO: '010-12345678978',
        //         discount: '6.6折',
        //         other: ''
        //     })
        // }
        // this.dataList = arr
    }
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
