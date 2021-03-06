import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
    baseUri: 'http://www.roseonly.com.cn',
    menu: true,
    menuCur: 'index',
    openID: '',
    siteMap: ['首页'],
    topmenu: 'index',
    selCompany: {}
}

const getters = {
    getBaseUri () {
        return state.baseUri
    },
    getMenu () {
        return state.menu
    },
    getMenuCur () {
        return state.menuCur
    },
    getOpenID () {
        return state.openID
    },
    getSiteMap () {
        return state.siteMap
    },
    getTopMenu () {
        return state.topmenu
    },
    getSelCompany () {
        return state.selCompany
    }
}

const mutations = {
    setBaseUri (v) {
        state.baseUri = v
    },
    isShowHideMenu (v) {
        state.menu = v
    },
    setMenuCur (v) {
        state.menuCur = v
    },
    setOpenID (v) {
        state.openID = v
    },
    setSiteMap (v) {
        state.siteMap = v
    },
    setTopMenu (v) {
        state.topmenu = v
    },
    setSelCompany (v) {
        state.selCompany = v
    }
}

const actions = {
    setBaseUri (context, v) {
        context.commit('setBaseUri', v)
    },
    setMenu (context, v) {
        context.commit('isShowHideMenu', v)
    },
    setMenuCur (context, v) {
        context.commit('setMenuCur', v)
    },
    setOpenID (context, v) {
        context.commit('setOpenID', v)
    },
    setSiteMap (context, v) {
        context.commit('setSiteMap', v)
    },
    setTopMenu (context, v) {
        context.commit('setTopMenu', v)
    },
    setSelCompany (context, v) {
        context.commit('setSelCompany', v)
    }
}

const plugins = [createPersistedstate()]

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins
})

export default store
