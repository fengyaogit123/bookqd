<template>
    <div id="app-box" :class="theme">
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "app",
  computed: mapState({
    theme(state) {
      let { theme } = state.menu;
      return {
        [theme]: true
      };
    }
  })
};
</script>
<style lang="less">
@import "./styles/index.less";
#app-box {
  width: 100%;
  height: 100%;
}
</style>
