<template>
    <div class="gjorderdetail-box">
        <SiteMap></SiteMap>
        <div class="box-bg detail-info" v-if="!isBack">
            <div class="title" @click="backPage"><span class="icon-back el-icon-back"></span></div>
            <table cellspacing="0" cellpadding="0" v-if="orderinfo && orderinfo.dcOrderID">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">{{orderinfo.dcOrderID}}</span>  <span class="orange">{{orderinfo.dcAdminName}}</span></td>
                        <td>预订时间：</td>
                        <td>{{orderinfo.dtAddTime.replace("T", " ")}}</td>
                        <td>订单状态：</td>
                        <td>
                            <el-select v-model="orderStatus" value-key="value" placeholder="请选择">
                                <el-option v-for="item in ddlOrderStatus" :key="item.id" :label="item.value" :value="item"></el-option>
                            </el-select>
                        </td>
                        <td>出发日期：</td>
                        <td>
                            <el-date-picker v-model="orderinfo.dcStartDate" type="date" placeholder="请选择"></el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>记录编号：</td>
                        <td>
                            <el-input v-model="orderinfo.dcOrderCode"></el-input>
                        </td>
                        <td>联系人：</td>
                        <td>
                            <el-input v-model="orderinfo.dcLinkName"></el-input>
                        </td>
                        <td>行程：</td>
                        <td>
                            <el-input v-model="orderinfo.dcStartCity + '-' + orderinfo.dcBackCity"></el-input>
                        </td>
                        <td>票号：</td>
                        <td>                            
                            <el-input v-model="orderinfo.dnTicketNO"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>订单金额：</td>
                        <td colspan="7">
                            <input class="txt" type="text" v-model="orderinfo.dnTotalPrice"> ( <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnPrice">  + 税金 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnTax"> + 服务费 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnServicePrice"> +保险 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnSafePrice"> ) * {{personlist.length}}人
                        </td>
                    </tr>
                    <tr>
                        <td>备注：</td>
                        <td colspan="7">
                            <textarea class="txt-other" v-model="orderinfo.dcContent" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>行程：</td>
                        <td colspan="3">
                            <textarea class="txt-trip" v-model="flightinfo" readonly id="" cols="30" rows="10"></textarea>
                        </td>
                        <td>乘机人信息：</td>
                        <td colspan="3">
                            <textarea  id="" v-model="personinfo" readonly cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-box">
                <div class="btn" @click="save">保存</div>
                <div class="btn-other" @click="isBack = true">退票</div>
                <div class="btn-other" @click="isChange = true">改期</div>
                <div class="btn-other">国际出票单</div>
            </div>
        </div>
        <div class="box-bg detail-info detail-info-back" v-else>
            <div class="div-title"><span class="icon-back el-icon-back" @click="backPage">(退票)</span></div>
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">{{orderinfo.dcOrderID}}</span>  <span class="orange">{{orderinfo.dcAdminName}}</span></td>
                        <td>预订时间：</td>
                        <td>{{orderinfo.dtAddTime.replace("T", " ")}}</td>
                        <td>订单状态：</td>
                        <td>
                            <el-select v-model="orderStatus" value-key="value" placeholder="请选择">
                                <el-option v-for="item in ddlOrderStatus" :key="item.id" :label="item.value" :value="item"></el-option>
                            </el-select>
                        </td>
                        <td>出发日期：</td>
                        <td>
                            <el-date-picker v-model="orderinfo.dcStartDate" type="date" placeholder="请选择"></el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>记录编号：</td>
                        <td>
                            <el-input v-model="orderinfo.dcOrderCode"></el-input>
                        </td>
                        <td>联系人：</td>
                        <td>
                            <el-input v-model="orderinfo.dcLinkName"></el-input>
                        </td>
                        <td>行程：</td>
                        <td>
                            <el-input v-model="orderinfo.dcStartCity + '-' + orderinfo.dcBackCity"></el-input>
                        </td>
                        <td>票号：</td>
                        <td>                            
                            <el-input v-model="orderinfo.dnTicketNO"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="orange">实退金额：</td>
                        <td colspan="7">
                            <el-input v-model="backMoney"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>备注：</td>
                        <td colspan="7">
                            <textarea class="txt-other" v-model="orderinfo.dcContent" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>行程：</td>
                        <td colspan="3">
                            <textarea class="txt-trip" v-model="flightinfo" readonly id="" cols="30" rows="10"></textarea>
                        </td>
                        <td>乘机人信息：</td>
                        <td colspan="3">
                            <textarea  id="" v-model="personinfo" readonly cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-box">
                <div class="btn" @click="save">保存</div>
                <div class="btn-other" @click="isBack = false">取消退票</div>
            </div>
        </div>
        <div class="trip-bill" v-if="isChange">
            <table cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>航空公司</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>记录 编号</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>行 程</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>销售价</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>返     点</td>
                        <td>
                            <input class="txt txt-small" type="text"> + <input class="txt txt-small" type="text"> + <input class="txt txt-small" type="text">
                        </td>
                        <td>税      金</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td>人     数</td>
                        <td>
                            <input class="txt txt-small" type="text"> 要位费 <input class="txt txt-small" type="text">
                            <select><option value="0">请选择</option></select>
                        </td>
                        <td>实       收</td>
                        <td>
                            <input class="txt txt-small" type="text"> &nbsp;返：<input class="txt txt-small" type="text">
                        </td>
                        <td class="red">实际到账</td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>出票点</td>
                        <td>
                            <select><option value="0">宝盛</option></select>
                        </td>
                        <td>票      价</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td class="red">结算价</td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>客 户</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>行程单金额</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td class="red">利      润</td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr>
                        <td>票      号</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>订单号</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td class="red">底      价</td>
                        <td>
                            <input class="txt" readonly type="text" placeholder="自动计算">
                        </td>
                    </tr>
                    <tr>
                        <td>服务费</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>出发日期</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td class="red">返点金额</td>
                        <td>
                            <input class="txt" readonly type="text" placeholder="自动计算">
                        </td>
                    </tr>
                    <tr>
                        <td>账单票价</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>舱位等级</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td class="red">航协结算</td>
                        <td>
                            <input class="txt" readonly type="text" placeholder="自动计算">
                        </td>
                    </tr>
                    <tr>
                        <td>乘 机 人</td>
                        <td>
                            <input class="txt" type="text">
                        </td>
                        <td>航  班 号</td>
                        <td>
                            
                        </td>
                        <td>起飞时间</td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colspan="5">
                            <input class="txt txt-max" type="text">
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2">收款方式</td>
                        <td colspan="5">
                            <select><option value="0">请选择</option></select>
                            <select><option value="0">请选择</option></select>
                            <select><option value="0">请选择</option></select>
                            <select><option value="0">请选择</option></select>                            
                        </td>
                    </tr>
                    <tr>
                        <td class="endtd" colspan="5">
                            已收款金额:<input class="txt" type="text">
                            已收款金额:<input class="txt" type="text">
                            已收款金额:<input class="txt" type="text">
                            已收款金额:<input class="txt" type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">提交</div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'
