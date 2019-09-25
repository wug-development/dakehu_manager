<template>
    <div class="pnrcreat-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable @change="checkCompany" :remote-method="remoteMethod" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.id" :label="item.shortname" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>PNR:</div>
                <div class="div-textarea">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="btn-search">
                    生成
                </div>
            </div>
        </div>
        <div class="box-bg body-box">
            <table class="pnr-result" cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><input type="text" /></td>
                        <td>预定时间：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>出发日期：</td>
                        <td><input type="text" /></td>
                        <td>订单状态：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>起落机场：</td>
                        <td><input type="text" /></td>
                        <td>票号：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>航班号：</td>
                        <td><input type="text" /></td>
                        <td>航站楼：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>起落时间：</td>
                        <td><input type="text" /></td>
                        <td>CTCM：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>舱位：</td>
                        <td><input type="text" /></td>
                        <td>CTCT：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>折扣：</td>
                        <td><input type="text" /></td>
                        <td>记录编号：</td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td>订单金额：</td>
                        <td><input type="text" /></td>
                        <td>备注：</td>
                        <td><input type="text" /></td>
                    </tr>
                </tbody>
            </table>
            <table class="pnr-persons" cellspacing="1" cellpadding="0">
                <thead>
                    <tr>
                        <th>乘机人</th>
                        <th>联系电话（CTCM）</th>
                        <th>证件类型</th>
                        <th>证件号码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                        <td><input type="text" /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="btn">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'PNRCreat',
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
            sdate: ''
        }
    },
    methods: {
        handleCurrentChange: function (v) {
            console.log(v)
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
    },
    components: {
        SiteMap
    },
    created () {        
        //获取企业列表
        this.remoteMethod('')
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.pnrcreat-box{
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
            .btn-search{
                background-color: $pubcolor;
                color: #fff;
                padding: 0 30px;
                box-shadow: 0 2px 4px #ccc;
                user-select: none;
                cursor: pointer;
                height: 40px;
                min-width: 60px;
                margin-top: 60px;
                text-align: center;
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
                    background-color: #959595;
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
    .body-box{
        margin: 20px 0;
        padding: 20px 35px;
        box-sizing: border-box;
        .pnr-result{
            background-color: #c7c7c7;
            td{
                background-color: #fff;
                font-size: 14px;
                color: #121212;
                text-align: center;
                height: 50px;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
            }
            td:nth-child(odd){
                background-color: #f1f1f1;
                min-width: 150px;
            }
            td:nth-child(even){
                min-width: 300px;
            }
        }
        .pnr-persons{
            width: 900px;
            margin-top: 40px;
            background-color: #ebe7e8;
            th,td{
                background-color: #fff;
                font-size: 14px;
                color: #121212;
                text-align: center;
                height: 50px;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
            }
            th{
                background-color: #f4f0ef;
            }
        }
        .btn{
            margin-top: 20px;
        }
    }
}
</style>
