<template>
    <div class="gjorderdetail-box">
        <SiteMap></SiteMap>
        <div class="box-bg detail-info">
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
                            <el-input readonly v-model="orderinfo.dcStartCity + '-' + orderinfo.dcBackCity"></el-input>
                        </td>
                        <td>票号：</td>
                        <td>                            
                            <el-input v-model="orderinfo.dcTicketNO"></el-input>
                        </td>
                    </tr>
                    <tr v-if="orderinfo.dnOrderStatus == 1">
                        <td>订单金额：</td>
                        <td colspan="7">
                            <input class="txt" type="text" v-model="orderinfo.dnTotalPrice"> ( <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnPrice">  + 税金 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnTax"> + 服务费 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnServicePrice"> +保险 <input class="txt" type="text" @change="countPrice" v-model="orderinfo.dnSafePrice"> ) * {{personlist.length}}人
                        </td>
                    </tr>
                    <tr v-else-if="orderinfo.dnOrderStatus == 2">
                        <td class="orange">实退金额：</td>
                        <td colspan="7">
                            <el-input v-model="orderinfo.dnChangePrice"></el-input>
                        </td>
                    </tr>
                    <tr v-else-if="orderinfo.dnOrderStatus == 3">
                        <td class="orange">改期金额：</td>
                        <td colspan="7">
                            <el-input v-model="orderinfo.dnChangePrice"></el-input>
                            （改期费<input type="text" class="txt" @change="countChangePrice" v-model="orderinfo.dnChangeDatePrice"></input>+差价<input class="txt" @change="countChangePrice" type="text" v-model="orderinfo.dnChaPrice"></input>）
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
                <div class="btn-other" @click="orderinfo.dnOrderStatus = 2">退票</div>
                <div class="btn-other" @click="orderinfo.dnOrderStatus = 3">改期</div>
                <div class="btn-other" @click="showTicket">国际出票单</div>
            </div>
        </div>
        <div class="trip-bill" v-show="orderinfo.dnIsTicket > 0">
            <table cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>航空公司</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcAirCompanyName"></input>
                        </td>
                        <td>记录编号</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcOrderCode">
                        </td>
                        <td>行 程</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcStartCity">
                        </td>
                    </tr>
                    <tr>
                        <td>销售价</td>
                        <td>
                            <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnSellPrice">
                        </td>
                        <td>返     点</td>
                        <td>
                            <input class="txt txt-small" type="text"  @change="countAutoPrice" v-model="ticketinfo.dnReturnPoint1"> + <input class="txt txt-small" type="text"  @change="countAutoPrice" v-model="ticketinfo.dnReturnPoint2"> + <input class="txt txt-small" type="text"  @change="countAutoPrice" v-model="ticketinfo.dnReturnPoint3">
                        </td>
                        <td>税      金</td>
                        <td>
                            <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnTax">
                        </td>
                    </tr>
                    <tr>
                        <td>人     数</td>
                        <td>
                            <input class="txt txt-small" type="text" @change="countAutoPrice" v-model="ticketinfo.dnPersonNumber"> 要位费 <input class="txt txt-small" type="text" @change="countAutoPrice" v-model="ticketinfo.dnYaoWeiPrice">
                            <select v-model="selPeople">
                                <option value="">请选择</option>
                                <option v-for="item in Persons" :value="item">{{item.name}}</option>
                            </select>
                        </td>
                        <td>实       收</td>
                        <td>
                            <input class="txt txt-small" type="text"  @change="countAutoPrice" v-model="ticketinfo.dnShiShouPrice"> &nbsp;返：<input class="txt txt-small" type="text"  @change="countAutoPrice" v-model="ticketinfo.dnReturnPrice">
                        </td>
                        <td class="red">实际到账</td>
                        <td>
                            {{ticketinfo.dnShiJiDaoZhang}}
                        </td>
                    </tr>
                    <tr>
                        <td>出票点</td>
                        <td>
                            <select v-model="selOutTicket">
                                <option value="">请选择</option>
                                <option v-for="item in OutTicket" :value="item">{{item.name}}</option>
                            </select>
                        </td>
                        <td>票      价</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dnTotalPrice">
                        </td>
                        <td class="red">结算价</td>
                        <td>
                            {{ticketinfo.dnJieSuanPrice}}
                        </td>
                    </tr>
                    <tr>
                        <td>客 户</td>
                        <td>
                            <select v-model="ticketinfo.dcLinkName">
                                <option :value="orderinfo.dcCompanyName">{{orderinfo.dcCompanyName}}</option>
                                <option v-for="item in Chengjiren" :value="orderinfo.dcCompanyName + ' ' + item.name">{{orderinfo.dcCompanyName + ' ' + item.name}}</option>
                            </select>
                        </td>
                        <td>行程单金额</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dnFlightPrice">
                        </td>
                        <td class="red">利      润</td>
                        <td>
                            {{ticketinfo.dnLiRun}}
                        </td>
                    </tr>
                    <tr>
                        <td>票      号</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcTicketNO">
                        </td>
                        <td>订单号</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcOrderID">
                        </td>
                        <td class="red">底      价</td>
                        <td>
                            <input class="txt" type="text" placeholder="" v-model="ticketinfo.dnDiJia">
                        </td>
                    </tr>
                    <tr>
                        <td>服务费</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dnServicePrice">
                        </td>
                        <td>出发日期</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcStartDate">
                        </td>
                        <td class="red">返点金额</td>
                        <td>
                            <input class="txt" type="text" placeholder="" v-model="ticketinfo.dnFandianPrice">
                        </td>
                    </tr>
                    <tr>
                        <td>账单票价</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dnTicketPrice">
                        </td>
                        <td>舱位等级</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcRakedClass">
                        </td>
                        <td class="red">航协结算</td>
                        <td>
                            <input class="txt" type="text" placeholder="" v-model="ticketinfo.dnHangXiePrice">
                        </td>
                    </tr>
                    <tr>
                        <td>乘 机 人</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcPersonName">
                        </td>
                        <td>航  班 号</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcFlightNumber">
                        </td>
                        <td>起飞时间</td>
                        <td>
                            <input class="txt" type="text" v-model="ticketinfo.dcFlightTime">
                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colspan="5">
                            <input class="txt txt-max" type="text" v-model="ticketinfo.dcOther">
                        </td>
                    </tr>
                    <tr>
                        <td>收款方式</td>
                        <td colspan="5" class="endtd">
                            <div class="div_pricemethod">
                                <div>
                                    <select v-model="ticketinfo.dcPaymentMethod1">
                                        <option value="">请选择</option>
                                        <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                    </select>
                                    <div>已收款金额：<input class="txt" type="text" v-model="ticketinfo.dnPaymentPrice1"></div>
                                </div>
                                <div>
                                    <select v-model="ticketinfo.dcPaymentMethod2">
                                        <option value="">请选择</option>
                                        <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                    </select>
                                    <div>已收款金额：<input class="txt" type="text" v-model="ticketinfo.dnPaymentPrice2"></div>
                                </div>
                                <div>
                                    <select v-model="ticketinfo.dcPaymentMethod3">
                                        <option value="">请选择</option>
                                        <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                    </select>
                                    <div>已收款金额：<input class="txt" type="text" v-model="ticketinfo.dnPaymentPrice3"></div>
                                </div>
                                <div>
                                    <select v-model="ticketinfo.dcPaymentMethod4">
                                        <option value="">请选择</option>
                                        <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                    </select>
                                    <div>已收款金额：<input class="txt" type="text" v-model="ticketinfo.dnPaymentPrice4"></div>
                                </div>
                            </div>                         
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn" @click="submitTicket">保存</div>
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
            dllMethod: ['预收款', '抵退票', '欠款'],
            company: [],
            OutTicket: [],
            Persons: [],
            Chengjiren: [],
            orderStatus: '',
            orderid: '',
            cid: '',
            ticketid: '',
            selCompany: '',
            selOutTicket: '',
            selPeople: '',
            orderinfo: {},
            ticketinfo: {
                dnSellPrice: 0,
                dnDiJia: 0,
                dnReturnPoint1: 0,
                dnReturnPoint2: 0,
                dnReturnPoint3: 0,
                dnTax: 0,
                dnPersonNumber: 1,
                dnJieSuanPrice: 0,
                dnShiJiDaoZhang: 0,
                dnLiRun: 0,
                dnShiShouPrice: 0,
                dnYaoWeiPrice: 0,
                dnReturnPrice: 0
            },
            flightlist: [],
            personlist: [],
            flightinfo: '',
            personinfo: '',
        }
    },
    components: {
        SiteMap
    },
    methods: {
        save () {
            this.orderinfo.dnStatus = this.orderStatus.key
            this.$http.post(this.apis + '/api/order/editorder', this.orderinfo)
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox('保存成功！').then(() => {
                        this.backPage()
                    })
                }
            })
        },
        submitTicket () {
            this.ticketinfo.dcCompanyID = this.selCompany.id
            this.ticketinfo.dcCompany = this.selCompany.name
            if (this.selOutTicket) {
                this.ticketinfo.dcOutTicketID = this.selOutTicket.id
                this.ticketinfo.dcOutTicketName = this.selOutTicket.name
            }
            if (this.selPeople) {
                this.ticketinfo.dnHKYWID = this.selOutTicket.id
                this.ticketinfo.dcLXR = this.selOutTicket.name
            }
            if (!this.ticketinfo.dcTSID) {
                this.ticketinfo.dcAddUser = this.orderinfo.dcAdminName
            }
            this.$http.post(this.apis + '/api/ticket/submitticket', this.ticketinfo)
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox('保存成功！').then(() => {
                        this.backPage()
                    })
                }
            })
        },
        getTicket () {
            this.$http.get(this.apis + '/api/ticket/getticketinfo', {params: {
                tid: this.ticketid
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.ticketinfo = res.data.data[0]
                    this.ticketinfo.dcStartCity = this.ticketinfo.dcStartCity + '-' + this.ticketinfo.dcBackCity
                }
            })
        },
        showTicket () {
            if (this.orderinfo.dnIsTicket < 1) {
                this.orderinfo.dnIsTicket = 1
                this.ticketinfo.dcOrderCode = this.orderinfo.dcOrderCode
                this.ticketinfo.dcTicketNO = this.orderinfo.dcTicketNO
                this.getOutTicket()
                this.getGJPeople()
                this.getChengjiren()
            }
        },
        countAutoPrice () {
            let _js = Number(this.ticketinfo.dnSellPrice)
            this.ticketinfo.dnDiJia = Number(this.ticketinfo.dnSellPrice)
            if (this.ticketinfo.dnReturnPoint1 && this.ticketinfo.dnReturnPoint1 != '0') {
                this.ticketinfo.dnDiJia = ((_js - Number(this.ticketinfo.dnReturnPoint1 / 100.0 * _js)) || 0) * (Number(this.ticketinfo.dnPersonNumber) || 1)
                _js =  (_js - parseInt(Number(this.ticketinfo.dnReturnPoint1) / 100.0 * _js)) || 0
            }
            if (this.ticketinfo.dnReturnPoint2 && this.ticketinfo.dnReturnPoint2 != '0') {
                _js =  (_js - parseInt(Number(this.ticketinfo.dnReturnPoint2) / 100.0 * _js)) || 0
            }
            if (this.ticketinfo.dnReturnPoint2 && this.ticketinfo.dnReturnPoint2 != '0') {
                _js =  (_js + Number(this.ticketinfo.dnReturnPoint3)) || 0
            }
            if (this.ticketinfo.dnTax && this.ticketinfo.dnTax != '0' ){
                _js = _js + Number(this.ticketinfo.dnTax)
            }
            this.ticketinfo.dnJieSuanPrice = _js * (Number(this.ticketinfo.dnPersonNumber) || 1)
            this.ticketinfo.dnShiJiDaoZhang = Number(this.ticketinfo.dnShiShouPrice) || 0
            this.ticketinfo.dnLiRun = (Number(this.ticketinfo.dnShiShouPrice) - Number(this.ticketinfo.dnJieSuanPrice) - (Number(this.ticketinfo.dnYaoWeiPrice) || 0) - (Number(this.ticketinfo.dnReturnPrice) || 0)) || 0
        },
        backPage () {
            this.$router.go(-1)
        },
        countPrice () {
            this.orderinfo.dnTotalPrice = (Number(this.orderinfo.dnPrice) + Number(this.orderinfo.dnTax) + Number(this.orderinfo.dnServicePrice) + Number(this.orderinfo.dnSafePrice)) * this.personlist.length
        },
        countChangePrice () {
            this.orderinfo.dnChangePrice = (Number(this.orderinfo.dnChangeDatePrice) + Number(this.orderinfo.dnChaPrice))
        },
        getOutTicket () {
            //获取出票点
            this.$http.get(this.apis + '/api/ticket/getgjoutticket', {params: {}})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    arr.sort((x, y) => {
                        return x.name.charCodeAt(0) - y.name.charCodeAt(0)
                    })
                    this.OutTicket = arr
                }
            })
        },
        getGJPeople () {
            //获取人
            this.$http.get(this.apis + '/api/ticket/getgjpeople', {params: {}})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    this.Persons = arr
                }
            })
        },
        getChengjiren () {
            //乘机人
            this.$http.get(this.apis + '/api/passenger/getalllist', {params: {
                cid: this.cid
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    this.Chengjiren = arr
                }
            })
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
                if (_d.info && _d.info.length > 0) {
                    this.orderinfo = _d.info[0]
                    if (this.orderinfo.dnIsTicket > 0) {
                        this.ticketid = this.orderinfo.dcTicketNO
                        this.getTicket()
                        this.getOutTicket()
                        this.getGJPeople()
                        this.getChengjiren()
                    } else {
                        this.ticketinfo.dcOrderID = this.orderid
                    }

                    this.orderStatus = {
                        key: this.orderinfo.dnStatus,
                        value: this.utils.checkStatus(this.orderinfo.dnStatus)
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
                }
                .el-input__inner{
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
                .txt:focus{
                    border-color: #409EFF;
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
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid $pubcolor;
                    box-sizing: border-box;
                    text-indent: 5px;
                }
                .txt-small{
                    width: 50px;
                    text-indent: 5px;
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
                .div_pricemethod{
                    display: flex;
                    justify-content: space-around;
                    select {
                        width: 185px;
                    }
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
