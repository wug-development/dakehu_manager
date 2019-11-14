<template>
    <div class="nowdayorder-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable @change="checkCompany" :remote-method="remoteMethod" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" value-key="name" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.id" :label="item.shortname" :value="item"></el-option>
                </el-select>
                <div class="btn-gj" @click="gjsearch">
                    国际行程
                </div>
            </div>
            <div class="div-box div-gn">
                <div>出发城市:</div>
                <el-select v-model="selStartCity" value-key="name" filterable placeholder="请选择">
                    <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div>到达城市:</div>
                <el-select v-model="selEndCity" value-key="name" filterable placeholder="请选择">
                    <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div>出发日期:</div>
                <el-date-picker v-model="sdate" type="date" value-format="yyyy-MM-dd" placeholder="请选择"></el-date-picker>
                <div class="btn-search" @click="gnsearch">
                    国内查询
                </div>
                <div class="btn-gj" @click="toPNR">
                    PNR生成
                </div>
            </div>
        </div>
        <div class="box-bg noworder-box">
            <div class="table-title">今日订单</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th width="50"><div :class='"check-box" + (isCheckAll? " el-icon-check cur" : "")' @click="checkAll"></div></th>
                        <th>订单号</th>
                        <th>用户简称</th>
                        <th>乘机人</th>
                        <th>记录编号</th>
                        <th>行程</th>
                        <th>出发日期</th>
                        <th>金额</th>
                        <th>预定时间</th>
                        <th>状态</th>
                        <th>管理员</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in orderList" :key="i">
                        <td><div :class='"check-box" + (checkOrder.indexOf(item.dcOrderID) > -1?" el-icon-check cur":"")' @click="checkItem(item.dcOrderID)"></div></td>
                        <td class="active" @click="toDetail(item)">{{item.dcOrderID}}</td>
                        <td>{{item.dcCompanyName}}</td>
                        <td>{{item.dcLinkName}}</td>
                        <td>{{item.dcOrderCode}}</td>
                        <td>{{item.dcStartCity}}{{item.dcBackCity?"-"+item.dcBackCity:""}}</td>
                        <td>{{item.dcStartDate}}</td>
                        <td>{{item.dnTotalPrice}}</td>
                        <td>{{item.dtAddTime.replace('T', '')}}</td>
                        <td :class='item.dnStatus == 0? "deal" : ""'>{{checkstatus(item.dnStatus)}}</td>
                        <td>{{item.dcAdminName}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <div class="btns">
                    <div class="btn-label btn-del" @click="delOrder">删除</div>
                </div>
                <el-pagination v-if="(pageCount > 1)" background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'NowDayOrder',
    data () {
        return {
            company: [],
            childCompany: [],
            selCompany: '',
            selChildCompany: '',
            selStartCity: '',
            selEndCity: '',
            cityList: [],
            pickerOptions: {},
            sdate: '',
            isCheckAll: false,
            page: 1,
            pageNum: 5,
            pageCount: 1,
            orderList: [],
            checkOrder: []
        }
    },
    methods: {
        handleCurrentChange: function (v) {
            this.page = v
            this.getOrderList()
        },
        getOrderList: function () {
            this.$http.get(this.apis + '/api/orderlist/getnoworder', {params: {
                'page': this.page,
                'pagenum': this.pageNum
            }})
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.status != 0) {
                    this.pageCount = res.data.data.pageCount
                    this.orderList = res.data.data.data
                }
            })
        },
        checkItem: function (v) {
            let i = this.checkOrder.indexOf(v)
            if(i > -1) {
                this.checkOrder.splice(i, 1)
            } else {
                this.checkOrder.push(v)
            }
        },
        checkAll: function () {
            this.isCheckAll = !this.isCheckAll
            if(this.isCheckAll) {
                for (let i in this.orderList) {
                    this.checkOrder.push(this.orderList[i].OrderID)
                }
            } else {
                this.checkOrder = []
            }
        },
        checkstatus: function (v) {
            let txt = ''
            switch (v) {
                case 0: txt = '未处理'; break;
                default: txt = '处理完成'; break;
            }
            return txt
        },
        delOrder: function () {
            if (this.checkOrder.length > 0) {
                this.MessageBox.confirm('请选择要删除的订单', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(this.apis + '/api/orderlist/delorders', {params: {
                        oids: this.checkOrder.join(',')
                    }})
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            if (res.data.data > 0) {                            
                                this.Notification({
                                    title: '删除成功',
                                    message: '',
                                    type: 'success'
                                })
                            } else {
                                this.Notification.error({
                                    title: '删除失败',
                                    message: '该订单已删除'
                                })
                            }
                        } else {
                            this.Notification.error({
                                title: '删除失败',
                                message: ''
                            })
                        }
                    })
                })
            } else {
                this.MessageBox('请选择要删除的订单', '温馨提示')
            }
        },
        gjsearch: function () {
            if (this.selCompany){
                let obj = {
                    cp: this.selCompany,
                    cc: this.selChildCompany
                }
                sessionStorage.setItem('comsearch', JSON.stringify(obj))
                this.$router.push({
                    path: '/main/gjorderlist'
                })
            } else {
                this.MessageBox('请选择企业', '温馨提示')
            }
        },
        gnsearch: function () {
            if (this.selCompany == '') {
                this.MessageBox('请选择公司名称', '温馨提示')
            } else if (this.selStartCity == '') {
                this.MessageBox('请选择出发城市', '温馨提示')
            } else if (this.selEndCity == '') {
                this.MessageBox('请选择出发城市', '温馨提示')
            } else if (this.sdate == '') {
                this.MessageBox('请选择出发日期', '温馨提示')
            } else {
                var _str = JSON.stringify({
                    selCompany: this.selCompany,
                    selChildCompany: this.selChildCompany,
                    scity: this.selStartCity,
                    ecity: this.selEndCity,
                    sdate: this.sdate
                });
                console.log(_str);
                sessionStorage.setItem('gnsearch', _str)
                this.$router.push({
                    path: '/main/gnorderlist'
                })
            }
        },
        remoteMethod: function (v) {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: v
            }})
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    arr.sort((x, y) => {
                        return x.shortname.charCodeAt(0) - y.shortname.charCodeAt(0)
                    })
                    this.company = arr
                }
            })
        },
        checkCompany: function (v) {
            if (v != 2) {
                this.selChildCompany = ''
            }
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childCompany = res.data.data
                }
            })
        },
        toDetail (item) {
            let v = {
                id: item.dcCompanyID,
                name: item.dcCompanyName
            }
            this.$store.state.selCompany = v
            sessionStorage.setItem('selCompany', JSON.stringify(v))

            if (item.dnOrderType == 1) {
                this.$router.push({
                    path: '/main/userbll/gjorderdetail?id=' + item.dcOrderID + '&cid=' + item.dcCompanyID
                })
            } else {
                this.$router.push({
                    path: '/main/userbll/gnorderdetail?id=' + item.dcOrderID + '&cid=' + item.dcCompanyID
                })
            }
        },
        toPNR () {
            if (this.selCompany){
                let obj = {
                    cp: this.selCompany,
                    cc: this.selChildCompany
                }
                sessionStorage.setItem('comsearch', JSON.stringify(obj))
                this.$router.push({
                    path: '/main/pnrcreat'
                })
            } else {
                this.MessageBox('请选择企业', '温馨提示')
            }
        }
    },
    components: {
        SiteMap
    },
    created () {
        // 获取订单列表
        this.getOrderList()

        let obj = sessionStorage.getItem('comsearch')
        if (obj){
            let _d = JSON.parse(obj)
            if (_d.cp) {
                this.selCompany = _d.cp
                if (_d.cc) {
                    this.selChildCompany = _d.cc
                }
                this.checkCompany(2)
            }
        }
        //获取企业列表
        this.remoteMethod('')
        
        //获取城市列表
        this.$http.get(this.apis + '/api/city/getcity', {params: {}})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                this.cityList = res.data.data
            }
        })
    }
}

</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.nowdayorder-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .search-box{
        padding: 22px 35px;
        min-width: 800px;
        .div-box{
            display: flex;
            height: 40px;
            line-height: 40px;
            div{
                margin-right: 20px;
                white-space: nowrap;
            }
            .btn-gj{
                border: 1px solid $pubcolor;
                box-sizing: border-box;
                padding: 0 40px;
                color: $pubcolor;
                user-select: none;
                cursor: pointer;
                box-shadow: 0 1px 2px #ddd;
            }
            .btn-search{
                background-color: $pubcolor;
                color: #fff;
                padding: 0 30px;
                box-shadow: 0 2px 4px #ccc;
                user-select: none;
                cursor: pointer;
            }
        }
        .div-gn{
            margin-top: 20px;
        }
    }
    .noworder-box{
        margin-top: 20px;
        height: 100%;
        overflow: hidden;
    }
}
</style>
