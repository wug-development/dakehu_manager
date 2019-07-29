<template>
    <div class="userlist-box">
        <TopMenu></TopMenu>
        <SiteMap></SiteMap>
        <router-view/>
    </div>
</template>

<script>
import TopMenu from '@/components/Common/TopMenu'
import SiteMap from '@/components/Common/SiteMap.vue'
export default {
    name: 'UserList',
    components: {
        TopMenu,
        SiteMap
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.userlist-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .topmenu-box{
        margin-bottom: 20px;
    }
}
</style>
