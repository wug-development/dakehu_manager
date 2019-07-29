<template>
    <div class="gnorderlist-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" filterable placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.shortname" :label="item.shortname" :value="item.name"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>出发城市:</div>
                <el-select v-model="selStartCity" filterable placeholder="请选择出发城市">
                    <el-option v-for="item in cityList" :key="item.CityCode" :label="item.CityName" :value="item.CityName"></el-option>
                </el-select>
                <div>到达城市:</div>
                <el-select v-model="selEndCity" filterable placeholder="请选择到达城市">
                    <el-option v-for="item in cityList" :key="item.CityCode" :label="item.CityName" :value="item.CityName"></el-option>
                </el-select>
                <div>出发日期:</div>
                <el-date-picker v-model="sdate" type="date" placeholder="请选择出发日期"></el-date-picker>
                <div class="btn-search">
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
                <li class="flight-item">
                    <div class="flight-info flight-shadow">
                        <div class="air-no company-no company-site-no">
                            <div><img src="../../assets/images/icon_flight_logo.png" alt=""></div>
                            <div class="div_company">
                                <div class="air-company"><span>东方航空</span>DL186</div>
                                <div class="air-type">机型：<span>77L</span> （特价经济舱位）</div>
                            </div>
                        </div>
                        <div class="air-time">
                            <div>
                                <div>21:20<span>出发</span></div>
                                <div>18:00<span>到达</span></div>
                            </div>
                        </div>
                        <div class="air-port">
                            <div>
                                <div>上海浦东机场</div>
                                <div>北京首都机场T3</div>
                            </div>
                        </div>
                        <div class="air-price">
                            <div>
                                <div class="price">&yen;1723</div>
                                <div class="discount">2.5折 <span>退改签</span></div>
                            </div>
                        </div>
                        <div class="air-handle">
                            <div>
                                <div class="btn">预定</div>
                                <div class="more">更多航班</div>
                            </div>
                        </div>
                    </div>
                    <ul class="air-morelist">
                        <li class="air-moreitem flight-info">
                            <div class="air-no"></div>
                            <div class="air-time"></div>
                            <div class="air-port">特价经济舱位</div>
                            <div class="air-price">
                                <div>
                                    <div class="price">&yen;1723</div>
                                    <div class="discount">2.5折 <span>退改签</span></div>
                                </div>
                            </div>
                            <div class="air-handle">
                                <div>
                                    <div class="btn">预定</div>
                                </div>
                            </div>
                        </li>
                        <li class="air-moreitem flight-info">
                            <div class="air-no"></div>
                            <div class="air-time"></div>
                            <div class="air-port">特价经济舱位</div>
                            <div class="air-price">
                                <div>
                                    <div class="price">&yen;1723</div>
                                    <div class="discount">2.5折 <span>退改签</span></div>
                                </div>
                            </div>
                            <div class="air-handle">
                                <div>
                                    <div class="btn">预定</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="air-flights">
                        <div class="flight-other">机建+燃油：50+0元 <span>飞行时间：4小时20分钟</span></div>
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
            pickerOptions: {},
            sdate: ''
        }
    },
    methods: {
        handleCurrentChange: function (v) {
            console.log(v)
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
            this.sdate = _d.sdate
        }
        
        //获取企业列表
        this.$http.get(this.apis + '/api/company/getallcompany', {params: {}})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                let arr = res.data.data
                arr.sort((x, y) => {
                    return x.shortname.charCodeAt(0) - y.shortname.charCodeAt(0)
                })
                this.company = arr
            }
        })
        
        //获取城市列表
        this.$http.get(this.apis + '/api/city/getcity', {params: {}})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                this.cityList = res.data.data
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
    overflow: hidden;
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
        min-height: 100%;
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
                                    color: $pubcolor;
                                    cursor: pointer;
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
                    }
                }
                .flight-shadow{
                    box-shadow: 2px 2px 4px #ededed;
                    position: relative;
                    z-index: 1;
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
