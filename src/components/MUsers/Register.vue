<template>
    <div class="register-box">
        <SiteMap></SiteMap>

        <div class="box-bg login-info">
            <div class="title">登录信息</div>
            <div class="company-info">
                <div>
                    <div class="form-label">企业简称</div>
                    <el-input v-model="comShorthand"></el-input>
                    <div class="form-label">登录密码</div>
                    <el-input v-model="comPass"></el-input>
                    <div class="btn" @click="addLinkMan">+联系人</div>
                    <div class="btn" @click="addSubCompany">+子公司</div>
                </div>
                <div v-for="(item, i) in LinkmanList" :key="i" class="link-man">
                    <div class="form-label">联系人</div>
                    <el-input v-model="item.name"></el-input>
                    <div class="form-label">电话</div>
                    <el-input v-model="item.phone"></el-input>
                    <div class="form-labels">邮箱</div>
                    <el-input v-model="item.email"></el-input>
                    <div class="form-labels">QQ</div>
                    <el-input v-model="item.qq"></el-input>
                    <div class="form-labels">微信号</div>
                    <el-input v-model="item.wechart"></el-input>
                    <div v-if="i > 0" class="btn-del el-icon-close" @click="delLinkman(i)"></div>
                </div>
            </div>
            <div class="company-info company-infos" v-for="(item, i) in subCompany" :key="i">
                <div>
                    <div class="form-label">分公司</div>
                    <el-input v-model="item.comShorthand"></el-input>
                    <div class="form-label">登录密码</div>
                    <el-input v-model="item.comPass"></el-input>
                    <div class="btn-del el-icon-close" @click="delSubCompany(i)"></div>
                </div>
                <div class="link-man">
                    <div class="form-label">联系人</div>
                    <el-input v-model="item.linkmanList.name"></el-input>
                    <div class="form-label">电话</div>
                    <el-input v-model="item.linkmanList.phone"></el-input>
                    <div class="form-labels">邮箱</div>
                    <el-input v-model="item.linkmanList.email"></el-input>
                    <div class="form-labels">QQ</div>
                    <el-input v-model="item.linkmanList.qq"></el-input>
                    <div class="form-labels">微信号</div>
                    <el-input v-model="item.linkmanList.wechart"></el-input>
                </div>
                <div>
                    <div class="form-label">备注</div>
                    <el-input class="form-other" v-model="item.linkmanList.other"></el-input>
                </div>
            </div>
            <div class="title">企业基本信息</div>
            <div class="company-info">
                <div>
                    <div class="form-label">企业全称</div>
                    <el-input v-model="companyInfo.nickname"></el-input>
                    <div class="form-label">注册号</div>
                    <el-input v-model="companyInfo.reno"></el-input>
                    <div class="form-label">注册资金</div>
                    <el-input v-model="companyInfo.remoney"></el-input>
                    <div class="form-label">实际经营地址</div>
                    <el-input v-model="companyInfo.readdr"></el-input>
                </div>
                <div class="link-man">
                    <div class="form-label">主营业务</div>
                    <el-input v-model="companyInfo.business"></el-input>
                    <div class="form-label">股东明细</div>
                    <el-input v-model="companyInfo.shareholder"></el-input>
                    <div class="form-labels">法人代表</div>
                    <el-input v-model="companyInfo.legal"></el-input>
                    <div class="form-labels">执照注册地址</div>
                    <el-input v-model="companyInfo.licenseAddr"></el-input>
                </div>
                <div class="link-man">
                    <div class="form-label">银行账号</div>
                    <el-input v-model="companyInfo.bankAccount"></el-input>
                    <div class="form-label">开户行</div>
                    <el-input v-model="companyInfo.bankName"></el-input>
                </div>
            </div>
        </div>

        <div class="box-bg credit-box">
            <div>
                <div class="form-label">信用额度</div>
                <el-input v-model="companyInfo.credit"></el-input>
                <div class="form-label">结账日期</div>
                <el-date-picker v-model="companyInfo.settleDate" type="date" format="MM月dd日"></el-date-picker>
                <div class="form-label">管理员</div>
                <el-select v-model="companyInfo.manager">
                    <el-option v-for="item in ManagerList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </div>
            <div>
                <div class="form-label">备注</div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>

        <div class="bill-box">
            <div class="title">设置账单显示字段 <span>（最多选择10个）</span></div>
            <div class="check-list">
                <el-checkbox-group v-model="billCheckList" :min="1">
                    <el-checkbox v-for="(item, i) in billFieldList" :key="i" :label="item.name"></el-checkbox>
                </el-checkbox-group>
            </div>
        </div>

        <div class="btn-box">
            <div class="btn" @click="submitForm">保存</div>
            <div class="btn-other" @click="sendEmail">发送密码重置页面</div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'
