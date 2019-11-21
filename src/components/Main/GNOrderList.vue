<template>
    <div class="gnorderlist-box" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable :filter-method="remoteMethod" @change="checkCompany" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.shortname" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" value-key="name" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>出发城市:</div>
                <el-select v-model="selStartCity" value-key="name"  filterable :filter-method="filterScity" placeholder="请选择出发城市">
                    <el-option v-for="item in scityList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div>到达城市:</div>
                <el-select v-model="selEndCity" value-key="name"  filterable :filter-method="filterEcity" placeholder="请选择到达城市">
                    <el-option v-for="item in ecityList" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <div>出发日期:</div>
                <el-date-picker v-model="sdate" type="date" value-format="yyyy-MM-dd" placeholder="请选择出发日期"></el-date-picker>
                <div class="btn-search" @click="getFlightList">
                    国内查询
                </div>
            </div>
        </div>
        <div class="gn-box"> 
            <div class="flight-title">
                <div class="air-no company-no">航空公司/舱位/航班号</div>
                <div class="air-time">起降时间</div>
                <div class="air-port">起降机场</div>
                <div class="air-price">价格/折扣（不含税费）</div>
                <div class="air-handle"></div>
            </div>
            <ul class="flight-list">
                <li class="flight-item" v-for="(item, i) in dataList" :key="i">
                    <div class="flight-info flight-shadow">
                        <div class="air-no company-no company-site-no">
                            <div><img :src="apath + '/static/icons/' + (item.flightNo.substr(0,2)) + '.gif'" alt=""></div>
                            <div class="div_company">
                                <div class="air-company"><span>{{checkAirCompany(item.flightNo.substr(0,2))}}</span>{{item.flightNo}}</div>
                                <div class="air-type">机型：<span>{{item.planeType}}</span> （{{item.seatItems[0].seatMsg.replace("特价舱","特价经济舱")}}）</div>
                            </div>
                        </div>
                        <div class="air-time">
                            <div>
                                <div>{{item.depTime.substr(0,2) + ':' + item.depTime.substr(2,2)}}<span>出发</span></div>
                                <div>{{item.arriTime.substr(0,2) + ':' + item.arriTime.substr(2,2)}}<span>到达</span></div>
                            </div>
                        </div>
                        <div class="air-port">
                            <div>
                                <div>{{checkAirPort(item.orgCity)}}{{item.orgJetquay || ''}}</div>
                                <div>{{checkAirPort(item.dstCity)}}{{item.dstJetquay || ''}}</div>
                            </div>
                        </div>
                        <div class="air-price">
                            <div>
                                <div class="price">&yen;{{item.seatItems[0].parPrice}}</div>
                                <div class="discount">{{ReturnDisCount(item.seatItems[0].discount)}} 
                                    <span @mouseover="checkTGQ(item.flightNo.substr(0,2), item.seatItems[0].seatCode, i, 0)">
                                        退改签
                                        <label class="tgq" v-html="item.seatItems[0].param4"></label>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="air-handle">
                            <div>
                                <div class="btn" @click="bookFlight(item, item.seatItems[0])">预定</div>
                                <div v-if="item.seatItems.length > 1" :class='"more" + (selMore == item.flightNo?" cur":"")' @click="checkMore(item.flightNo)">更多舱位</div>
                            </div>
                        </div>
                    </div>
                    <ul class="air-morelist" v-show="selMore == item.flightNo">
                        <li class="air-moreitem flight-info" v-for="(f, index) in item.seatItems" :key="index" v-if="index > 0">
                            <div class="air-no"></div>
                            <div class="air-time"></div>
                            <div class="air-port">{{f.seatMsg.replace("特价舱","特价经济舱")}}</div>
                            <div class="air-price">
                                <div>
                                    <div class="price">&yen;{{f.parPrice}}</div>
                                    <div class="discount">{{ReturnDisCount(f.discount)}} 
                                        <span @mouseover="checkTGQ(item.flightNo.substr(0,2), f.seatCode, i, index)">
                                            退改签
                                            <label class="tgq" v-html="f.param4"></label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="air-handle">
                                <div>
                                    <div class="btn" @click="bookFlight(item, f)">预定</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="air-flights">
                        <div class="flight-other">机建+燃油：{{item.airportTax}}+{{item.fuelTax}}元 <span>飞行时间：{{checkTime(item.depTime,item.arriTime)}}</span></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'GJOrderList',
    data () {
        return {
            company: [],
            childCompany: [],
            selCompany: '',
            selChildCompany: '',
            selStartCity: '',
            selEndCity: '',
            cityList: [],
            scityList: [],
            ecityList: [],
            dataList: [],
            airPort: [],
            airCompany: [],
            pickerOptions: {},
            sdate: '',
            selMore: '',
            loading: false
        }
    },
    methods: {
        handleCurrentChange: function (v) {
            console.log(v)
        },
        filterScity (v) {
            let arr = this.cityList.filter(e => {
                return e.name.includes(v) || e.airportname.includes(v) || e.code.includes(v.toUpperCase()) || e.country.includes(v) || e.enname.includes(v.toUpperCase())
            })
            if (arr) {
                this.scityList = JSON.parse(JSON.stringify(arr))
            }
        },
        filterEcity (v) {
            let arr = this.cityList.filter(e => {
                return e.name.includes(v) || e.airportname.includes(v) || e.code.includes(v.toUpperCase()) || e.country.includes(v) || e.enname.includes(v.toUpperCase())
            })
            if (arr) {
                this.ecityList = JSON.parse(JSON.stringify(arr))
            }
        },
        checkCompany: function () {
            this.selChildCompany = ''
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childCompany = res.data.data
                }
            })
        },
        checkMore (v) {
            if (this.selMore == v) {
                this.selMore = ''
            } else {
                this.selMore = v
            }
        },
        getFlightList () {
            var _str = JSON.stringify({
                selCompany: this.selCompany,
                selChildCompany: this.selChildCompany,
                scity: this.selStartCity,
                ecity: this.selEndCity,
                sdate: this.sdate
            });
            sessionStorage.setItem('gnsearch', _str)
            this.loading = true
            // 获取航班
            this.$http.get(this.apis + '/api/flight/getgnflights', {params: {
                scity: this.selStartCity.code,
                ecity: this.selEndCity.code,
                sdate: this.sdate
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    var _d = res.data.data
                    console.log(_d)
                    if (_d.data.returnCode === 'S') {
                        this.airCompany = _d.airCompany
                        this.airPort = _d.airPort
                        this.dataList = _d.data.flightItems[0].flights
                    }
                } else {
                    this.MessageBox(res.data.msg)
                }
                this.loading = false
            })
        },
        checkAirCompany (v) {
            let txt = '';
            if (v) {
                for (let i=0; i<this.airCompany.length; i++) {
                    if (this.airCompany[i].CarrierCode == v) {
                        txt = this.airCompany[i].ShortName
                    }
                }
            }
            return txt
        },
        checkAirPort (v) {
            let txt = '';
            if (v) {
                for (let i=0; i<this.airPort.length; i++) {
                    if (this.airPort[i].dcCode == v) {
                        txt = this.airPort[i].dcAirPortName
                        break;
                    }
                }
            }
            return txt
        },
        ReturnDisCount (discount){
            var str = "";
            if (parseFloat(discount) * 10 >= 10)
            {
                str = "全价";
            }
            else
            {
                str = parseFloat(parseFloat(discount) * 10).toFixed(1) + "折";
            }
            return str;
        },
        checkTime(v1, v2) {
            var h1 = Number(v1.substr(0,2))
            var m1 = Number(v1.substr(2,2))
            var h2 = Number(v2.substr(0,2))
            var m2 = Number(v2.substr(2,2))
            var hours = 0, minutes = 0
            hours = h2 - h1
            if (h2 < h1) {
                hours = h2 + 24 - h1
            }
            minutes = m2 - m1
            if (m2 < m1) {
                hours -= 1
                minutes = m2 + 60 -m1
            }
            return hours + "时" + minutes + "分";
        },
        checkTGQ (v, code, m, n) {
            // 获取退改签
            if (!this.dataList[m].seatItems[n].param4) {
                this.$http.get(this.apis + '/api/flight/getflighttgq', {params: {
                    flightNo: v,
                    seatCode: code
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        var _o = res.data.data.replace('更改条件', '<b>更改条件</b>').replace('退票条件', '<br/><b>退票条件</b>').replace('签转条件', '<br/><b>签转条件</b>')
                        if (_o == '') {
                            this.dataList[m].seatItems[n].param4 = '未找到条件';
                        } else {
                            this.dataList[m].seatItems[n].param4 = _o;
                        }
                    }
                })
            }
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
        bookFlight (item, seat) {
            item.airCompanyName = this.checkAirCompany(item.flightNo.substr(0,2))
            item.sAirPort = this.checkAirPort(item.orgCity)
            item.eAirPort = this.checkAirPort(item.dstCity)
            let _str = JSON.stringify(item)
            let _s = JSON.stringify(seat)
            sessionStorage.setItem('bookFlight', _str)
            sessionStorage.setItem('bookFlightSeat', _s)
            this.$router.push({
                path: '/main/WriteInfo'
            })
        }
    },
    components: {
        SiteMap
    },
    created () {
        let searchdata = sessionStorage.getItem('gnsearch')
        if (searchdata) {
            let _d = JSON.parse(searchdata)
            this.selStartCity = _d.scity
            this.selEndCity = _d.ecity
            console.log(this.selStartCity)
            this.sdate = _d.sdate
            this.selCompany = _d.selCompany
            this.checkCompany()
            this.selChildCompany = _d.selChildCompany
        }
        this.getFlightList()
        //获取企业列表
        this.remoteMethod(this.selCompany.name)
                
        //获取城市列表
        this.$http.get(this.apis + '/api/city/getcity', {params: {}})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                this.cityList = res.data.data
                this.scityList = JSON.parse(JSON.stringify(res.data.data))
                this.ecityList = JSON.parse(JSON.stringify(res.data.data))
            }
        })
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.gnorderlist-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
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
                    background-color: #F8F8F8;
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
    .gn-box{
        margin-top: 20px;
        .flight-title{
            display: flex;
            background-color: #f1f7f9;
            line-height: 30px;
            text-align: center;
        }        
        .air-no{
            width: 35%;
        }
        .air-time{
            width: 10%;
        }
        .air-port{
            width: 20%;
        }
        .air-price{
            width: 20%;
        }
        .air-handle{
            width: 15%;
        }
        .company-no{
            padding-left: 60px;
            box-sizing: border-box;
            text-align: left;
        }
        .flight-list{
            margin: 0;
            font-family: '微软雅黑', sans-serif;
            .flight-item{
                margin-top: 5px;
                border-top: 5px solid $pubcolor;
                box-shadow: 2px 2px 4px #ededed;
                background-color: #fff;
                .flight-info{
                    display: flex;
                    text-align: center;
                    height: 75px;
                    .company-site-no{
                        display: flex;
                        align-items: center;
                        .div_company{
                            margin-left: 10px;
                            .air-company{
                                color: #000;
                                font-size: 14px;
                                span{
                                    font-size: 16px;
                                    margin-right: 20px;
                                    font-weight: bold;
                                }
                            }
                            .air-type{
                                font-size: 14px;
                                color: #747474;
                                line-height: 30px;
                                span{
                                    color: $pubcolor;
                                }
                            }
                        }
                    }
                    .air-time{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        div{
                            line-height: 25px;
                            color: #8f8d8d;
                            span{
                                margin-left: 10px;
                            }
                        }
                    }
                    .air-port{
                        display: flex;
                        align-items: center; 
                        justify-content: center;
                        div{
                            line-height: 25px;
                            color: #101010;
                        }
                    }
                    .air-price{
                        display: flex;
                        align-items: center; 
                        justify-content: center;
                        div{
                            line-height: 25px;
                            .price{
                                color: #f00000;
                                font-size: 20px;
                            }
                            .discount{
                                color: #8f8d8d;
                                span{
                                    position: relative;
                                    color: $pubcolor;
                                    cursor: pointer;
                                    .tgq{
                                        display: none;
                                        position: absolute;
                                        z-index: 99999;
                                        width: 240px;
                                        left: 0;
                                        top: 15px;
                                        border: 1px solid $pubcolor;
                                        background-color: #fff;
                                        padding: 10px 6px;
                                        box-sizing: border-box;
                                        text-align: left;
                                        color: #777;
                                        b{
                                            color: #000;
                                        }
                                    }
                                }
                                span:hover .tgq{
                                    display: block;
                                }
                            }
                        }
                    }
                    .air-handle{
                        display: flex;
                        align-items: center; 
                        justify-content: center;
                        .btn{
                            width: 100px;
                            height: 30px;
                            line-height: 30px;
                            box-sizing: border-box;
                            border-radius: 5px;
                        }
                        .more{
                            color: #fe7122;
                            font-size: 12px;
                            margin-top: 5px;
                            padding-right: 10px;
                            position: relative;
                            cursor: pointer;
                        }
                        .more::after{
                            content: '';
                            position: absolute;
                            top: 6px;
                            border-width: 6px;
                            border-style: solid;
                            border-color: #fe7122 transparent transparent transparent;
                        }
                        .cur::after{
                            content: '';
                            position: absolute;
                            top: 0px;
                            border-width: 6px;
                            border-style: solid;
                            border-color: transparent transparent #fe7122 transparent;
                        }
                    }
                }
                .flight-shadow{
                    box-shadow: 2px 2px 4px #ededed;
                    position: relative;
                }
                .air-morelist{
                    margin: 0;
                    position: relative;
                    .air-moreitem{
                        border-top: 1px dotted #dddddd;
                    }
                    .air-moreitem:first-child{
                        border: 0;
                    }
                }
                .air-morelist::before{
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 3%;
                    height: 100%;
                    background: #fff;
                }
                .air-flights{
                    padding-left: 3%;
                    box-sizing: border-box;
                    .flight-other{
                        border-top: 1px dashed #ccc;
                        padding-left: 30px;
                        box-sizing: border-box;
                        font-size: 14px;
                        color: #121212;
                        height: 40px;
                        line-height: 40px;
                        span{
                            margin-left: 80px;
                        }
                    }
                }
            }
            .flight-item:first-child{
                margin: 0;
            }
        }
    }
}
</style>
