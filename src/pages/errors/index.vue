<template>
    <div class="page-error">
        <div class="error-img">
        </div>
        <div class="error-body">
            <div class="error-wrap">
                <h1>{{status}}</h1>
                <p>{{errors[status]}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "errors",
  data() {
    return {
      status: 404,
      errors: {
        [404]: "抱歉，你访问的页面不存在"
      }
    };
  }
};
</script>

<style lang="less">
.page-error {
  height: 100%;
  position: relative;
  .error-img {
    height: 360px;
    width: 100%;
    max-width: 430px;
    position: absolute;
    top: 50%;
    margin-top: -180px;
    left: 30px;
    background-image: url("../../../static/imgs/error.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  .error-body {
    float: right;
    width: 300px;
    height: 100%;
    text-align: left;
    position: relative;
    .error-wrap {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      h1 {
        color: #434e59;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      p {
        color: rgba(0, 0, 0, 0.45);
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
