<template>
    <div class="gjorderlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" filterable @change="checkCompany" :remote-method="remoteMethod" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.shortname" :label="item.shortname" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.shortname" :label="item.shortname" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>行程说明:</div>
                <div class="div-textarea">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="btn-search">
                    国际查询
                </div>
            </div>
        </div>
        <div class="box-bg noworder-box">
            <div class="table-title">国际订单</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th width="50"><div class="check-box"></div></th>
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
                    <tr>
                        <td><div class="check-box el-icon-check cur"></div></td>
                        <td class="active">75763</td>
                        <td>M妙奇艺</td>
                        <td>任永军</td>
                        <td>KW2TWE</td>
                        <td>宁波-北京</td>
                        <td>2018/06/08</td>
                        <td>1410</td>
                        <td>2018/07/05</td>
                        <td class="wait">候补等待</td>
                        <td>张伟玲</td>
                    </tr>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td class="active">75763</td>
                        <td>M妙奇艺</td>
                        <td>任永军</td>
                        <td>KW2TWE</td>
                        <td>宁波-北京</td>
                        <td>2018/06/08</td>
                        <td>1410</td>
                        <td>2018/07/05</td>
                        <td class="deal">等待处理</td>
                        <td>张伟玲</td>
                    </tr>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td class="active">75763</td>
                        <td>M妙奇艺</td>
                        <td>任永军</td>
                        <td>KW2TWE</td>
                        <td>宁波-北京</td>
                        <td>2018/06/08</td>
                        <td>1410</td>
                        <td>2018/07/05</td>
                        <td>候补等待</td>
                        <td>张伟玲</td>
                    </tr>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td class="active">75763</td>
                        <td>M妙奇艺</td>
                        <td>任永军</td>
                        <td>KW2TWE</td>
                        <td>宁波-北京</td>
                        <td>2018/06/08</td>
                        <td>1410</td>
                        <td>2018/07/05</td>
                        <td>候补等待</td>
                        <td>张伟玲</td>
                    </tr>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td class="active">75763</td>
                        <td>M妙奇艺</td>
                        <td>任永军</td>
                        <td>KW2TWE</td>
                        <td>宁波-北京</td>
                        <td>2018/06/08</td>
                        <td>1410</td>
                        <td>2018/07/05</td>
                        <td>候补等待</td>
                        <td>张伟玲</td>
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
            page: 1,
            pageNum: 5,
            pageCount: 1
        }
    },
    methods: {
        getOrderList: function () {

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
