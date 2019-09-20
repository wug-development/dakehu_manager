<template>
    <div class="gjorderlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable @change="checkCompany" :remote-method="remoteMethod" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.shortname" :label="item.shortname" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>行程说明:</div>
                <div class="div-textarea">
                    <textarea v-model="other" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="btn-search" @click="search">
                    国际查询
                </div>
            </div>
        </div>
        <div class="box-bg noworder-box">
            <div class="table-title">国际订单</div>
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
                        <td class="active" @click="toDetail(item.orderid, item.cid)">{{item.orderid}}</td>
                        <td>{{item.cname}}</td>
                        <td>{{item.pername}}</td>
                        <td>{{item.ordercode}}</td>
                        <td>{{item.scity}}-{{item.ecity}}</td>
                        <td>{{item.sdate}}</td>
                        <td>{{item.totalprice}}</td>
                        <td>{{item.addtime.substr(0,10)}}</td>
                        <td :class='item.status == "2"? "deal" : (item.status == "5"? "" : "wait")'>{{checkstatus(item.status)}}</td>
                        <td>{{item.adminname}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <div class="btns">
                    <div class="btn-label btn-del">删除</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
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
            sdate: '',
            other: '',
            page: 1,
            pageNum: 5,
            pageCount: 1
        }
    },
    methods: {
        search () {
            this.page = 1
            this.getOrderList()
        },
        getOrderList: function () {
            this.$http.get(this.apis + '/api/orderlist/getgjorder', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: this.pageNum,
                other: this.other
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    console.log(res.data.data.data)
                    this.orderList = res.data.data.data
                    if (res.data.data.pagecount) {
                        this.pageCount = res.data.data.pagecount
                    }
                }
            })
        },
        handleCurrentChange: function (v) {
            this.page = v
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
        checkCompany: function () {
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childCompany = res.data.data
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
                    this.checkOrder.push(this.orderList[i].orderid)
                }
            } else {
                this.checkOrder = []
            }
        },
        checkstatus: function (v) {
            let txt = ''
            switch (v) {
                case '2': txt = '待确认'; break;
                default: txt = '出票完成'; break;
            }
            return txt
        },
        toDetail (id, cid) {
            this.$router.push({
                path: '/main/gjorderdetail?id=' + id + '&cid=' + cid
            })
        }
    },
    components: {
        SiteMap
    },
    created () {
        let obj = sessionStorage.getItem('gjsearch')
        let _d = JSON.parse(obj)
        if (_d.cp) {
            this.selCompany = _d.cp
            this.checkCompany()
            if (_d.cc) {
                this.selChildCompany = _d.cc
            }
        }
        
        //获取企业列表
        this.remoteMethod('')

        this.getOrderList()
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
                height: 40px;
                margin-top: 60px;
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
    .noworder-box{
        margin-top: 20px;
        height: 100%;
        overflow: hidden;
    }
}
</style>
