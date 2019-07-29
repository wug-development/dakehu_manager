<template>
    <div class="gnorderdetail-box">
        <SiteMap></SiteMap>
        <div class="box-bg detail-info">
            <div class="title"><span class="icon-back el-icon-back"></span></div>
            <table class="table-info" cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">75770</span> <span class="orange">张伟铃</span></td>
                        <td>预订时间：</td>
                        <td>2018/6/5  16:21:12</td>
                    </tr>
                    <tr>
                        <td>出发日期：</td>
                        <td>
                            <input class="txt" type="text" value="2018/6/17">
                        </td>
                        <td>订单状态：</td>
                        <td>等待处理</td>
                    </tr>
                    <tr>
                        <td>起落机场：</td>
                        <td><input class="txt" type="text" value="上海虹桥机场-北京首都机场"></td>
                        <td>票号：</td>
                        <td><input class="txt" type="text" value=""></td>
                    </tr>
                    <tr>
                        <td>航班号：</td>
                        <td><input class="txt" type="text" value="CA118"></td>
                        <td>航站楼：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td>起落时间：</td>
                        <td><input class="txt" type="text" value="10:55-11:55" ></td>
                        <td>CTCM：</td>
                        <td><input class="txt" type="text" value="18625435412" ></td>
                    </tr>
                    <tr>
                        <td>舱位：</td>
                        <td><input class="txt" type="text" value="经济舱" ></td>
                        <td>CTCT：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td>折扣：</td>
                        <td><input class="txt" type="text" value="" ></td>
                        <td>记录编号：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td>订单金额：</td>
                        <td><input class="txt" type="text" value="1260 ( 1180 + 税金 60 + 服务费 20 +保险20)*1人" ></td>
                        <td>备注：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-other">+添加乘机人</div>
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
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-box">
                <div class="btn">改期</div>
                <div class="btn-other">退票</div>
                <div class="btn-other">国内出票单</div>
            </div>
        </div>
        <div class="box-bg detail-info detail-info-back">
            <div class="div-title">交通建设<span>(改期)</span></div>
            <table class="table-info" cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><span class="blue">75770</span> <span class="orange">张伟铃</span></td>
                        <td>预订时间：</td>
                        <td>2018/6/5  16:21:12</td>
                    </tr>
                    <tr>
                        <td>出发日期：</td>
                        <td>
                            <input class="txt" type="text" value="2018/6/17">
                        </td>
                        <td>订单状态：</td>
                        <td>等待处理</td>
                    </tr>
                    <tr>
                        <td>起落机场：</td>
                        <td><input class="txt" type="text" value="上海虹桥机场-北京首都机场"></td>
                        <td>票号：</td>
                        <td><input class="txt" type="text" value=""></td>
                    </tr>
                    <tr>
                        <td>航班号：</td>
                        <td><input class="txt" type="text" value="CA118"></td>
                        <td>航站楼：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td>起落时间：</td>
                        <td><input class="txt" type="text" value="10:55-11:55" ></td>
                        <td>CTCM：</td>
                        <td><input class="txt" type="text" value="18625435412" ></td>
                    </tr>
                    <tr>
                        <td>舱位：</td>
                        <td><input class="txt" type="text" value="经济舱" ></td>
                        <td>CTCT：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td>折扣：</td>
                        <td><input class="txt" type="text" value="" ></td>
                        <td>记录编号：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                    <tr>
                        <td class="orange">改期金额：</td>
                        <td><input class="txt" type="text" value="1000（ 改期费 600 + 差价 400 ）" ></td>
                        <td>备注：</td>
                        <td><input class="txt" type="text" value="" ></td>
                    </tr>
                </tbody>
            </table>
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
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                    <tr>
                        <td>徐坤（成人）</td>
                        <td>18625435412</td>
                        <td>身份证</td>
                        <td>26443556841422265 <span class="el-icon-minus"></span></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn">提交</div>
        </div>
        <div class="box-bg">
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
                            <td>票价</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>代理费</td>
                            <td>
                                <input class="txt txt-small" type="text"> + <input class="txt txt-small" type="text">
                            </td>
                            <td>基建税金</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>人     数</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>保     险</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>应       收</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>服务费</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td class="red">合计</td>
                            <td>
                                0
                            </td>
                            <td class="red">实际到账</td>
                            <td>
                                0 返 <input class="txt txt-small" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td class="red">结算价</td>
                            <td>
                                0
                            </td>
                            <td class="red">利      润</td>
                            <td>
                                0
                            </td>
                            <td>出票点</td>
                            <td>
                                <select><option value="0">凯行网</option></select>
                                <select><option value="0">支付宝</option></select>
                            </td>
                            <td>票      号</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>起落时间</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>客 户</td>
                            <td>
                                <select><option value="0">阿塔其大</option></select>
                            </td>
                            <td>送票方式</td>
                            <td>
                                <select><option value="0">不送</option></select>
                            </td>
                            <td>送票员</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>乘 机 人</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>航  班 号</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>出发日期</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>账单票价</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td>舱 位</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>折 扣</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td>订 单 号</td>
                            <td>
                                <input class="txt" type="text">
                            </td>
                            <td class="red">奖 金</td>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td>收款方式</td>
                            <td>
                                <input class="txt txt-small" type="text" placeholder="金额">
                                <select><option value="0">欠款</option></select>
                                <br>
                                <input class="txt txt-small" type="text" placeholder="金额">
                                <select><option value="0">请选择</option></select>
                            </td>
                            <td>备注</td>
                            <td colspan="3">
                                <input class="txt txt-max" type="text">
                            </td>
                            <td>订票日期</td>
                            <td>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
.gnorderdetail-box{
    padding-bottom: 50px;
    .detail-info{
        padding-bottom: 20px;
        padding-left: 20px;
        .title{
            font-size: 32px;
            color: $pubcolor;
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
