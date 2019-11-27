<template>
    <div class="gnorderdetail-box">
        <SiteMap></SiteMap>
        <div class="box-bg detail-info">
            <div class="title"><span class="icon-back el-icon-back" @click="backPage"></span></div>
            <table class="table-info" cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">{{orderinfo.dcOrderID}}</span> <span class="orange">{{orderinfo.dcLinkName}}</span></td>
                        <td>预订时间：</td>
                        <td>{{orderinfo.dtAddTime && orderinfo.dtAddTime.replace('T', ' ')}}</td>
                    </tr>
                    <tr>
                        <td>出发日期：</td>
                        <td>
                            <input class="txt" type="text" v-model="orderinfo.dcStartDate">
                        </td>
                        <td>订单状态：</td>
                        <td> 
                            {{orderStatus.value}}
                            <!-- <el-select v-model="orderStatus" value-key="value" placeholder="请选择">
                                <el-option v-for="item in ddlOrderStatus" :key="item.key" :label="item.value" :value="item"></el-option>
                            </el-select> -->
                        </td>
                    </tr>
                    <tr>
                        <td>起落机场：</td>
                        <td>{{orderinfo.dcStartCity}} - {{orderinfo.dcBackCity}}</td>
                        <td>票号：</td>
                        <td><input class="txt" type="text" v-model="orderinfo.dcTicketNO"></td>
                    </tr>
                    <tr>
                        <td>航班号：</td>
                        <td>{{flightinfo.dcAirCode}}</td>
                        <td>航站楼：</td>
                        <td>{{flightinfo.dcSJetquay}}</td>
                    </tr>
                    <tr>
                        <td>起落时间：</td>
                        <td>{{flightinfo.dcSTime}} - {{flightinfo.dcETime}}</td>
                        <td>CTCM：</td>
                        <td><input class="txt" type="text" v-model="orderinfo.dcPhone" ></td>
                    </tr>
                    <tr>
                        <td>舱位：</td>
                        <td>{{flightinfo.dcSeatMsg}}</td>
                        <td>CTCT：</td>
                        <td><input class="txt" type="text" v-model="orderinfo.dcCTCT" ></td>
                    </tr>
                    <tr>
                        <td>折扣：</td>
                        <td><input class="txt" type="text" v-model="orderinfo.dnDiscount" ></td>
                        <td>记录编号：</td>
                        <td><input class="txt" type="text" v-model="orderinfo.dcOrderCode" ></td>
                    </tr>
                    <tr v-if="orderinfo.dnOrderStatus == 1">
                        <td>订单金额：</td>
                        <td colspan="3">
                            <div class="div-price">
                                <input type="text" class="txt small" v-model="orderinfo.dnTotalPrice">&nbsp;（&nbsp;&nbsp;
                                <input type="text" class="txt small" v-model="orderinfo.dnPrice">&nbsp;+&nbsp;税金&nbsp;
                                <input type="text" class="txt small" v-model="orderinfo.dnTax">&nbsp;+&nbsp;服务费&nbsp;
                                <input type="text" class="txt small" v-model="orderinfo.dnServicePrice">&nbsp;+&nbsp;保险&nbsp;
                                <input type="text" class="txt small" v-model="orderinfo.dnSafePrice">&nbsp;&nbsp;）* 
                                {{personlist.length}}人
                            </div>
                        </td>
                    </tr>
                    <tr v-if="orderinfo.dnOrderStatus == 2">
                        <td class="orange">实退金额：</td>
                        <td colspan="3">
                            <div class="div-price">
                                <input type="text" class="txt small" v-model="orderinfo.dnTotalPrice">
                            </div>
                        </td>
                    </tr>
                    <tr v-if="orderinfo.dnOrderStatus == 3">
                        <td class="orange">改期金额：</td>
                        <td colspan="3">
                            <div class="div-price">
                                <input type="text" class="txt small" v-model="orderinfo.dnTotalPrice">&nbsp;（&nbsp;&nbsp;
                                改期费&nbsp;<input type="text" class="txt small" v-model="orderinfo.dnChangeDatePrice">&nbsp;+&nbsp;
                                差价&nbsp;<input type="text" class="txt small" v-model="orderinfo.dnChaPrice">&nbsp;&nbsp;）
                            </div>
                        </td>
                    </tr>
                    <tr>                        
                        <td>备注：</td>
                        <td colspan="3"><input class="txt" type="text" v-model="orderinfo.dcContent" ></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-other" style="display:none;">+添加乘机人</div>
            <table class="table-persons" cellspacing="1" cellpadding="0">
                <thead>
                    <tr>
                        <th>乘机人</th>
                        <th>联系电话（CTCM)</th>
                        <th>证件类型</th>
                        <th>证件号码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in personlist" :key="i">
                        <td>{{item.dcPerName}}（成人）</td>
                        <td>{{item.dcPhone}}</td>
                        <td>身份证</td>
                        <td>{{item.dcIDNumber}} <span v-if="personlist.length > 1" @click="delPerson(item, i)">—</span></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-box">
                <div class="btn" v-if="orderinfo.dnStatus == 0" @click="save">保存</div>
                <div class="btn-other" v-if="checkOrderStatus == 1 && orderinfo.dnOrderStatus == 1" @click="changeOrderType(2)">改期</div>
                <div class="btn-other" v-if="checkOrderStatus == 1 && orderinfo.dnOrderStatus == 1" @click="changeOrderType(2)">退票</div>
                <div class="btn-other" v-if="checkOrderStatus == 1" @click="showTicket">国内出票单</div>
            </div>
        </div>
        <div class="box-bg">
            <div class="trip-bill">
                <table cellspacing="1" cellpadding="0">
                    <tbody>
                        <tr>
                            <td>航空公司</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcAirCompanyName">
                            </td>
                            <td>记录 编号</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcOrderCode">
                            </td>
                            <td>行 程</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcStartCity">
                            </td>
                            <td>票价</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnSellPrice">
                            </td>
                        </tr>
                        <tr>
                            <td>代理费</td>
                            <td>
                                <input class="txt txt-small" type="text" @change="countAutoPrice" v-model="ticketinfo.dnReturnPoint1"> + <input class="txt txt-small" type="text" @change="countAutoPrice" v-model="ticketinfo.dnReturnPoint2">
                            </td>
                            <td>基建税金</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnTax">
                            </td>
                            <td>人     数</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnPersonNumber">
                            </td>
                            <td>保     险</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnSafePrice">
                            </td>
                        </tr>
                        <tr>
                            <td>应       收</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnYingShouPrice">
                            </td>
                            <td>服务费</td>
                            <td>
                                <input class="txt" type="text" @change="countAutoPrice" v-model="ticketinfo.dnServicePrice">
                            </td>
                            <td class="red">合计</td>
                            <td>
                                {{ticketinfo.dnCountPrice}}
                            </td>
                            <td class="red">实际到账</td>
                            <td>
                                {{ticketinfo.dnShiJiDaoZhang}} 返 <input class="txt txt-small" type="text" @change="countAutoPrice" v-model="ticketinfo.dnFandianPrice">
                            </td>
                        </tr>
                        <tr>
                            <td class="red">结算价</td>
                            <td>
                                {{ticketinfo.dnJieSuanPrice}}
                            </td>
                            <td class="red">利      润</td>
                            <td>
                                {{ticketinfo.dnLiRun}}
                            </td>
                            <td>出票点</td>
                            <td>
                                <select v-model="selOutTicket" @change="countAutoPrice">
                                    <option value="">请选择</option>
                                    <option v-for="(item, i) in OutTicket" :key="i" :value="item">{{item.name}}</option>
                                </select>
                                <select v-model="ticketinfo.dcCPDXX"><option value="支付宝" selected>支付宝</option><option value="未定">未定</option></select>
                            </td>
                            <td>票      号</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcTicketNO">
                            </td>
                        </tr>
                        <tr>
                            <td>起落时间</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcFlightTime">
                            </td>
                            <td>客 户</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcCompanyName">
                            </td>
                            <td>送票方式</td>
                            <td>
                                <select v-model="ticketinfo.dcSendTicketType">
                                    <option value="不送" selected>不送</option>
                                    <option value="送票">送票</option>
                                    <option value="自取">自取</option>
                                    <option value="快递">快递</option>
                                </select>
                            </td>
                            <td>送票员</td>
                            <td>                                
                                <select v-model="ticketinfo.dcSendTicketerName">
                                    <option v-for="(item, i) in sendTicketerS" :key="i" :value="item.name">{{item.name}}</option>
                                </select>
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
                            <td>出发日期</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcStartDate">
                            </td>
                            <td>账单票价</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dnTicketPrice">
                            </td>
                        </tr>
                        <tr>
                            <td>舱 位</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcRakedClass">
                            </td>
                            <td>折 扣</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dnDiscount">
                            </td>
                            <td>订 单 号</td>
                            <td>
                                <input class="txt" type="text" v-model="ticketinfo.dcOrderID">
                            </td>
                            <td class="red">奖 金</td>
                            <td>
                                {{ticketinfo.dnBonus}}
                            </td>
                        </tr>
                        <tr>
                            <td>收款方式</td>
                            <td>
                                <input class="txt txt-small" type="text" placeholder="金额" @change="countAutoPrice" v-model="ticketinfo.dnPaymentPrice1">
                                <select v-model="ticketinfo.dcPaymentMethod1">
                                    <option value="">请选择</option>
                                    <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                </select>
                                <br>
                                <input class="txt txt-small" type="text" placeholder="金额" @change="countAutoPrice" v-model="ticketinfo.dnPaymentPrice2">
                                <select v-model="ticketinfo.dcPaymentMethod2">
                                    <option value="">请选择</option>
                                    <option v-for="(item, i) in dllMethod" :key="i" :value="item">{{item}}</option>
                                </select>
                            </td>
                            <td>备注</td>
                            <td colspan="3">
                                <input class="txt txt-max" type="text" v-model="ticketinfo.dcOther">
                            </td>
                            <td>订票日期</td>
                            <td>
                                {{ticketinfo.dtAddTime && ticketinfo.dtAddTime.replace('T', ' ')}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn" @click="submitTicket">提交</div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../../Common/SiteMap.vue'
export default {
    name: 'GNOrderDetail',
    data () {
        return {
            orderid: '',
            cid: '',
            ticketid: '',
            account: {},
            checkOrderStatus: '',
            OutTicket: [],
            orderinfo: {},
            flightinfo: {},
            personlist: [],
            sendTicketerS: [],
            orderStatus: '',
            ddlOrderStatus: [{key:0,value:'等待处理'},{key:1,value:'处理完成'}],
            dllMethod: ['预收款', '抵退票', '欠款'],
            isChangeType: false,
            delPP: '',
            selOutTicket: {id: 168, name: 'K凯行网'},
            ticketinfo: {
                dnSellPrice: '',
                dnDiJia: '',
                dnReturnPoint1: '',
                dnReturnPoint2: '',
                dnReturnPoint3: 0,
                dnTax: '',
                dnPersonNumber: 1,
                dnJieSuanPrice: 0,
                dnShiJiDaoZhang: 0,
                dnLiRun: 0,
                dnShiShouPrice: 0,
                dnYaoWeiPrice: 0,
                dnReturnPrice: '',
                dnYingShouPrice: '',
                dnServicePrice: '',
                dnPaymentPrice1: '',
                dnPaymentPrice2: '',
                dnFandianPrice: '',
                dnSafePrice: '',
                dcSendTicketType: '不送',
                dcCPDXX: '支付宝',
                dcPaymentMethod1: '欠款',
                dcPaymentMethod2: '欠款',
                dcSendTicketerName: '无',
                dnIsTicket: 0
            },
        }
    },
    components: {
        SiteMap
    },
    methods: {
        save () {
            if (this.orderinfo.dcTicketNO) {
                this.orderinfo.dnStatus = 1
                this.orderinfo.dcAdminID = this.account.id
                this.orderinfo.dcAdminName = this.account.uname
                if (!this.isChangeType) {
                    this.$http.post(this.apis + '/api/gnorder/editorder', this.orderinfo)
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            if (this.orderStatus.key == 1) {
                                this.checkOrderStatus = this.orderinfo.dnStatus
                            }
                            if (this.delPP) {
                                this.$http.get(this.apis + '/api/order/delperson', {params: {
                                    id: this.delPP
                                }})
                                .then(res => {})
                            }
                            this.MessageBox('保存成功！').then(() => {
                                this.backPage()
                            })
                        }
                    })
                } else {
                    this.$http.post(this.apis + '/api/order/changeorder', this.orderinfo)
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            this.MessageBox('保存成功！').then(() => {
                                this.backPage()
                            })
                        }
                    })
                }
            } else {
                this.MessageBox('请输入票号！')
            }
        },
        delPerson (item, i) {
            this.delPP = this.delPP + ',' + item.dcOPID
            this.personlist.splice(i, 1)
        },
        backPage () {
            this.$router.go(-1)
        },
        getTicket () {
            this.$http.get(this.apis + '/api/ticket/getticketinfo', {params: {
                tid: this.ticketid
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.ticketinfo = res.data.data[0]
                    this.ticketinfo.dcStartCity = this.ticketinfo.dcStartCity + '-' + this.ticketinfo.dcBackCity
                    this.selOutTicket = {
                        id: this.ticketinfo.dcOutTicketID,
                        name: this.ticketinfo.dcOutTicketName
                    }
                }
            })
        },
        changeOrderType (v) {
            this.orderinfo.dnOrderStatus = v
            this.orderinfo.dtAddTime = ''
            this.isChangeType = true
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
        getSendTicketer () {
            //获取送票人
            this.$http.get(this.apis + '/api/gnorder/getsendticketer', {params: {}})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    this.sendTicketerS = arr
                }
            })
        },
        showTicket () {
            if (this.orderinfo.dnIsTicket < 1) {
                this.orderinfo.dnIsTicket = 1
                this.ticketinfo.dcOrderCode = this.orderinfo.dcOrderCode
                this.ticketinfo.dcTicketNO = this.orderinfo.dcTicketNO
                this.ticketinfo.dcOrderID = this.orderinfo.dcOrderID
                this.ticketinfo.dcFlightTime = (this.flightinfo.dcSTime || '') + '-' + (this.flightinfo.dcETime || '')
                this.ticketinfo.dcStartCity = (this.orderinfo.dcStartCity || '') + '-' + (this.orderinfo.dcBackCity || '')
                this.ticketinfo.dcAirCompanyName = this.flightinfo.dcCompanyCode
                this.ticketinfo.dcCompanyName = this.orderinfo.dcCompanyName
                this.ticketinfo.dcRakedClass = (this.flightinfo.dcSeatMsg || '').replace('特价', '').replace('超级', '')
                this.ticketinfo.dcFlightNumber = this.flightinfo.dcAirCode
                this.ticketinfo.dcStartDate = this.orderinfo.dcStartDate
                this.ticketinfo.dnDiscount = this.orderinfo.dnDiscount * 10
                this.ticketinfo.dnSellPrice = this.orderinfo.dnPrice
                this.ticketinfo.dnTax = this.orderinfo.dnTax
                this.ticketinfo.dnServicePrice = this.orderinfo.dnServicePrice * this.personlist.length
                this.ticketinfo.dnYingShouPrice = this.orderinfo.dnTotalPrice

                let _n = ''
                for (const key in this.personlist) {
                    if (key > 0) {
                        _n += ' '
                    }
                    _n += this.personlist[key].dcPerName
                }
                this.ticketinfo.dcPersonName = _n

                this.getOutTicket()
                this.getSendTicketer()
            }
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
        countAutoPrice () {
            let sprice = this.ticketinfo.dnSellPrice || 0
            let r1 = this.ticketinfo.dnReturnPoint1 || 0
            let r2 = this.ticketinfo.dnReturnPoint2 || 0
            let tax = this.ticketinfo.dnTax || 0
            let p = this.ticketinfo.dnPersonNumber || 1
            let yingshou = this.ticketinfo.dnYingShouPrice || 0
            let servicep = this.ticketinfo.dnServicePrice || 0
            let p1 = this.ticketinfo.dnPaymentPrice1 || 0
            let p2 = this.ticketinfo.dnPaymentPrice2 || 0
            let fprice = this.ticketinfo.dnFandianPrice || 0
            let safeprice = this.ticketinfo.dnSafePrice || 0

            this.ticketinfo.dnJieSuanPrice = (parseFloat(sprice) * (1 - parseFloat(r1) / 100) + parseFloat(r2) + parseFloat(tax)) * parseFloat(p);
            this.ticketinfo.dnCountPrice = parseFloat(yingshou) + parseFloat(servicep)
            if (p1 + p2 < 1) {
                this.ticketinfo.dnShiJiDaoZhang = (parseFloat(this.ticketinfo.dnCountPrice) * (1 - parseFloat(0) / 100)).toFixed(2)
            } else {
                this.ticketinfo.dnShiJiDaoZhang = ((parseFloat(p1) * (1 - parseFloat(0) / 100)) + (parseFloat(p2) * (1 - parseFloat(0) / 100))).toFixed(2)
            }
            this.ticketinfo.dnLiRun = (parseFloat(this.ticketinfo.dnShiJiDaoZhang) - parseFloat(this.ticketinfo.dnJieSuanPrice) - parseFloat(fprice) - parseFloat(safeprice)).toFixed(2);
        },
        submitTicket () {
            this.ticketinfo.dcCompanyID = this.orderinfo.dcCompanyID
            this.ticketinfo.dcCompany = this.orderinfo.dcCompanyName
            if (this.selOutTicket) {
                this.ticketinfo.dcOutTicketID = this.selOutTicket.id
                this.ticketinfo.dcOutTicketName = this.selOutTicket.name
            }
            this.ticketinfo.dcAddUser = this.orderinfo.dcAdminName
            this.$http.post(this.apis + '/api/ticket/submitticket', this.ticketinfo)
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox('保存成功！').then(() => {
                        this.backPage()
                    })
                }
            })
        }
    },
    created () {
        this.account = JSON.parse(sessionStorage.getItem('loginData'))
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
                        this.ticketid = this.orderinfo.dcOrderID
                        this.getTicket()
                        this.getOutTicket()
                        this.getSendTicketer()
                    } else {
                        this.showTicket()
                    }

                    this.orderStatus = {
                        key: this.orderinfo.dnStatus,
                        value: this.utils.checkStatus(this.orderinfo.dnStatus)
                    }
                    this.checkOrderStatus = this.orderinfo.dnStatus
                    this.flightinfo = _d.flight[0]
                    this.personlist = _d.person
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.gnorderdetail-box{
    padding-bottom: 50px;
    .detail-info{
        padding-bottom: 20px;
        padding-left: 20px;
        .title{
            font-size: 32px;
            color: $pubcolor;
            .icon-back{
                cursor: pointer;
            }
        }
        .div-title{
            padding-left: 20px;
            height: 45px;
            line-height: 45px;
            font-size: 16px;
            span{
                color: $pubcolor;
            }
        }
        .table-info{
            width: 1000px;
            background-color: #c7c7c7;
            td{
                height: 50px;
                line-height: 50px;
                padding: 0 10px;
                box-sizing: border-box;
                .txt{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border: 1px solid #DCDFE6;
                    box-sizing: border-box;
                    padding-left: 10px;
                }
                .div-price{
                    display: flex;
                    align-items: center;
                    .small{
                        width: 60px;
                        text-align: center;
                        padding: 0;
                    }
                }
            }
            td:nth-child(odd){
                width: 170px;
                text-align: right;
                padding-right: 50px;
                background-color: #f1f1f1;
            }
            td:nth-child(even){
                width: 330px;
                background-color: #fff;
            }
            .blue{
                color: $pubcolor;
            }
            .orange{
                margin-left: 10px;
                color: $pubbtncolor;
            }
        }
        .btn-other{
            margin-top: 40px;
        }
        .table-persons{
            width: 720px;
            margin: 20px;
            text-align: center;
            background-color: #ebe7e8;
            td,th{
                height: 40px;
                line-height: 40px;
            }
            th{
                background-color: #f4f0ef;
            }
            td{
                background-color: #fff;
                position: relative;
                span{
                    position: absolute;
                    top: 8px;
                    right: -40px;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    border-radius: 30px;
                    background-color: $pubbtncolor;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                }
            }
        }
        .btn-box{
            padding-top: 20px;
            display: flex;
            .btn-other{
                margin: 0 0 0 20px;
            }
        }
    }
    .detail-info-back{
        margin-top: 20px;
    }
    .trip-bill{
        margin-top: 20px;
        background-color: #c1dcf7;
        padding: 30px 0;
        table{
            width: 100%;
            background-color: #add5fb;
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
                background-color: #c1dcf7;
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
    .trip-bill+.btn{
        margin: 20px auto;
    }
}
</style>
