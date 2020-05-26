<template>
    <div class="mpersons-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <!-- <div class="div-label">公司名称:</div>
            <el-select v-model="selCompany" value-key="name" placeholder="请选择企业">
                <el-option v-for="item in comList" :key="item.id" :label="item.firstletter + item.name" :value="item"></el-option>
            </el-select> -->
            <div class="div-label">姓名:</div>
            <el-input v-model="name"></el-input>
            <div class="div-label">手机号:</div>
            <el-input v-model="phone"></el-input>
            <div class="btn" @click="searchData">搜索</div>
            <div class="btn-other" @click="showAddPerson">添加乘机人</div>
        </div>
        <div class="box-bg alluser-list-box">
            <div class="pubtitle">全部乘机人</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>乘机人手机</th>
                        <th>紧急人手机</th>
                        <th>证件号码</th>
                        <th>出生日期</th>
                        <th>护照号</th>
                        <th>护照到期日</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.CjrName"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.Sex"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.phone"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.jingji"></td>
                        <td><input type="text" style="width:150px;" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.idcard"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.CSRQ"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.HZH"></td>
                        <td><input type="text" :readonly="isedit == item.id ? false : 'readonly'" maxlength="50" v-model="item.HZYXQ"></td>
                        <td>
                            <div class="btns-box">
                                <div class="btn-save" v-if='isedit' @click="save(item.id, i)">保存</div>
                                <div class="btn-edit" v-else='isedit' @click="edit(item.id)">修改</div>
                                <div class="btn-del" @click="del(item.id)">删除</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page" v-if="pageCount">
                <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
            </div>
        </div>

        <el-dialog title="添加乘机人" :visible.sync="centerDialogVisible" width="440px" center>
            <el-form :model="uinfo">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="uinfo.CjrName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-radio v-model="uinfo.Sex" label="女">女</el-radio>
                    <el-radio v-model="uinfo.Sex" label="男">男</el-radio>
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                    <el-input v-model="uinfo.idcard" autocomplete="off" maxlength="18" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="护照号" :label-width="formLabelWidth">
                    <el-input v-model="uinfo.HZH" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="护照有效期" :label-width="formLabelWidth">
                    <el-date-picker v-model="uinfo.HZYXQ" value-format="yyyy-MM-dd" :clearable="false" type="date"></el-date-picker>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="uinfo.phone" autocomplete="off" maxlength="11" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="紧急人手机	" :label-width="formLabelWidth">
                    <el-input v-model="uinfo.jingji" autocomplete="off" maxlength="11" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="出生日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="uinfo.CSRQ" value-format="yyyy-MM-dd" :clearable="false" type="date"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SiteMap from '@/components/Common/SiteMap.vue'
export default {
    name: 'MPersons',
    data () {
        return {
            selCompany: '',
            comList: [],
            name: '',
            phone: '',
            dataList: [],
            isedit: '',
            page: 1,
            pageNum: 5,
            pageCount: 0,
            uinfo: {
                CjrName: '',
                Sex: '',
                HZH: '',
                HZYXQ: '',
                CSRQ: '',
                idcard: '',
                type: '1',
                id: '',
                phone: '',
                jingji: ''
            },
            centerDialogVisible: false,
            formLabelWidth: '120px'
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
        handleCurrentChange: function (v) {
            this.page = v
            this.getDataList ()
        },
        getAlllist () {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: ''
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.comList = res.data.data
                }
            })
        },
        getDataList () {
            this.$http.get(this.apis + '/api/passenger/getpersonlist', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: this.pageNum,
                filtername: this.name,
                filterphone: this.phone
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
        edit (id) {
            this.isedit = id
        },
        save (id, i) {
            let _d = this.dataList[i]
            this.$http.post(this.apis + '/api/passenger/saveperson', {
                id: id,
                name: _d.CjrName,
                phone: _d.phone,
                jjphone: _d.jingji,
                idcard: _d.idcard,
                hzh: _d.HZH,
                hzyxq: _d.HZYXQ
            })
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.isedit = ''
                } else {
                    this.MessageBox('保存失败，请检查数据！')
                }
            })
        },
        del (id) {
            this.MessageBox.confirm('是否确认删除该联系人？').then(()=>{            
                this.$http.get(this.apis + '/api/passenger/delperson', {params: {
                    cid: this.selCompany.id,
                    id: id
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        this.getDataList()
                    }
                })
            }).catch(() => {})
        },
        addData () {
            if (this.uinfo.CjrName != '' && this.uinfo.phone != '' && this.uinfo.jingji != ''){
                if (this.uinfo.idcard === '' && this.uinfo.HZH === '') {
                    this.MessageBox('请输入证件号码')
                } else if (this.uinfo.jingji != '' && this.uinfo.jingji === this.uinfo.phone) {
                    this.MessageBox('紧急联系人手机号不能与乘机人手机号相同！')
                } else {
                    this.$http.post(this.apis + '/api/passenger/addperson', this.uinfo)
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            this.centerDialogVisible = false
                            this.page = 1
                            this.getDataList()
                            this.Notification({
                                title: '添加成功',
                                type: 'success'
                            })
                        } else {
                            this.Notification.error({
                                title: '添加失败',
                                message: '请检查数据！'
                            })
                        }
                    })
                }
            } else {
                this.MessageBox('请输入姓名、手机号、紧急人手机')
            }
        },
        showAddPerson () {
            this.centerDialogVisible = true
            this.uinfo = {
                CjrName: '',
                Sex: '',
                HZH: '',
                HZYXQ: '',
                CSRQ: '',
                idcard: '',
                type: '1',
                id: this.selCompany.id,
                phone: '',
                jingji: ''
            }
        }
    },
    created () {
        this.selCompany = this.$store.state.selCompany
        let account = sessionStorage.getItem('loginData')
        if (account) {
            this.$store.state.topmenu = "mpersons"
            this.user = JSON.parse(account)
            this.getAlllist()
            let com = sessionStorage.getItem('selCompany')
            if (com) {
                let c = JSON.parse(com)
                this.selCompany = c
                this.getDataList ()
                this.uinfo.id = c.id
            }
        }
        this.getDataList()
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.mpersons-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-box{
        padding: 20px;
        box-sizing: border-box;
        line-height: 40px;
        display: flex;
        .el-input{
            margin-right: 40px;
        }
        .btn-other{
            margin-left: 15px;
        }
    }
    .alluser-list-box{
        margin-top: 20px;
        height: 100%;
    }
    .table-list{        
        input[type='text']{
            border: .02rem solid #ccc;
            height: 60%;
            width: 90%;
            background-color: #fff;
            text-align: center;
            box-sizing: border-box;
        }
        input:read-only{
            border: 0;
            background-color: initial;
            color: initial;
        }
    }
    .el-form{
        width: 340px;
    }
}
</style>
