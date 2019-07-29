<template>
    <div class="writeinfo-box">
        <SiteMap></SiteMap>
        <div class="box-bg flight-info">
            <div class="title">
                <div>单程：上海-北京</div>
                <div>出发日期：<span>2019-06-09</span></div>
            </div>
            <div class="info-box">
                <div class="air-no">
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
                    ￥50+￥0                                
                </div>
                <div class="air-handle">
                    <span><i>￥950</i>/成人</span>
                    <span><i>￥950</i>/儿童</span>
                    <span><i>￥305</i>/婴儿</span>
                </div>
            </div>
        </div>

        <div class="person-info">
            <div class="title">
                <span>填写乘机人信息</span>(请准确填写乘客信息,以免在办理登记手续时发生问题)
            </div>
        </div>

        <div :class='"box-bg person-form" + (i > 0? " person-mTop": "")' v-for="(item, i) in personList" :key="i">
            <div>
                <div class="form-label">乘客姓名：</div>
                <el-select v-model="item.ptype" placeholder="成人">
                    <el-option v-for="item in personType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-input v-model="item.name" class="form-input" placeholder="请输入乘客姓名"></el-input>
                <div class="btn-del el-icon-minus"></div>
            </div>
            <div>
                <div class="form-label">证件信息：</div>
                <el-select v-model="item.cardtype" placeholder="身份证">
                    <el-option v-for="item in cardType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-input v-model="item.cardno" class="form-input" placeholder="请输入证件号码"></el-input>
            </div>
            <div>
                <div class="form-label">乘机人手机：</div>
                <el-input v-model="item.mobile" class="form-input-m" placeholder="请输入乘机人手机"></el-input>
            </div>
            <div>
                <div class="form-label">紧急人手机：</div>
                <el-input v-model="item.urgentphone" class="form-input-m" placeholder="请输入紧急人手机"></el-input>
            </div>
            <div>
                <div class="form-label">购买保险：</div>
                <div><el-input-number v-model="item.safenum" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number></div>
                <div> 份 <span class="form-tip">（每份20元）</span></div>
            </div>
            <div class="btn-box">
                <div class="btn-person">添加乘机人</div>
                <div class="btn-person">常用乘机人</div>
            </div>
        </div>

        <div class="table-persons">
            <table>
                <thead>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td>乘机人姓名</td>
                        <td>证件号码</td>
                        <td>乘机人手机</td>
                        <td>紧急人手机</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td><input type="text" :readonly="status ? false : 'readonly'" value="王丽" /></td>
                        <td><input type="text" :readonly="status ? false : 'readonly'" value="2134657846845646611366" /></td>
                        <td><input type="text" :readonly="status ? false : 'readonly'" value="11234585412" /></td>
                        <td><input type="text" :readonly="status ? false : 'readonly'" value="13254678945" /></td>
                        <td><span class="btn-edit">修改</span><span class="btn-save">保存</span></td>
                    </tr>
                    <tr class="cur">
                        <td><div class="check-box el-icon-check"></div></td>
                        <td><input type="text" value="王丽" /></td>
                        <td><input type="text" value="2134657846845646611366" /></td>
                        <td><input type="text" value="11234585412" /></td>
                        <td><input type="text" value="13254678945" /></td>
                        <td><span class="btn-edit">修改</span><span class="btn-save">保存</span></td>
                    </tr>
                    <tr>
                        <td><div class="check-box"></div></td>
                        <td>王丽</td>
                        <td>2134657846845646611366</td>
                        <td>11234585412</td>
                        <td>13254678945</td>
                        <td>修改</td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">确定</div>
        </div>

        <div class="div_btn">
            <div class="btn">提交订单</div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'WriteInfo',
    data () {
        return {
            personType: ['成人', '儿童'],
            cardType: ['身份证', '军官证', '港澳通行证'],
            personList: [{
                ptype: '成人',
                name: '',
                cardtype: '身份证',
                cardno: '',
                mobile: '',
                urgentphone: '',
                safenum: 1
            },{
                ptype: '成人',
                name: '',
                cardtype: '身份证',
                cardno: '',
                mobile: '',
                urgentphone: '',
                safenum: 1
            }]
        }
    },
    components: {
        SiteMap
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.writeinfo-box{
    height: 100%;
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
            .form-label::before{
                content: '*';
                color: #f00000;
            }
            .el-select{
                width: 120px;
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
            display: none;
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
        padding: 20px 60px;
        box-sizing: border-box;
        table{
            width: 100%;
            text-align: center;
            tr{
                td{
                    height: 30px;
                    line-height: 30px;
                    .check-box{
                        margin: 0 auto;
                        width: 16px;
                        height: 16px;
                        border: 1px solid #8f8d8d;
                        box-sizing: border-box;
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
                        display: none;
                        width: 40px;
                        height: 20px;
                        line-height: 20px;
                        cursor: pointer;
                        margin: 0 auto;
                    }
                    input{
                        text-align: center;
                        border: 1px solid #d5dce0;
                        background-color: #eff5f9;
                    }
                    input:read-only{
                        background-color: #e8f1f7;
                        border: 1px solid #e8f1f7;
                    }
                }
                td:first-child{
                    width: 30px;
                }
            }
            .cur{
                .check-box{
                    border: 1px solid $pubcolor;
                    background-color: $pubcolor;
                    color: #fff;
                }
                .btn-edit{
                    display: none;
                }
                .btn-save{
                    display: block;
                    background-color: #fe7122;
                    color: #fff;
                }
            }
        }
        .btn{
            margin: 20px 0 0 40px;
            width: 80px;
            height: 30px;
            line-height: 30px;
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
