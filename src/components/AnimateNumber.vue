<template>
    <component :is="tag" ref="number" class="fy-number">
        0
    </component>
</template>
<script>
import Velocity from "velocity-animate";
/**
 * @param {tag} String 渲染组件
 * @param {before} String 前缀
 * @param {after} String 后缀
 * @param {value} Number 值
 * @param {duration} Number 过渡时间
 * @param {fixed} Number 保留小数
 *  */
export default {
  name: "AnimateNumber",
  props: {
    tag:{
        type:String,
        default:'span'
    },  
    before: {
      type: String,
      default: ""
    },
    after: {
      type: String,
      default: ""
    },
    value: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2000
    },
    fixed: {
      type: Number,
      default: 0
    }
  },
  created() {},
  watch: {
    value: {
      handler: function(val, oldVal) {
        this.$nextTick(() => {
          this.progress();
        });
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    progress() {
      let dom = this.$refs.number;
      let duration = this.duration;
      let fixed = this.fixed;
      Velocity(
        dom,
        {
          opacity: 1
        },
        {
          duration,
          progress: (elements, complete, remaining, start, tweenValue) => {
            dom.innerHTML =
              this.before +
              this.moneySplit((complete * this.value).toFixed(fixed)) +
              this.after;
          }
        }
      );
    },
    moneySplit(value) {
      if (typeof value === "string" || typeof value === "number") {
        return value.toString().replace(/\d(?=(?:\d{3})+\b)/g, "$&,");
      }
      return "0";
    }
  }
};
</script>

<style>
.fy-number {
  font-size: inherit;
}
</style>
