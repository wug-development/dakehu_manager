<template>
    <div class="pressmoney-box">
        <SiteMap></SiteMap>
        <ul class="company-list">
            <li v-for="(item, i) in datalist" :key="i">
                <div>
                    <div class="div_company el-icon-s-home">{{item.name}}</div>
                    <div class="div_date">最后出票日：{{item.lastdate}}</div>
                </div>
            </li>
        </ul>
        <div class="div-page" v-if="pageCount > 1">
            <el-pagination background layout="prev, pager, next" :page-size="pageNum" @current-change="handleCurrentChange" :total="pageCount"></el-pagination>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'
export default {
    name: 'Pressmoney',
    data () {
        return {
            page: 1,
            pageNum: 15,
            pageCount: 1,
            datalist: []
        }
    },
    components: {
        SiteMap
    },
    methods: {
        handleCurrentChange: function (v) {
            this.page = v
            this.getList()
        }
    },
    created () {
        this.$http.get(this.apis + '/api/company/getnotpurchased', {params: {
            page: this.page,
            pagenum: this.pageNum,
        }})
        .then(res => {
            if (res && res.data && res.data.status != 0) {
                this.datalist = res.data.data.data
                if (res.data.data.pagecount) {
                    this.pageCount = res.data.data.pagecount
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.pressmoney-box{
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
            background: linear-gradient(to left, #abdbe6, #7ac6d7);
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
            background: linear-gradient(to left, #abdbe6, #7ac6d7);
            .div_company::before{
                background-color: #7ac6d7;
            }
        }
        li:nth-child(5n+2),li:nth-child(5n+5){
            background: linear-gradient(to left, #ffc6bd, #ffa89a);
            .div_company::before{
                background-color: #ffa89a;
            }
        }
        li:nth-child(5n+3){
            background: linear-gradient(to left, #d7ccf3, #8362d9);
            .div_company::before{
                background-color: #8362d9;
            }
        }
        li:nth-child(5n+4){
            background: linear-gradient(to left, #b4d9fc, #8bc4fa);
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