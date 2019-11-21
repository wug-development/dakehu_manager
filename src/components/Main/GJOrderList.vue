<template>
    <div class="gjorderlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable @change="checkCompany(1)" :filter-method="remoteMethod" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" @change="checkCompany(0)" filterable placeholder="请选择子公司">
                    <el-option value="">请选择</el-option>
                    <el-option v-for="item in childCompany" :key="item.shortname" :label="item.name" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>行程说明:</div>
                <div class="div-textarea">
                    <textarea v-model="other" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="btn-creat" @click="saveDingzhi">
                    生成国际订单
                </div>
            </div>
        </div>
        <div class="box-bg search-box div-search">
            <div class="div-box">
                <div>预定时间:</div>
                <el-date-picker v-model="filterParams.sdate" type="date" placeholder="请选择"></el-date-picker>
                <div>至</div> 
                <el-date-picker v-model="filterParams.edate" type="date" placeholder="请选择"></el-date-picker>
                <el-input v-model="filterParams.fname" placeholder="姓名"></el-input>
                <el-input v-model="filterParams.ftno" placeholder="票号"></el-input>
                <div class="btn-creat btn-search" @click="search">
                    搜索
                </div>
            </div>
        </div>
        <div class="box-bg noworder-box">
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
                        <td><div :class='"check-box" + (checkOrder.indexOf(item.orderid) > -1?" el-icon-check cur":"")' @click="checkItem(item.orderid)"></div></td>
                        <td class="active" @click="toDetail(item)">{{item.orderid}}</td>
                        <td>{{item.cname}}</td>
                        <td>{{item.pername}}</td>
                        <td>{{item.ordercode}}</td>
                        <td>{{item.scity}}{{item.ecity?"-"+item.ecity:""}}</td>
                        <td>{{item.sdate}}</td>
                        <td>{{item.totalprice}}</td>
                        <td>{{item.addtime.substr(0,10)}}</td>
                        <td :class='item.status == "0"? "deal" : (item.status == "1"? "" : "wait")'>{{utils.checkStatus(item.status)}}</td>
                        <td>{{item.adminname}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page div_pages">
                <div class="btns">
                    <div class="btn-label btn-del">删除</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="filterParams.pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'GJOrderList',
    data () {
        return {
            orderList: [],
            isCheckAll: false,
            checkOrder: [],
            company: [],
            childCompany: [],
            selCompany: '',
            selChildCompany: '',
            selStartCity: '',
            selEndCity: '',
            StartCity: [],
            EndCity: [],
            pickerOptions: {},
            filterParams: {
                cid: '',
                type: 1,
                sdate: '',
                edate: '',
                fname: '',
                ftno: '',
                page: 1,
                pageNum: 5,
            },
            other: '',
            pageCount: 1
        }
    },
    methods: {
        search () {
            this.filterParams.page = 1
            this.getOrderList()
        },
        getOrderList: function () {
            let _cid = this.selCompany.id
            if (this.selChildCompany) {
                _cid = this.selChildCompany.id
            }
            this.filterParams.cid = _cid
            this.filterParams.sdate = this.filterParams.sdate || ''
            this.filterParams.edate = this.filterParams.edate || ''
            this.$http.get(this.apis + '/api/orderlist/getorderlist', {params: this.filterParams})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.orderList = res.data.data.data
                    if (res.data.data.pagecount) {
                        this.pageCount = res.data.data.pagecount
                    }
                }
            })
        },
        handleCurrentChange: function (v) {
            this.filterParams.page = v
            this.getOrderList()
        },
        remoteMethod: function (v) {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: v
            }})
            .then(res => {
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
            if (v) {
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
                this.search()
            } else {
                this.search()
            }
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
                    this.checkOrder.push(this.orderList[i].orderid)
                }
            } else {
                this.checkOrder = []
            }
        },
        toDetail (item) {
            let v = {
                id: item.cid,
                name: item.cname
            }
            this.$store.state.selCompany = v
            sessionStorage.setItem('selCompany', JSON.stringify(v))
            this.$router.push({
                path: '/main/userbll/gjorderdetail?id=' + item.orderid + '&cid=' + item.cid
            })
        },
        saveDingzhi () {
            if (this.other != ''){
                let _cid = this.selCompany.id
                if (this.selChildCompany) {
                    _cid = this.selChildCompany.id
                }
                let params = {
                    content: this.other,
                    cid: _cid
                }
                this.$http.post(this.apis + '/api/order/submitdingzhiorder', params)
                .then(res => {
                    if(res.status === 200 && res.data.status === 1){
                        this.search()
                    } else {
                        this.MessageBox('下单失败！', res.data.msg)
                    }
                })
            }
        }
    },
    components: {
        SiteMap
    },
    created () {
        let obj = sessionStorage.getItem('comsearch')
        if (obj) {
            let _d = JSON.parse(obj)
            if (_d.cp) {
                this.selCompany = _d.cp
                if (_d.cc) {
                    this.selChildCompany = _d.cc
                }
                this.checkCompany(2)
                
                // 获取企业列表
                this.remoteMethod(this.selCompany.name)
            }
        }
        
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.gjorderlist-box{
    height: 100%;
    display: flex;
    flex-direction: column;
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
            .btn-creat{
                background-color: $pubcolor;
                color: #fff;
                padding: 0 30px;
                box-shadow: 0 2px 4px #ccc;
                user-select: none;
                cursor: pointer;
                height: 40px;
                margin-top: 60px;
            }
            .btn-search{
                margin: 0;
            }
            .div-textarea{
                width: 800px;
                height: 100px;
                border: 1px solid #DCDFE6;
                textarea{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    resize: none;
                    background-color: #F8F8F8;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
        }
        .div-gn{
            margin-top: 20px;
            height: auto;
        }
    }
    .div-search{
        margin-top: 20px;
    }
    .noworder-box{
        margin-top: 20px;
        min-height: 150px;
    }
}
</style>
