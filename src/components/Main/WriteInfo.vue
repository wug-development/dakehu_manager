<template>
    <div class="writeinfo-box" v-loading="loading" element-loading-text="订单提交中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255, 255, 255, 0.6)">
        <SiteMap></SiteMap>
        <div class="box-bg flight-info">
            <div class="title">
                <div>单程：{{search.scity.name}}-{{search.ecity.name}}</div>
                <div>出发日期：<span>{{search.sdate}}</span></div>
            </div>
            <div class="info-box">
                <div class="air-no">
                    <div><img :src="apath + '/icons/' + (flight.flightNo.substr(0,2)) + '.gif'" alt=""></div>
                    <div class="div_company">
                        <div class="air-company"><span>{{flight.airCompanyName}}</span>{{flight.flightNo}}</div>
                        <div class="air-type">机型：<span>{{flight.planeType}}</span> （{{seat.seatMsg.replace("特价舱","特价经济舱")}}）</div>
                    </div>
                </div>
                <div class="air-time">
                    <div>
                        <div>{{flight.depTime.substr(0,2) + ':' + flight.depTime.substr(2,2)}}<span>出发</span></div>
                        <div>{{flight.arriTime.substr(0,2) + ':' + flight.arriTime.substr(2,2)}}<span>到达</span></div>
                    </div>
                </div>
                <div class="air-port">
                    <div>
                        <div>{{flight.sAirPort}}{{flight.orgJetquay || ''}}</div>
                        <div>{{flight.eAirPort}}{{flight.dstJetquay || ''}}</div>
                    </div>
                </div>
                <div class="air-price">
                    ￥{{flight.airportTax}}+￥{{flight.fuelTax}}
                </div>
                <div class="air-handle">
                    <span><i>￥{{seat.parPrice + flight.airportTax}}</i>/成人</span>
                    <span><i>￥{{childPrice}}</i>/儿童</span>
                    <span><i>￥{{yingerPrice}}</i>/婴儿</span>
                </div>
            </div>
        </div>

        <div class="person-info">
            <div class="title">
                <span>填写乘机人信息</span>(请准确填写乘客信息,以免在办理登记手续时发生问题)
            </div>
        </div>
        <div :class='"box-bg person-form" + (i > 0? " person-mTop": "")' v-for="(item, i) in selPersonList" :key="i">
            <div>
                <div class="form-label not-null">乘客姓名：</div>
                <el-select v-model="item.type" placeholder="成人">
                    <el-option v-for="item in personType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-input v-model.trim="item.name" class="form-input" placeholder="请输入乘客姓名"></el-input>
                <div class="btn-del el-icon-minus" @click="del(i)"></div>
            </div>
            <div>
                <div class="form-label not-null">证件信息：</div>
                <el-select v-model="item.cardtype" value-key="value" @change="changeCardType(item)" placeholder="身份证">
                    <el-option v-for="item in cardType" :key="item.key" :label="item.value" :value="item.key"></el-option>
                </el-select>
                <el-input v-model="item.idcard" :maxlength="getLen(item.cardtype)" class="form-input" placeholder="请输入证件号码"></el-input>
            </div>
            <div>
                <div class="form-label not-null">乘机人手机：</div>
                <el-input v-model="item.phone" class="form-input-m" placeholder="请输入乘机人手机"></el-input>
            </div>
            <div>
                <div class="form-label">紧急人手机：</div>
                <el-input v-model="item.jjphone" class="form-input-m" placeholder="请输入紧急人手机"></el-input>
            </div>
            <div>
                <div class="form-label">购买保险：</div>
                <div><el-input-number v-model="item.safenum" controls-position="right" :min="0" :max="20"></el-input-number></div>
                <div> 份 <span class="form-tip">（每份20元）</span></div>
            </div>
        </div>
        </el-form>
        <div class="person-form">
            <div class="btn-box">
                <div class="btn-person" @click="addItem">添加乘机人</div>
                <div class="btn-person" v-if="personAllList.length" @click="showPerson = true">常用乘机人</div>
            </div>
        </div>

        <div class="table-persons" v-show="showPerson && personAllList.length">
            <div class="div-persearch"><input type="text" v-model="searchKey" class="txt-search" placeholder="请输入乘机人姓名或手机号" /> <div class="btn" @click="searchPer">搜索</div></div>
            <div class="scroll-table" v-infinite-scroll="loadMorePer" infinite-scroll-immediate="false">
                <table>
                    <thead>
                        <tr>
                            <td><div></div></td>
                            <td>乘机人姓名</td>
                            <td>证件号码</td>
                            <td>护照号码</td>
                            <td>乘机人手机</td>
                            <td>紧急人手机</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in personAllList" :key="i" :class="isEdit===i?'cur':''">
                            <td><div :class='"check-box" + (selPerson.indexOf(item.id) > -1? " el-icon-check":"")' @click="checkPerson(i, item.id)"></div></td>
                            <td><input type="text" class="w30" :readonly="isEdit===i ? false : 'readonly'" maxlength="50" v-model="item.name" /></td>
                            <td><input type="text" class="w15" :readonly="isEdit===i ? false : 'readonly'" maxlength="50" v-model="item.idcard" /></td>
                            <td><input type="text" class="w10" :readonly="isEdit===i ? false : 'readonly'" maxlength="50" v-model="item.hzh" /></td>
                            <td><input type="text" class="w10" :readonly="isEdit===i ? false : 'readonly'" maxlength="50" v-model="item.phone" /></td>
                            <td><input type="text" class="w10" :readonly="isEdit===i ? false : 'readonly'" maxlength="50" v-model="item.jjphone" /></td>
                            <td><span v-if="isEdit===i" @click="savePerson(i)" class="btn-save">保存</span><span v-else class="btn-edit" @click="isEdit = i">修改</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="div_btn">
            <div class="btn" @click="submitOrder">提交订单</div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'WriteInfo',
    data () {
        return {
            loading: false,
            search: {},
            flight: {},
            seat: {},
            childPrice: 0,
            yingerPrice: 0,
            status: false,
            personType: ['成人', '儿童', '婴儿'],
            cardType: [],
            person: {
                id: '',
                type: '成人',
                name: '',
                cardtype: 1,
                idcard: '',
                phone: '',
                jjphone: '',
                safenum: '0'
            },
            selPersonList: [],
            personAllList: [],
            selPerson: [],
            isEdit: '',
            isCheckAll: false,
            showPerson: false,
            selCompany: {},
            page: 0,
            searchKey: '',
            isMorePer: false,
            morePerLoading: false
        }
    },
    components: {
        SiteMap
    },
    methods: {
        getLen (v) {
            let _len = 18
            switch (v) {
                case 1: _len = 18; break
                case 2: _len = 15; break
                case 3: _len = 12; break
                case 4: _len = 12; break
                default: _len = 18; break
            }
            return _len
        },
        addItem () {
            this.selPersonList.push(JSON.parse(JSON.stringify(this.person)))
        },
        checkAll () {
            if (this.isCheckAll) {
                this.selPerson = []
                this.isCheckAll = false
            } else {
                for(let i=0; i<this.personAllList.length; i++){
                    this.selPerson.push(i)
                }
                this.isCheckAll = true
            }
        },
        changeCardType (item) {
            if (item.id) {
                for (let i in this.personAllList) {
                    if (this.personAllList[i].id === item.id) {
                        if (item.cardtype === 1) {
                            item.idcard = this.personAllList[i].idcard
                        } else if (item.cardtype === 2) {
                            item.idcard = this.personAllList[i].hzh
                        }
                    }
                }
            }
        },
        checkPerson (v, id) {
            let _index = this.selPerson.indexOf(id)
            if (_index > -1) {
                this.selPerson.splice(_index, 1)
                this.isCheckAll = false
                let _i = this.selPersonList.findIndex(item => {
                    return item.id === id
                })
                this.selPersonList.splice(_i, 1)
                if (this.selPersonList.length < 1) {
                    this.addItem()
                }
            } else {
                this.selPerson.push(id)
                if (this.selPerson.length === this.personAllList.length) {
                    this.isCheckAll = true
                }
                if (this.selPerson.length) {
                    let obj = this.personAllList[v]
                    let _no = obj.idcard
                    let _t = 1
                    if (_no.trim() === '' && obj.hzh.trim() !== '') {
                        _no = obj.hzh
                        _t = 2
                    }
                    let p = {
                        id: obj.id,
                        type: obj.type == 1? "成人": "儿童",
                        name: obj.name,
                        cardtype: _t,
                        idcard: _no,
                        phone: obj.phone,
                        jjphone: obj.jjphone,
                        safenum: 0
                    }
                    if (this.selPersonList.length < 2 && this.selPersonList[0].name === '') {
                        this.selPersonList = []
                    }
                    this.selPersonList.push(p)
                }
            }
        },
        getServerChildPrice () {
            this.$http.get(this.apis + '/api/flight/getchildprice', {params: {
                scity: this.search.scity.code,
                ecity: this.search.ecity.code,
                sdate: this.search.sdate,
                flightNo: this.flight.flightNo,
                seat: this.seat.seatCode
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childPrice = parseInt(res.data.data.flightDataList[0].seatAndPolicyList[0].ticketPrice)
                    this.yingerPrice = parseInt(this.childPrice * 0.2)
                }
            });
        },
        getCountChildPrice () {
            let _code = 'Y'
            if (this.seat.seatMsg == '商务舱') {
                _code = ''
            } else if (this.seat.seatMsg == '头等舱') {
                _code = ''
            }
            for (let i=0; i < this.flight.seatItems.length; i++) {
                if (this.flight.seatItems[i].seatCode == _code) {
                    this.childPrice = parseInt(this.flight.seatItems[i].parPrice) / 2
                    this.yingerPrice = parseInt(this.flight.seatItems[i].parPrice * 0.1)
                    break
                }
            }
        },
        getCountYChildPrice () {
            for (let i=0; i < this.flight.seatItems.length; i++) {
                if (this.flight.seatItems[i].seatCode == 'Y') {
                    this.childPrice = parseInt(this.flight.seatItems[i].parPrice) / 2
                    this.yingerPrice = parseInt(this.flight.seatItems[i].parPrice * 0.1)
                    break
                }
            }
        },
        getPersonList () {
            this.$http.get(this.apis + '/api/passenger/GetPersonList', {params: {
                cid: this.selCompany.id,
                page: this.page,
                pagenum: 20,
                key: this.searchKey
            }})
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.status != 0) {
                    if (res.data.data.data.length > 0) {
                        if (res.data.data.pagecount) {
                            this.personAllList = res.data.data.data
                        } else {
                            for (let i in res.data.data.data) {
                                this.personAllList.push(res.data.data.data[i])
                            }
                        } 
                    } else {
                        this.isMorePer = true
                    }            
                }
                this.morePerLoading = false
            });
        },
        savePerson (i) {
            this.$http.post(this.apis + '/api/passenger/saveperson', this.personAllList[i])
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.MessageBox(res.data.msg, '温馨提示')
                }
                this.isEdit = ''
            });
        },
        del(i) {
            let _id = this.selPersonList[i].id
            this.selPersonList.splice(i, 1)
            let _index = this.selPerson.findIndex(item => {
                return item === _id
            })
            if (_index > -1) {
                this.selPerson.splice(_index, 1)
                this.isCheckAll = false
            }
        },
        verifyPerson () {
            let isCheck = true
            for (let i in this.selPersonList) {
                if (this.selPersonList[i].name.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的姓名')
                    break;
                } else if (this.selPersonList[i].idcard.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的证件号码')
                    break;
                } else if (this.selPersonList[i].phone.trim() == '') {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的联系电话')
                    break;
                } else if (this.selPersonList[i].jjphone.trim() !== '' && this.selPersonList[i].jjphone.trim() === this.selPersonList[i].phone.trim()) {
                    isCheck = false;
                    this.MessageBox('请输入第 ' + (Number(i) + 1) + ' 位乘机人的联系电话和紧急人联系电话不能一致！')
                    break;
                }
            }
            return isCheck
        },
        submitOrder () {
            let orderBody = {
                cid: this.selCompany.id,
                scity: this.search.scity,
                ecity: this.search.ecity,
                sdate: this.search.sdate,
                cname: this.selCompany.shortname,
                personlist: this.selPersonList,
                airbody: this.flight,
                airseat: this.seat
            }
            if (!this.loading && this.verifyPerson()) {
                // this.loading = true
                // this.$http.post(this.apis + '/api/gnorder/submitordercn', orderBody)
                // .then(res => {
                //     this.loading = false
                //     if (res && res.data && res.data.status != 0) {
                //         this.$store.state.selCompany = this.selCompany
                //         this.MessageBox("下单成功！", '温馨提示').then(()=>{
                //             this.$router.push({
                //                 path: '/main/userbll'
                //             })
                //         })
                //     } else {
                //         this.MessageBox(res.data.msg, '温馨提示')
                //     }
                // }).catch(res => {
                //     this.loading = false
                // })
            }
        },
        loadMorePer () {
            if (!this.morePerLoading && !this.isMorePer) {
                this.page += 1
                this.morePerLoading = true
                this.getPersonList()
            }
        },
        searchPer () {
            this.page = 0
            this.isMorePer = false
            this.loadMorePer()
        }
    },
    created () {
        this.flight = JSON.parse(sessionStorage.getItem('bookFlight'))
        this.seat = JSON.parse(sessionStorage.getItem('bookFlightSeat'))
        this.search = JSON.parse(sessionStorage.getItem('gnsearch'))
        this.selCompany = this.search.selCompany
        if (this.search.selChildCompany && this.search.selChildCompany.id) {
            this.selCompany = this.search.selChildCompany
        }
        // 通过第三方接口获取
        // this.getServerChildPrice()
        // 通过计算获取
        // this.getCountChildPrice()
        // 通过计算获取经济舱Y的儿童价
        this.getCountYChildPrice()

        this.loadMorePer()

        this.addItem()

        this.cardType = this.utils.getCardType()
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.writeinfo-box{
    min-height: 100%;
    .el-input{
        width: auto !important;
    }
    .flight-info{
        border: 1px dotted $pubcolor;
        box-sizing: border-box;
        .title{
            display: flex;
            line-height: 40px;
            height: 40px;
            padding-left: 20px;
            div{
                margin-right: 40px;
                span{
                    background-color: #fe7122;
                    padding: 0 10px;
                    color: #fff;
                }
            }
        }
        .info-box{
            display: flex;
            height: 70px;
            background-color: #f0f7fe;
            align-items: center;
            .air-no{
                display: flex;
                width: 35%;
                padding-left: 40px;
                box-sizing: border-box;
                align-items: center;
                .div_company{
                    margin-left: 15px;
                    .air-company{
                        span{
                            font-size: 16px;
                            margin-right: 15px;
                            font-weight: bold;
                        }
                    }
                    .air-type{
                        color: #8f8d8d;
                        span{
                            color: $pubcolor;
                        }
                    }
                }
            }
            .air-time{
                width: 10%;
                color: #8f8d8d;
            }
            .air-port{
                width: 15%;
            }
            .air-price{
                width: 10%;
                color: #8f8d8d;
            }
            .air-handle{
                width: 30%;
                display: flex;
                justify-content: space-around;
                i{
                    color: #fe7122;
                }
            }
        }
    }
    .person-info{
        margin-top: 20px;
        background-color: #fff;
        .title{
            height: 60px;
            line-height: 60px;
            color: #fe7122;
            padding-left: 20px;
            box-sizing: border-box;
            span{
                color: #121212;
                font-size: 18px;
                font-weight: bold;
                margin-right: 15px;
            }
        }
    }
    .person-form{
        padding: 20px 0;
        .el-form-item__content{
            display: flex;
        }
        >div{
            display: flex;
            height: 40px;
            line-height: 40px;
            box-sizing: border-box;
            margin-bottom: 15px;
            .form-label{
                width: 130px;
                text-align: right;
            }
            .not-null::before{
                content: '*';
                color: #f00000;
            }
            .el-select{
                width: 120px !important;
                margin-right: 15px;
            }
            .form-input{
                width: 200px;
            }
            .form-input-m{
                width: 260px;
            }
            .el-input-number{
                width: 85px;
                margin-right: 5px;
            }
            .form-tip{
                color: #f00000;
                margin-left: 20px;
            }
            .btn-del{
                display: none;
                margin: 8px 20px;
                width: 24px;
                height: 24px;
                line-height: 24px;
                border-radius: 30px;
                background-color: #fe7122;
                color: #fff;
                text-align: center;
                cursor: pointer;
                box-shadow: 2px 2px 5px #ddd;
            }
        }
        .btn-box{
            padding: 10px 0 40px 130px;
            .btn-person{
                height: 40px;
                line-height: 40px;
                border: 1px solid $pubcolor;
                width: 120px;
                text-align: center;
                color: $pubcolor;
                margin-right: 20px;
                box-shadow: 2px 2px 5px #ddd;
                cursor: pointer;
                user-select: none;
            }
            .btn-person:active{
                background-color: #efefef;
            }
        }
    }
    .person-mTop{
        margin-top: 20px;
        >div{
            .btn-del{
                display: block;
            }
        }
    }
    .person-form:last-child{
        .btn-box{
            display: flex;
        }
    }
    .table-persons{
        background-color: #e8f1f7;
        box-sizing: border-box;
        padding: 0;
        max-height: 300px;
        .div-persearch{
            display: flex;
            padding: 5px 0 0 60px;
            .txt-search{
                border: 0;
                padding-left: 10px;
                width: 200px;
                height: 30px;
                line-height: 30px;
            }
            .btn{
                display: block;
                width: 80px;
                height: 30px;
                line-height: 30px;
                margin-left: 15px;
            }
        }
        .scroll-table{
            max-height: 240px;
            padding: 5px 20px;
            box-sizing: border-box;
            overflow: hidden auto;
            table{
                width: 100%;
                text-align: center;
                tr{
                    td{
                        height: 30px;
                        line-height: 30px;
                        .check-box{
                            cursor: pointer;
                            margin: 0 auto;
                            width: 16px;
                            height: 16px;
                            border: 1px solid #8f8d8d;
                            box-sizing: border-box;
                        }
                        .el-icon-check{
                            border: 1px solid $pubcolor;
                            background-color: $pubcolor;
                            color: #fff;
                        }
                        .btn-edit{
                            display: block;
                            width: 40px;
                            height: 20px;
                            line-height: 20px;
                            cursor: pointer;
                            margin: 0 auto;
                        }
                        .btn-save{
                            width: 40px;
                            height: 20px;
                            line-height: 20px;
                            cursor: pointer;
                            margin: 0 auto;
                        }
                        input{
                            width: 150px;
                            text-align: center;
                            border: 0;
                            background-color: #fff;
                        }
                        input:read-only{
                            background-color: #e8f1f7;
                            border: 1px solid #e8f1f7;
                        }
                        .w30{
                            width: 300px;
                        }
                        .w15{
                            width: 150px;
                        }
                        .w10{
                            width: 100px;
                        }
                    }
                    td:first-child{
                        width: 30px;
                    }
                }
                .cur{
                    .btn-save{
                        display: block;
                        background-color: #fe7122;
                        color: #fff;
                    }
                }
            }
        }
    }
    .div_btn{
        margin: 40px;
        .btn{
            margin: 0 auto;
        }
    }
}

</style>
