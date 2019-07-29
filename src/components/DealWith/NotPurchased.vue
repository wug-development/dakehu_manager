<template>
    <div class="notpurchased-box">
        <SiteMap></SiteMap>
        <ul class="company-list">
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
            <li>
                <div>
                    <div class="div_company el-icon-s-home">G光景瑞星文化</div>
                    <div class="div_date">最后出票日：2018/08/07</div>
                </div>
            </li>
        </ul>
        <div class="div-page">
            <el-pagination background layout="prev, pager, next" :page-size="5" @current-change="handleCurrentChange" :total="1000"></el-pagination>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'
export default {
    name: 'NotPurchased',
    data () {
        return {}
    },
    components: {
        SiteMap
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.notpurchased-box{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    .company-list{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 284px;
            height: 174px;
            box-sizing: border-box;
            box-shadow: 2px 2px 5px #ddd;
            padding-top: 8px;
            background: linear-gradient(left, #abdbe6, #7ac6d7);
            margin: 0 30px 60px 0;
            >div{
                width: 100%;
                height: 100%;
                background-color: #fff;
                text-align: center;
                padding-top: 25px;
                box-sizing: border-box;
                letter-spacing: 1px;
                .div_company{
                    width: 100%;
                    height: 55px;
                    line-height: 40px;
                    position: relative;
                    padding-bottom: 15px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #f3f2f2;
                }
                .div_company::before{
                    content: '\e7b9';
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 40px;
                    background-color: #7ac6d7;
                    margin-right: 10px;
                    color: #fff;
                    font-size: 20px;
                }
                .div_date{
                    font-size: 16px;
                    line-height: 40px;
                }
            }
        }
        li:nth-child(5n+1){
            background: linear-gradient(left, #abdbe6, #7ac6d7);
            .div_company::before{
                background-color: #7ac6d7;
            }
        }
        li:nth-child(5n+2),li:nth-child(5n+5){
            background: linear-gradient(left, #ffc6bd, #ffa89a);
            .div_company::before{
                background-color: #ffa89a;
            }
        }
        li:nth-child(5n+3){
            background: linear-gradient(left, #d7ccf3, #8362d9);
            .div_company::before{
                background-color: #8362d9;
            }
        }
        li:nth-child(5n+4){
            background: linear-gradient(left, #b4d9fc, #8bc4fa);
            .div_company::before{
                background-color: #8bc4fa;
            }
        }
    }
    .div-page{
        text-align: center;
    }
}
</style>
