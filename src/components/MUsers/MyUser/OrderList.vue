<template>
    <div class="gjorderlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>预定时间:</div>
                <el-date-picker v-model="filterParams.sdate" value-format="yyyy-MM-dd" type="date" placeholder="请选择"></el-date-picker>
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
                        <td><div v-if="item.status == 0" :class='"check-box" + (checkOrder.indexOf(item.orderid) > -1?" el-icon-check cur":"")' @click="checkItem(item.orderid)"></div></td>
                        <td class="active" @click="toDetail(item.orderid, item.cid, item.ordertype)">{{item.orderid}}</td>
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
                    <div class="btn-label btn-del" @click="delOrder">删除</div>
                </div>
                <el-pagination background layout="prev, pager, next" :page-size="filterParams.pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '@/components/Common/SiteMap.vue'

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
                type: 2,
                sdate: '',
                edate: '',
                fname: '',
                ftno: '',
                page: 1,
                pageNum: 10,
            },
            other: '',
            pageCount: 0
        }
    },
    methods: {
        search () {
            this.filterParams.page = 1
            this.getOrderList()
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
        getOrderList: function () {
            let _cid = this.selCompany.id
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
                    if (this.orderList[i].status == 0) {
                        this.checkOrder.push(this.orderList[i].orderid)
                    }
                }
            } else {
                this.checkOrder = []
            }
        },
        toDetail (id, cid, t) {
            if (t == 1) {
                this.$router.push({
                    path: '/main/userbll/gjorderdetail?id=' + id + '&cid=' + cid
                })
            } else {
                this.$router.push({
                    path: '/main/userbll/gnorderdetail?id=' + id + '&cid=' + cid
                })
            }
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
        this.$store.state.topmenu = 'index'

        this.selCompany = this.$store.state.selCompany

        this.getOrderList()
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
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
