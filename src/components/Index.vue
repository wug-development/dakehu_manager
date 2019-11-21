<template>
    <div class="index-box">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside style="width:260px;">
                    <Menu></Menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Header from './Common/Header.vue'
import Menu from './Common/Menu.vue'

export default {
    components: {
        Header,
        Menu,
    },
    created () {
        let logindata = sessionStorage.getItem('loginData')
        if (!logindata) {
            this.$router.push({
                path: '/'
            })
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/set.scss';
.index-box{
    width: 100%;
    height: 100%;
    .el-header{
        height: 84px !important;
        padding: 0;
    }
    .el-container{
        height: 100%;
        .el-aside{
            overflow: hidden;
        }
    }
    .el-main{
        height: 100%;
        background-color: $pubbgcolor;
    }
}
</style>
