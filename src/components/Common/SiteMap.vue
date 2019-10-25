<template>
    <div class="sitemap-box">
        <div> 当前位置：</div>
        <div class="site-labels">
            <span v-for="(item, i) in maplist" :key="i" :class='(i > 0 ? "el-icon-arrow-right" : "") + (maplist.length - 1 == i? " cur" : "")'>
                <i>{{item.name}}</i>
                <template v-if='maplist.length-1 == i && i > 0'><label class="el-icon-close" @click="closeCurrent"></label></template>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SiteMap',
    data () {
        return {
            maplist: []
        }
    },
    methods: {
        closeCurrent: function () {
            this.$router.push({
                path: this.maplist[this.maplist.length-2].path
            })
            this.$store.state.topmenu = 'index'
        }
    },
    created () {
        let arr = this.$route.matched
        let obj = []
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].name) {
                obj.push({
                    name: arr[i].name,
                    path: arr[i].path
                })
            }
        }
        this.maplist = obj
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.sitemap-box{
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    margin-bottom: 20px;
    font-size: 16px;
    .site-labels{
        display: flex;
        span{
            margin: 0 5px;
            cursor: pointer;
            line-height: 22px;
            .el-icon-close{
                display: none;
                position: absolute;
                right: -14px;
                top: -4px;
                font-size: 12px;
                color: #fff;
                width: 16px;
                height: 16px;
                padding-top: 2px;
                text-align: center;
                border-radius: 20px;
                transform: scale(0.7);
                box-sizing: border-box;
                cursor: pointer;
            }
            i{
                font-style: normal;
            }
            i:hover{
                text-decoration: underline;
            }
        }
        .cur{
            position: relative;
            color: $pubcolor;
            .el-icon-close{
                display: block;
                background-color: $pubcolor;
            }
        }
        .cur::before{
            color: #000;
            margin-right: 5px;
        }
    }
}
</style>
