<style lang="less">
@import "./style.less";
</style>
<template>
    <div class="main">
        <!-- header -->
        <MainHeader />
        <!-- Menu -->
        <SidebarMenu />
        <div class="single-page-con" :class="{'single-page-sk':hideMenuText}">
            <!-- routers-tags -->
            <RouteBox />
            <div class="single-page">
                <keep-alive :include="cacheStr">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import { LOGOUT } from "@/utils/interface";
import QS from "querystring";
import { mapState } from "vuex";
import utils from "@/utils/utils";
let { storage } = utils;
import SidebarMenu from "@/pages/main_com/sidebarMenu/sidebarMenu";
import MainHeader from "@/pages/main_com/header/index.vue";
import RouteBox from "@/pages/main_com/routeBox/index.vue";
export default {
  name: "header",
  components: { SidebarMenu, MainHeader, RouteBox },
  computed: mapState({
    menu: state => state.menu.menus,
    hideMenuText: state => state.menu.hideMenuText,
    userName: state => state.users.userName,
    roleName: state => state.users.roleName,
    cacheStr(state) {
      return state.cache.cacheList.join(",");
    },
  }),
  created() {
  }
};
</script>

