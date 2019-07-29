<template>
    <div class="pressmoney-box">
        <SiteMap></SiteMap>
        <ul class="xuser-list">
            <li v-for="(item, i) in dataList" :key="i">
                <div class="title">{{item.name}}<span>({{item.val}})</span></div>
                <div class="count-money">
                    <span>结算金额：</span>
                    <div>&yen;{{item.price}}</div>
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
    name: 'PressMoney',
    data () {
        return {
            dataList: [{

            }]
        }
    },
    components: {
        SiteMap
    },
    created () {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({
                name: 'G光景瑞星文化',
                val: 5555,
                price: 104555
            })
        }
        this.dataList = arr
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.pressmoney-box{
    .xuser-list{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 284px;
            height: 174px;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 2px 2px 5px #ddd;
            background: url('../../assets/images/bg_cards.png') no-repeat right bottom;
            background-color: #e74e3c;
            color: #fff;
            margin: 0 30px 60px 0; 
            .title{
                padding-top: 5px;
                padding-left: 20px;
                height: 45px;
                line-height: 40px;
                font-size: 16px;
                border-bottom: 1px solid rgba(255,255,255, 0.2);
                box-sizing: border-box;
                span{
                    color: #fabc6b;
                }
            }
            .count-money{
                padding-left: 20px;
                padding-top: 20px;
                box-sizing: border-box;
                div{
                    font-size: 24px;
                }
            }
        }
        li:nth-child(10n+1){ background-color: #e74e3c; }
        li:nth-child(10n+2){ background-color: #19be9c; }
        li:nth-child(10n+3){ background-color: #9b58b5; }
        li:nth-child(10n+4){ background-color: #439fde; }
        li:nth-child(10n+5){ background-color: #ffa799; }
        li:nth-child(10n+6){ background-color: #3598db; }
        li:nth-child(10n+7){ background-color: #f09626; }
        li:nth-child(10n+8){ background-color: #66d240; }
        li:nth-child(10n+9){ background-color: #da5cae; }
        li:nth-child(10n+10){ background-color: #8ac3fa; }
    }
    .div-page{
        text-align: center;
    }
}
</style>
