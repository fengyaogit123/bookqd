<template>
    <div class="fy-block" :style="{'text-align':align}">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: "fy-layout",
  props: {
    bgColor: String,
    align:String,
  }
};
</script>

<style lang="less">
.fy-block {
    padding:15px;
}
</style>
