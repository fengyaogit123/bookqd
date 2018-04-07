<template>
    <div class="fy-search-header">
        <Row :gutter="16">
            <Form ref="form" :model="params" :label-width="labelWidth" label-position="left">
                <slot :open="isOpen" name="body"></slot>
            </Form>
        </Row>
        <Row>
            <div class="fy-pull-left">
                <slot name="action"></slot>
            </div>
            <div class="fy-search-footer fy-pull-right">
                <Button @click="$emit('search')" type="primary">查询</Button>
                <i class="fy-search-p-r"></i>
                <Button @click="$emit('reset',$refs.form)" type="ghost">重置</Button>
                <i class="fy-search-p-r"></i>
                <span @click="openBody" class="fy-search-header-open">
                    {{!isOpen?'展开':'收起'}}
                    <Icon :type="!isOpen?'chevron-down':'chevron-up'"></Icon>
                </span>
            </div>
        </Row>
    </div>
</template>

<script>
//可展开收起的查询布局组件
export default {
  name: "SearchBox",
  props: {
    formRef: {
      type: String,
      default: "form"
    },
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    params: String,
    labelWidth: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    openBody() {
      this.isOpen = !this.isOpen;
    },
    isOpenBox() {
      return this.$slots;
    }
  }
};
</script>

<style lang="less">
.fy-search-header {
  padding: 20px 0;
  .fy-search-header-open {
    color: #2d8cf0;
    cursor: pointer;
  }
  .fy-search-footer {
    text-align: right;
  }
  .fy-search-p-r {
    padding-right: 5px;
  }
  .fy-pull-left {
    float: left;
  }
  .fy-pull-right {
    float: right;
  }
}
</style>
