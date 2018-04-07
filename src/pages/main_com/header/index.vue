<template>
    <div class="header">
        <!-- logo -->
        <div class="logo" :style="{width:hideMenuText?'60px':'200px'}">
            <a href="#/home">
                <p v-if="!hideMenuText" class="expanded">{{loggTitle}}</p>
                <p v-else>{{loggTitleMin}}</p>
            </a>
        </div>
        <div class="top-nav-wrap">
            <!-- 收缩菜单 -->
            <div :style="{transform: 'rotateZ(' + (hideMenuText ? '-90' : '0') + 'deg)'}" class="navicon-con left hover" @click="toggleClick">
                <Button type="text">
                    <Icon type="navicon"></Icon>
                </Button>
            </div>
            <!-- 面包屑 -->
            <div class="bread">
                <Breadcrumb>
                    <BreadcrumbItem v-if="currentPath[1]">{{currentPath[1].title}}</BreadcrumbItem>
                    <BreadcrumbItem v-if="currentPath[2]" :to="currentPath[2].routerName">{{currentPath[2].title}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <p class="company">{{companyName}}</p>
            <!-- 工具 -->
            <ul class="right color-paint">
                <FullScreen class="liChild" v-model="isFullScreen"></FullScreen>
                <li class="hover theme liChild">
                    <Dropdown @on-click="themeClickItem" trigger="click" class="down">
                        <a href="javascript:void(0)">
                            <Icon type="paintbucket" :size="18"></Icon>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item, index) in themeList" :key="index" :name="item.name">
                                <Row type="flex" justify="center" align="middle">
                                    <span style="margin-right:10px;">
                                        <Icon :size="20" :type="item.name.substr(0, 1) !== 'b' ? 'happy-outline' : 'happy'" />
                                    </span>
                                    <span>
                                        <Icon :size="22" type="record" :color="item.element" />
                                    </span>
                                </Row>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
                <li class="hover last liChild">
                    <Dropdown trigger="click" @on-click="MenuClickItem" class="down">
                        <a href="javascript:void(0)">
                            <p class="radius">
                                <Icon class="person" type="person"></Icon>
                            </p>
                            <span> {{username}}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="outLogin">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { loggTitleMin, loggTitle } from "@/config/config.default.js";
import { logoText, logoTextMin } from "../../../../static/config.json";
export default {
  name: "header",
  data() {
    return {
      value: false,
      isFullScreen: false,
      loggTitleMin: logoTextMin,
      loggTitle: logoText
    };
  },
  created() {},
  computed: mapState({
    hideMenuText: state => state.menu.hideMenuText,
    currentPath: state => state.menu.currentPath,
    themeList: state => state.menu.themeList,
    username: state => state.users.users.name,
    companyName: state => state.defaults.companyName,
  }),
  methods: {
    toggleClick() {
      this.$store.commit("menu/hideMenuText");
    },
    async MenuClickItem(name) {
      if (name == "outLogin") {
        this.$store.dispatch("menu/logOutBtn");
      }
    },
    themeClickItem(name) {
      this.$store.commit("menu/theme", name);
    }
  }
};
</script>
<style lang="less">
@import "./index";
</style>