export default {
    name: 'Register',
    data () {
        return {
            comShorthand: '',
            comPass: '',
            other: '',
            LinkmanList: [{
                name: '',
                phone: '',
                email: '',
                qq: '',
                wechart: ''
            }],
            subCompany: [],
            companyInfo: {
                nickname: '',
                reno: '',
                remoney: '',
                readdr: '',
                business: '',
                shareholder: '',
                legal: '',
                licenseAddr: '',
                bankAccount: '',
                bankName: '',
                credit: '',
                settleDate: '',
                manager: '',
                other: ''
            },
            ManagerList: [],
            billCheckList: [],
            billFieldList: []
        }
    },
    components: {
        SiteMap
    },
    methods: {
        delLinkman: function (i) {
            this.LinkmanList.splice(i, 1)
        },
        addLinkMan: function () {
            this.LinkmanList.push({
                name: '',
                phone: '',
                email: '',
                qq: '',
                wechart: ''
            })
        },
        delSubCompany: function (i) {
            this.subCompany.splice(i, 1)
        },
        addSubCompany: function () {
            this.subCompany.push({
                comShorthand: '',
                comPass: '',
                other: '',
                linkmanList: {
                    name: '',
                    phone: '',
                    email: '',
                    qq: '',
                    wechart: '',
                }
            });
        },
        submitForm: function () {
            this.comShorthand = this.comShorthand.trim()
            this.comPass = this.comPass.trim()
            if (this.comShorthand === '') {
                this.MessageBox('请输入企业简称', '温馨提示')
            } else if (this.comPass === '') {
                this.MessageBox('请输入登录密码', '温馨提示')
            } else {
                let formdata = {
                    companyid: '',
                    comShorthand: this.comShorthand,
                    comPass: this.comPass,
                    comInfo: this.companyInfo,
                    linkman: this.LinkmanList,
                    subcompany: this.subCompany,
                    billfields: this.billCheckList.join(',')
                }

                this.$http.post(this.apis + '/api/company/addcompany', formdata)
                .then(res => {
                    if (res && res.data && res.data.status != 0) {                        
                        this.MessageBox('注册成功！', '温馨提示').then(() => {
                            this.$router.push({
                                path: '/main/muser'
                            })
                        })
                    } else {
                        this.MessageBox('注册失败，请检查数据！', '温馨提示') 
                    }
                })
            }
        },
        sendEmail: function () {
            this.$router.push({
                path: '/main/sendemail'
            })
            sessionStorage.setItem('sendemail', this.LinkmanList[0].email)
        }
    },
    created () {
        this.$store.state.siteMap = ["客户注册"]

        this.$http.get(this.apis + '/api/company/getbillfieldlist', {params: {}})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                this.billFieldList = res.data.data
            }
        })
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.register-box{
    margin: 0;
    .title{
        height: 50px;
        line-height: 50px;
        padding-left: 5px;
        font-size: 16px;
        span{
            font-size: 12px;
            color: #999;
        }
    }
    .login-info{
        padding: 0 15px 10px 15px;
        .company-info{
            border: 1px solid #c9c9c9;
            padding-top: 20px;
            margin-bottom: 20px;
            >div{
                display: flex;
                line-height: 40px;
                margin-bottom: 20px;
                .form-label{
                    margin: 0 20px;
                    min-width: 60px;
                    text-align: right;
                    white-space: nowrap;
                }
                .form-labels{
                    margin: 0 20px;
                    text-align: right;
                    white-space: nowrap;
                }
                .el-input{
                    width: 150px;
                    margin-right: 30px;
                }
                .btn{
                    margin-right: 20px;
                }
                .btn-del{
                    margin-top: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 20px;
                    text-align: center;
                    line-height: 20px;
                    color: #fff;
                    background-color: $pubbtncolor;
                    cursor: pointer;
                }
            }
        }
        .company-infos{
            background-color: #deeefd;
            >div{
                .form-other{
                    width: 90%;
                }
            }
        }
    }
    .credit-box{
        margin-top: 20px;
        padding: 20px 15px 10px 15px;
        >div{
            display: flex;
            line-height: 40px;
            margin-bottom: 20px;
            .el-input{
                width: 150px;
                margin-right: 30px;
            }
            .form-label{
                margin: 0 20px;
                min-width: 60px;
                text-align: right;
                white-space: nowrap;
            }
            textarea{
                width: 56%;
                height: 100px;
                resize: none;
                border: 1px solid #DCDFE6;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 3px;
            }
            textarea:focus{
                border: 1px solid #409EFF;
            }
        }
    }
    .bill-box{
        margin-top: 10px;
        .check-list{
            padding: 15px;
            width: 80%;
            .el-checkbox{
                margin-bottom: 10px;
                .el-checkbox__label{
                    min-width: 66px;
                }
            }
        }
    }
    .btn-box{
        padding: 20px;
        display: flex;
        .btn-other{
            margin-left: 20px;
        }
    }
}
</style>
