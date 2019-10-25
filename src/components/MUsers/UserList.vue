<template>
    <div class="userlist-box">
        <TopMenu></TopMenu>
        <router-view/>
    </div>
</template>

<script>
import TopMenu from '@/components/Common/TopMenu'
export default {
    name: 'UserList',
    components: {
        TopMenu
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
.userlist-box{
    display: flex;
    flex-direction: column;
    .topmenu-box{
        margin-bottom: 20px;
    }
}
</style>
