<template>
    <div class="alluser-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <el-select class="ddl"
                @focus="username = ''"
                v-model="username"
                filterable
                remote
                reserve-keyword
                placeholder="请输入用户简称"
                :remote-method="remoteMethod">
                <el-option v-for="item in options" :key="item.firstletter" :label="item.name" :value="item.name"></el-option>
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
                        <li class="active wleft w20"><span @click="toPage(item)">{{item.name}}</span> <div v-if="item.childnum > 0"  @click="showSubCompany(item.id, i)" :class="showSub == item.id?'el-icon-arrow-up' : 'el-icon-arrow-down'"></div></li>
                        <li class="w10">{{item.pass}}</li>
                        <li class="w10">{{item.linkman}}</li>
                        <li class="w15">{{item.phone}}</li>
                        <li class="w10">{{item.xinyong}}</li>
                        <li class="w10">{{item.qiankuan}}</li>
                        <li class="w20">
                            <div class="btns-box">
                                <div class="btn-del"><router-link :to="'/main/edituser?id=' + item.id ">详情</router-link></div>
                                <div class="btn-warn" v-if="isLimitDel" @click="del(item.id)">删除</div>
                                <div class="btn-edit">前台</div>
                            </div>
                        </li>
                        <li class="w2"></li>
                        <li v-if="item.childnum > 0 && showSub == item.id" class="w100 dl-list-item-box">
                            <ul v-for="(s, index) in item.subCompany" :key="index">
                                <li class="w2"></li>
                                <li class="active wleft w20"  @click="toPage(s)">{{s.name}}</li>
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
import SiteMap from '@/components/Common/SiteMap.vue'
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
            comList: [],
            username: '',
            searchVal: '',
            page: 1,
            pageNum: 5,
            pageCount: 1,
            isLimitDel: false
        }
    },
    created () {
        this.getList()

        let logindata = sessionStorage.getItem('loginData')
        if (logindata) {
            let _d = JSON.parse(logindata)
            let _g = _d.limits.findIndex(e => {
                return e.name === '用户删除'
            })
            if (_g > -1) {
                this.isLimitDel = true
            }
        }
    },
    components: {
        SiteMap
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
            if (v.length > 0) {
                this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                    name: v
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        this.options = res.data.data
                    }
                })
            }
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
            this.page = 1
            this.getList()
        },
        del: function (v) {
            this.MessageBox.confirm('您确认删除该用户吗？', {
                confirmButtonText: '取消',
                cancelButtonText: '确认'
            }).then(e => {
                console.log('取消删除')
            }).catch(() => {
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
            })
        },
        toPage (v) {
            this.$store.state.selCompany = {
                id: v.id,
                name: v.name
            }
            sessionStorage.setItem('selCompany', JSON.stringify(v))
            this.$router.push({
                path: '/main/userbll?cid=' + v.id
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
            background: url('../../assets/images/find.png') no-repeat center;
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
