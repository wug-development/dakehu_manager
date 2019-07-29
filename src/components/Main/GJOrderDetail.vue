<template>
    <div class="gjorderdetail-box">
        <SiteMap></SiteMap>
        <div class="box-bg detail-info">
            <div class="title"><span class="icon-back el-icon-back"></span></div>
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">75770</span>  <span class="orange">张伟铃</span></td>
                        <td>预订时间：</td>
                        <td>2018/6/5  16:21: 12</td>
                        <td>订单状态：</td>
                        <td>
                            <el-select v-model="orderStatus" placeholder="请选择">
                                <el-option v-for="item in ddlOrderStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </td>
                        <td>出发日期：</td>
                        <td>
                            <el-date-picker v-model="startDate" type="date" placeholder="请选择"></el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>记录编号：</td>
                        <td>
                            <el-input v-model="recordNO"></el-input>
                        </td>
                        <td>乘机人：</td>
                        <td>
                            <el-input v-model="person"></el-input>
                        </td>
                        <td>行程：</td>
                        <td>
                            <el-input v-model="trip"></el-input>
                        </td>
                        <td>票号：</td>
                        <td>                            
                            <el-input v-model="ticketNO"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>订单金额：</td>
                        <td colspan="7">
                            <input class="txt" type="text" value="1260"> ( <input class="txt" type="text" value="1180">  + 税金 <input class="txt" type="text" value="60"> + 服务费 <input class="txt" type="text" value="20"> +保险 <input class="txt" type="text" value="20"> )*1人
                        </td>
                    </tr>
                    <tr>
                        <td>备注：</td>
                        <td colspan="7">
                            <textarea class="txt-other" name="" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>行程：</td>
                        <td colspan="3">
                            <textarea class="txt-trip" name="" id="" cols="30" rows="10"></textarea>
                        </td>
                        <td>乘机人信息：</td>
                        <td colspan="3">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">保存</div>
        </div>
        <div class="box-bg detail-info detail-info-back">
            <div class="div-title">交通建设<span>(退票)</span></div>
            <table cellspacing="0" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">75770</span>  <span class="orange">张伟铃</span></td>
                        <td>预订时间：</td>
                        <td>2018/6/5  16:21: 12</td>
                        <td>订单状态：</td>
                        <td>
                            <el-select v-model="orderStatus" placeholder="请选择">
                                <el-option v-for="item in ddlOrderStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </td>
                        <td>出发日期：</td>
                        <td>
                            <el-date-picker v-model="startDate" type="date" placeholder="请选择"></el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>记录编号：</td>
                        <td>
                            <el-input v-model="recordNO"></el-input>
                        </td>
                        <td>乘机人：</td>
                        <td>
                            <el-input v-model="person"></el-input>
                        </td>
                        <td>行程：</td>
                        <td>
                            <el-input v-model="trip"></el-input>
                        </td>
                        <td>票号：</td>
                        <td>                            
                            <el-input v-model="ticketNO"></el-input>
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
                            <textarea class="txt-other" name="" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>行程：</td>
                        <td colspan="3">
                            <textarea class="txt-trip" name="" id="" cols="30" rows="10"></textarea>
                        </td>
                        <td>乘机人信息：</td>
                        <td colspan="3">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-other">国际退票单</div>
        </div>
        <div class="trip-bill">
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
            ddlOrderStatus: [],
            orderStatus: '等待处理',
            startDate: '2018/6/17',
            recordNO: 'KW2TWE',
            trip: '宁波-北京',
            person: '任永军',
            ticketNO: '996-564758112248',
            backMoney: 0
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
