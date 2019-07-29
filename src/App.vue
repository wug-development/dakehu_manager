<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
@import './assets/sass/public.scss';
@import './assets/sass/set.scss';
#app {
    height: 100%;
}
</style>
