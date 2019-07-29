<template>
    <div class="managerlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg add-box">
            <div>管理员姓名:</div>
            <el-input v-model="mname" placeholder="请输入姓名" maxlength="20"></el-input>
            <div>登录密码:</div>
            <el-input v-model="mpass" placeholder="请输入密码" maxlength="20"></el-input>
            <div>手机号:</div>
            <el-input v-model="mphone" placeholder="请输入手机号" show-word-limit maxlength="11"></el-input>
            <div>QQ号:</div>
            <el-input v-model="mqq" placeholder="请输入QQ号" maxlength="15"></el-input>
            <div class="btn-search" @click="addItem">
                +添加
            </div>
        </div>
        
        <div class="box-bg list-box">
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th width="50"></th>
                        <th>管理员姓名</th>
                        <th>登录密码</th>
                        <th>手机号</th>
                        <th>QQ号</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" v-model="item.name" maxlength="20"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" v-model="item.pass" maxlength="20"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" v-model="item.phone" show-word-limit maxlength="11"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" v-model="item.qq" maxlength="15"></td>
                        <td>
                            <div class="btn-box">
                                <div class="btn-set" @click="limitSet(item.id)">权限设置</div>
                                <div v-show="isedit==item.id" class="btn-save" @click="savedata(item.id, i)">保存</div>
                                <div v-show="isedit!=item.id" class="btn-edit" @click="isedit = item.id">修改</div>
                                <div class="btn-del" @click="delItem(item.id)">删除</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>

        <div class="layer" v-show="islimit">
            <div class="layer-box">
                <div class="title">
                    权限设置
                    <span class="close el-icon-close" @click="islimit=false"></span>
                </div>
                <div class="layer-body">
                    <div class="check-boxs">
                        <el-checkbox v-model="powers.muser">用户管理</el-checkbox>
                        <el-checkbox v-model="powers.mregister">客户注册</el-checkbox>
                        <el-checkbox v-model="powers.mshoukuan">收款确认</el-checkbox>
                    </div>
                    <div class="check-boxs check-other-boxs">
                        <el-checkbox v-model="powers.museredit" :disabled="powers.muser?false:''">修改</el-checkbox>
                        <el-checkbox v-model="powers.muserdel" :disabled="powers.muser?false:''">删除</el-checkbox>
                    </div>
                    <div class="btn" @click="saveLimit">保存</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'ManagerList',
    data () {
        return {
            mname: '',
            mpass: '',
            mphone: '',
            mqq: '',
            isedit: '',
            islimit: false,
            powers: {
                muser: false,
                mregister: false,
                mshoukuan: false,
                museredit: false,
                muserdel: false
            },
            page: 1,
            pageNum: 5,
            pageCount: 1,
            dataList: []
        }
    },
    methods: {
        addItem: function () {
            if (this.mname == "") {
                this.MessageBox('请输入姓名', '温馨提示')
            } else if (this.mpass == "") {
                this.MessageBox('请输入密码', '温馨提示')
            } else if (this.mphone == "") {
                this.MessageBox('请输入手机号', '温馨提示')
            } else if (this.mqq == "") {
                this.MessageBox('请输入QQ号码', '温馨提示')
            } else {
                this.$http.get(this.apis + '/api/manager/adduser', {params: {
                    name: this.mname,
                    pass: this.mpass,
                    phone: this.mphone,
                    qq: this.mqq
                }})
                .then(res => {
                    if (res && res.data) {
                        if (res.data.status > 0) {
                            this.page = 1
                            this.getList()
                            this.Notification({
                                title: '添加成功',
                                type: 'success'
                            })
                        } else if (res.data.status == -1) {
                            this.Notification.error({
                                title: '添加失败',
                                message: res.data.msg
                            })
                        } else {
                            this.Notification.error({
                                title: '添加失败',
                                message: '请检查数据！'
                            })
                        }
                    } else {
                        this.Notification.error({
                            title: '添加失败',
                            message: '请检查数据！'
                        })
                    }
                })
            } 
        },
        savedata: function (id, i) {
            if (this.dataList[i].name == "") {
                this.MessageBox('请输入姓名', '温馨提示')
            } else if (this.dataList[i].pass == "") {
                this.MessageBox('请输入密码', '温馨提示')
            } else if (this.dataList[i].phone == "") {
                this.MessageBox('请输入手机号', '温馨提示')
            } else if (this.dataList[i].qq == "") {
                this.MessageBox('请输入QQ号码', '温馨提示')
            } else {
                this.$http.get(this.apis + '/api/manager/edituser', {params: {
                    id: this.dataList[i].id,
                    name: this.dataList[i].name,
                    pass: this.dataList[i].pass,
                    phone: this.dataList[i].phone,
                    qq: this.dataList[i].qq
                }})
                .then(res => {
                    if (res && res.data && res.data.status > 0) {
                        this.getList()
                        this.Notification({
                            title: '保存成功',
                            type: 'success'
                        })
                        this.isedit = ''
                    } else {
                        this.Notification.error({
                            title: '保存失败',
                            message: '请检查数据！'
                        })
                    }
                })
            } 
        },
        delItem: function (id) {
            this.MessageBox.confirm('你确定要删除该管理员么？', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(this.apis + '/api/manager/delUser', {params: {
                    id: id,
                }})
                .then(res => {
                    if (res && res.data && res.data.status > 0) {                    
                        this.getList()
                        this.Notification({
                            title: '删除成功',
                            type: 'success'
                        })
                    } else {
                        this.Notification.error({
                            title: '删除失败',
                            message: '请刷新重试！'
                        })
                    }
                })
            })
        },
        limitSet: function (id) {
            this.islimit = id
        },
        saveLimit: function () {
            this.$http.post(this.apis + '/api/limitmenu/SaveLimit', {
                id: this.islimit,
                muser: this.powers
            })
            .then(res => {
                console.log(res)
            })
        },
        getList: function () {
            this.$http.get(this.apis + '/api/manager/getlist', {params: {
                page: this.page,
                pagenum: this.pageNum
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
        handleCurrentChange: function (v) {
            this.page = v
            this.getList()
        }
    },
    components: {
        SiteMap
    },
    created () {
        this.$store.state.siteMap = ["管理员管理"]
        // 获取列表
        this.getList()
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.managerlist-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .add-box{
        padding: 22px 35px;
        min-width: 800px;
        display: flex;
        height: 82px;
        line-height: 40px;
        div{
            margin-right: 20px;
            white-space: nowrap;
        }
        .btn-search{
            background-color: $pubcolor;
            color: #fff;
            padding: 0 30px;
            box-shadow: 0 2px 4px #ccc;
            user-select: none;
            cursor: pointer;
            height: 40px;
        }
    }
    .list-box{
        margin-top: 20px;
        height: 100%;
        overflow: hidden;
        input{
            text-align: center;
            border: 1px solid $pubcolor;
            padding: 5px 0;
        }
        input:read-only{
            border: 0;
            background-color: #F6F6F7;
            color: initial;
        }
        .btn-box{
            display: flex;
            justify-content: center;
            >div{
                margin: 0 5px;
                padding: 5px 15px;
                color: $pubcolor;
                border: 1px solid $pubcolor;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-edit{
                color: #f8b551;
                border: 1px solid #f8b551;
            }
            .btn-del{
                color: #f3765f;
                border: 1px solid #f3765f;
            }
            .btn-save{
                color: #67C23A;
                border: 1px solid #67C23A;
            }
        }
    }
    .layer-box{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        height: 150px;
        margin-top: -75px;
        margin-left: -175px;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        .title{
            height: 40px;
            line-height: 40px;
            background-color: $pubcolor;
            padding-left: 20px;
            box-sizing: border-box;
            color: #fff;
            .close{
                float: right;
                margin: 11px 15px 0 0;
                width: 18px;
                height: 18px;
                border-radius: 20px;
                background-color: #efefef;
                color: #747474;
                text-align: center;
                line-height: 18px;
                cursor: pointer;
            }
        }
        .layer-body{
            padding-top: 20px;
            .check-boxs{                
                display: flex;
                justify-content: center;
            }
            .check-other-boxs{
                justify-content: start;
                padding-left: 25px;
            }
            .btn{
                float: right;
                width: 80px;
                height: 30px;
                line-height: 30px;
                margin-right: 15px;
                margin-top: 10px;
            }
        }
    }
}
</style>
