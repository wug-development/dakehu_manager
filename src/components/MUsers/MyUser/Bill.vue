<template>
    <div class="bill-box">
        <SiteMap></SiteMap>
        <div class="box-bg">
            <div class="div-linebox">
                <div class="div-labels">时间查询:</div>
                <el-date-picker v-model="sedate" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
                <div class="div-labels">客户:</div>
                <el-select v-model="selPerson" value-key="name">
                    <el-option v-for="item in personList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
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
                        <td>{{item.name}}</td>
                        <td>{{item.flight}}</td>
                        <td>{{item.flightNO}}</td>
                        <td>{{item.datetime}}</td>
                        <td>{{item.site}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.tax}}</td>
                        <td>{{item.money}}</td>
                        <td>{{item.ticketNO}}</td>
                        <td>{{item.discount}}</td>
                        <td>{{item.other}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <div class="btns">
                    <div class="btn-label btn-export">导出</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="5" @current-change="handleCurrentChange" :total="1000"></el-pagination>
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
                                <td>CA</td>
                                <td>记录编号：</td>
                                <td>JM0ZNY</td>
                                <td>行程：</td>
                                <td>鞍山-北京</td>
                                <td>票价：</td>
                                <td>980</td>
                            </tr>
                            <tr>
                                <td>代理费：</td>
                                <td>150</td>
                                <td>基建税金：</td>
                                <td>60</td>
                                <td>人数：</td>
                                <td>1</td>
                                <td>保险：</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td>应收：</td>
                                <td>1030</td>
                                <td>服务费：</td>
                                <td>50</td>
                                <td>合计：</td>
                                <td>1340</td>
                                <td>实际到账：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>结算价：</td>
                                <td>0</td>
                                <td>利润：</td>
                                <td>0</td>
                                <td>出票点：</td>
                                <td>K凯行网</td>
                                <td>票号：</td>
                                <td>999-3451265478</td>
                            </tr>
                            <tr>
                                <td>起落时间：</td>
                                <td>12:50-17:20</td>
                                <td>客户：</td>
                                <td>M妙奇艺</td>
                                <td>送票方式：</td>
                                <td>不送</td>
                                <td>送票员：</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td>乘机人：</td>
                                <td>王平</td>
                                <td>航班号：</td>
                                <td>CZ6113</td>
                                <td>出发日期：</td>
                                <td>2019-1-20</td>
                                <td>账单票价：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>舱位：</td>
                                <td>经济舱</td>
                                <td>折扣：</td>
                                <td>6.6折</td>
                                <td>订单号：</td>
                                <td>010-564678956</td>
                                <td>奖金：</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>收款方式：</td>
                                <td></td>
                                <td>备注：</td>
                                <td>李阳</td>
                                <td>订票日期：</td>
                                <td></td>
                                <td></td>
                                <td></td>
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
            sedate: '',
            other: '',
            selPerson: '',
            personList: [],
            dataList: [],
            showLayer: true,
            page: 1,
            pageNum: 5,
            pageCount: 1,
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
            this.$http.get(this.apis + '/api/order/getorderperson', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: this.pageNum,
                filterdate: this.sedate.join(','),
                filtername: this.selPerson.name
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
        width: 800px;
        height: 350px;
        margin-left: -400px;
        margin-top: -175px;
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
