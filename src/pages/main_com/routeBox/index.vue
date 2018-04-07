<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="route-box">
        <div class="route-close">
            <Dropdown trigger="click" transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    <span>标签操作</span>
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="closeAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" :style="{left: tagBodyLeft + 'px'}" class="route-inner-scroll">
            <transition-group tag="div" name="taglist-moving-animation">
                <Tag ref="tagsPageOpened" @click.native="toPage(page)" @on-close="closeHandler(page)" v-for="(page,index) in pageList" :key="index" :name="page.name" type="dot" class="no-select" :closable="page.name!=root.name" :color="currPageName==page.name?'blue':'default'">
                    {{page.title}}
                </Tag>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tagBodyLeft: 0,
      refsTag: [],
      tagsCount: 1
    };
  },
  computed: mapState({
    pageList: state => state.menu.pageList,
    currPageName: state => state.menu.currPageName,
    root: state => state.menu.root,
    tagsList(state) {
      return state.menu.pageList;
    }
  }),
  methods: {
    closeHandler({ name }) {
      this.$store.commit("menu/deletePageList", name);
    },
    toPage({ name }) {
      this.$store.commit("menu/toPage", name);
    },
    handleTagsOption(name) {
      if (name == "closeAll") {
        this.$store.commit("menu/pageColoseAll", name);
      } else if (name == "clearOthers") {
        this.$store.commit("menu/pageClearOthers");
      }
      this.tagBodyLeft = 0;
    },
    handlescroll(e) {
      let { type } = e;
      let delta = 0;
      let left = 0;
      if (type == "DOMMouseScroll" || type == "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                100
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        );
      }
    }
  },
  mounted() {
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length;
  },
  watch: {
    $route(to) {
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
      this.tagsCount = this.tagsList.length;
    }
  }
};
</script>

<style lang="less">
@import "./index";
</style>
