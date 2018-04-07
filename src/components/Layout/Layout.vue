<template>
    <div class="fy-layout" :style="{backgroundColor:bgColor}">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "fy-layout",
  props: {
    bgColor: String
  }
};
</script>

<style lang="less">
.fy-layout {
  padding:5px 15px;
  .card-title {
    line-height: 28px;
    font-size: 16px;
  }
}
</style>
