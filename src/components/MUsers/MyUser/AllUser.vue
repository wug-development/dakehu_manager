<template>
    <div class="alluser-box">
        <div class="box-bg search-box">
            <el-select class="ddl"
                v-model="username"
                filterable
                remote
                reserve-keyword
                placeholder="请输入用户简称"
                :remote-method="remoteMethod">
                <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
            <div class="btn" @click="searchData">搜索</div>
        </div>
        <div class="box-bg alluser-list-box">
            <div class="pubtitle">所有用户</div>
            <dl class="dl-list">
                <dt>
                    <div>
                        <span class="w2"></span>
                        <span class="w20 wleft">用户简称</span>
                        <span class="w10">登录密码</span>
                        <span class="w10">业务负责人</span>
                        <span class="w15">联系电话</span>
                        <span class="w10">信用金</span>
                        <span class="w10">欠款</span>
                        <span class="w20">操作</span>
                        <span class="w2"></span>
                    </div>
                </dt>
                <dd>
                    <ul v-for="(item, i) in dataList" :key="i">
                        <li class="w2"></li>
                        <li class="active wleft w20" @click="showSubCompany(item.id, i)">{{item.name}} <div v-if="item.childnum > 0" :class="showSub == item.id?'el-icon-arrow-up' : 'el-icon-arrow-down'"></div></li>
                        <li class="w10">{{item.pass}}</li>
                        <li class="w10">{{item.linkman}}</li>
                        <li class="w15">{{item.phone}}</li>
                        <li class="w10">{{item.xinyong}}</li>
                        <li class="w10">{{item.qiankuan}}</li>
                        <li class="w20">
                            <div class="btns-box">
                                <div class="btn-del"><router-link :to="'/main/edituser?id=' + item.id ">详情</router-link></div>
                                <div class="btn-warn" @click="del(item.id)">删除</div>
                                <div class="btn-edit">前台</div>
                            </div>
                        </li>
                        <li class="w2"></li>
                        <li v-if="item.childnum > 0 && showSub == item.id" class="w100 dl-list-item-box">
                            <ul v-for="(s, index) in item.subCompany" :key="index">
                                <li class="w2"></li>
                                <li class="active wleft w20">{{s.name}}</li>
                                <li class="w10">{{s.pass}}</li>
                                <li class="w10">{{s.linkman}}</li>
                                <li class="w15">{{s.phone}}</li>
                                <li class="w10">{{s.xinyong}}</li>
                                <li class="w10">{{s.qiankuan}}</li>
                                <li class="w20">
                                    <div class="btns-box">
                                        <div class="btn-edit">前台</div>
                                    </div>
                                </li>
                                <li class="w2"></li>
                            </ul>
                        </li>
                    </ul>
                </dd>
            </dl>
            <div class="div_page">
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AllName',
    data () {
        return {
            selCompany: '',
            company: [],
            showSub: '',
            subConpany: [],
            name: '',
            phone: '',
            dataList: [],
            options: [],
            username: '',
            searchVal: '',
            page: 1,
            pageNum: 5,
            pageCount: 1,
        }
    },
    created () {
        this.$store.state.siteMap = ["用户管理"]
        this.getList()
    },
    methods: {
        getList: function () {
            this.$http.get(this.apis + '/api/company/getcompanylist', {params: {
                page: this.page,
                pagenum: this.pageNum,
                filters: this.searchVal
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
        remoteMethod: function (v) {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: v
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.options = res.data.data
                }
            })
        },
        handleCurrentChange: function (v) {
            this.page = v
            this.getList()
        },
        showSubCompany: function (v, i) {
            if (v == this.showSub) {
                this.showSub = ''
            } else if (!this.dataList[i].subCompany) {
                this.$http.get(this.apis + '/api/company/getsubcompany', {params: {
                    id: v
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        this.dataList[i].subCompany = res.data.data
                        this.showSub = v
                    }
                })
            } else {
                this.showSub = v
            }
        },
        searchData: function (v) {
            this.searchVal = this.username
            this.getList()
        },
        del: function (v) {
            this.$http.get(this.apis + '/api/company/delcompany', {params: {
                id: v
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.getList()
                    this.Notification({
                        title: '删除成功',
                        type: 'success'
                    })
                } else {
                    this.Notification.error({
                        title: '删除失败',
                        message: '请刷新重试'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.alluser-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-box{
        padding: 20px;
        box-sizing: border-box;
        line-height: 40px;
        display: flex;
        .ddl{
            font-family: element-icons !important;
            position: relative;
        }
        .ddl::before{
            content: "\e6df";
            position: absolute;
            z-index: 1;
            display: block;
            width: 32px;
            text-align: center;
        }
        .ddl::after{
            content: "";
            position: absolute;
            z-index: 1;
            top: 0;
            right: 40px;
            display: block;
            width: 40px;
            height: 40px;
            background: url('../../../assets/images/find.png') no-repeat center;
            background-size: 50%;
        }
        .el-input{
            margin-right: 40px;
            width: 300px;
        }
        .el-select__input{
            margin-left: 30px;
        }
        .el-input__inner{
            padding-left: 30px;
        }
        .btn{
            width: 120px;
        }
    }
    .alluser-list-box{
        margin-top: 20px;
        height: 100%;
    }
}
</style>