export default {
    name: 'GJOrderDetail',
    data () {
        return {
            ddlOrderStatus: [{key:0,value:'等待处理'},{key:1,value:'处理完成'},{key:2,value:'后补等待'}],
            orderStatus: '',
            startDate: '2018/6/17',
            recordNO: 'KW2TWE',
            trip: '宁波-北京',
            person: '任永军',
            ticketNO: '996-564758112248',
            backMoney: 0,
            orderid: '',
            cid: '',
            orderinfo: {},
            flightlist: [],
            personlist: [],
            flightinfo: '',
            personinfo: '',
            isBack: false,
            isChange: false
        }
    },
    components: {
        SiteMap
    },
    methods: {
        save () {
            this.$http.post(this.apis + '/api/order/editorder', this.orderinfo)
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox('保存成功！').ther(() => {
                        this.backPage()
                    })
                }
            })
        },
        backPage () {
            this.$router.go(-1)
        },
        checkStatus (v) {
            let s = ''
            switch (v) {
                case 0: s = '等待处理'; break;
                case 1: s = '处理完成'; break;
                case 2: s = '后补等待'; break;
            }
            return s
        },
        countPrice () {
            this.orderinfo.dnTotalPrice = (Number(this.orderinfo.dnPrice) + Number(this.orderinfo.dnTax) + Number(this.orderinfo.dnServicePrice) + Number(this.orderinfo.dnSafePrice)) * this.personlist.length
        }
    },
    created () {
        this.orderid = this.$route.query.id
        this.cid = this.$route.query.cid
        this.$http.get(this.apis + '/api/orderlist/getgjorderdetail', {params: {
            id: this.orderid,
            cid: this.cid
        }})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                let _d = res.data.data
                console.log(_d)
                if (_d.info && _d.info.length > 0) {
                    this.orderinfo = _d.info[0]
                    this.orderStatus = {
                        id: this.orderinfo.dnStatus,
                        value: this.checkStatus(this.orderinfo.dnStatus)
                    }
                    if (_d.flight && _d.flight.length > 0){
                        this.flightlist = _d.flight
                        let ishave = true
                        let _info = '去程：' + _d.info[0].dcStartDate + '\r\n'
                        for (let i in _d.flight) {
                            if (_d.flight[i].dnFlightType == 1 && ishave){
                                _info += '回程：' + _d.info[0].dcBackDate + '\r\n'
                                ishave = false
                            }
                            _info += _d.flight[i].dcSPortName + "(" + _d.flight[i].dcSTime + ")-" + _d.flight[i].dcEPortName + "(" + _d.flight[i].dcETime + ") 机型：" + _d.flight[i].dcJixing + " \r\n";
                        }
                        this.flightinfo = _info
                    }
                    if (_d.person && _d.person.length > 0){
                        this.personlist = _d.person
                        let _info = ''
                        for (let i in _d.person) {
                            _info += _d.person[i].dcPerName + "(" + _d.person[i].dcSex + ") 电话：" + _d.person[i].dcPhone + " 紧急电话：" + _d.person[i].dcUrgentPhone + " 护照号：" + _d.person[i].dcPassportNo + " 护照有效期：" + _d.person[i].dcPassportDate + " \r\n";
                        }
                        this.personinfo = _info
                    }
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.gjorderdetail-box{
    padding-bottom: 50px;
    .detail-info{
        padding-bottom: 20px;
        .title{
            font-size: 32px;
            color: $pubcolor;
            padding-left: 20px;
        }
        table{
            width: 100%;
            td{
                height: 40px;
                padding: 5px 0;
                line-height: 40px;
                .el-input{
                    width: 180px;
                    background-color: #f8f8f8;
                }
                .txt{
                    width: 60px;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #DCDFE6;
                    box-sizing: border-box;
                    padding: 0 5px;
                    border-radius: 4px;
                    background-color: #f8f8f8;
                }
                textarea{
                    width: 95%;
                    height: 150px;
                    resize: none;
                    border: 1px solid #DCDFE6;
                    background-color: #f8f8f8;
                    padding: 5px;
                    box-sizing: border-box;
                }
                .txt-other{
                    width: 45.4%;
                }
                .txt-trip{
                    width: 100%;
                    background-color: #959595;
                }
            }
            td:nth-child(odd){
                white-space: nowrap;
                text-align: right;
            }
            .blue{
                color: $pubcolor;
            }
            .orange{
                margin-left: 10px;
                color: $pubbtncolor;
            }
        }
        .btn-box{
            display: flex;
        }
        .btn, .btn-other{
            margin-left: 6.8%;
        }
    }
    .detail-info-back{
        margin-top: 20px;
        .div-title{
            padding-left: 20px;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            cursor: pointer;
            span{
                color: $pubcolor;
            }
        }
    }
    .trip-bill{
        margin-top: 20px;
        background-color: #f3ffe3;
        padding: 30px 0;
        table{
            width: 100%;
            background-color: #c8e4a2;
            td{
                height: 40px;
                line-height: 40px;
                .txt{
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid $pubcolor;
                    box-sizing: border-box;
                    text-indent: 1em;
                }
                .txt-small{
                    text-indent: 0;
                    text-align: center;
                    width: 50px;
                }
                .txt-max{
                    width: 95%;
                }
                select{
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid $pubcolor;
                    box-sizing: border-box;
                }
            }
            td:nth-child(odd){
                background-color: #f3ffe3;
                text-align: center;
                color: #4d4c4c;
            }
            td:nth-child(even),td.endtd{
                padding-left: 10px;
                box-sizing: border-box;
                text-align: left;
                color: #4d4c4c;
                background-color: #fff;
            }
            td.red{
                color: #f00000;
            }
        }
        .btn{
            margin: 20px 5.4%;
        }
    }
}
</style>
