<template>
    <div class="fy-upload">
        <div v-if="!showList ||isLoadImg" class="demo-upload-list" v-for="(item,index) in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="beforeURL+item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress status="active" stroke-width="6" v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload ref="upload" :headers="headers" :default-file-list="defaultList" :show-upload-list="showList" :on-success="handleSuccess" :format="format" :max-size="maxSize" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :multiple="multiple" type="drag" :name="name" :action="action" style="display: inline-block;width:58px;">
            <div v-if="isLoadImg" style="width: 58px;height:58px;line-height: 58px;padding-right:1px">
                <Icon type="camera" size="20"></Icon>
            </div>
            <slot></slot>
        </Upload>
        <Modal class="fy-upload-modal" :width="900" v-if="isLoadImg" top="5%" transfer title="查看大图" v-model="visible" @on-visible-change="visibleChange">
            <div style="width:100%">
                <Carousel class="img-carousel" v-if="Carvisible" v-model="imgIndex" loop>
                    <CarouselItem v-for="(item,index) in uploadList" :key="index">
                        <div class="img-wrap">
                            <img :src="beforeURL+item.url" style="width:100%">
                        </div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>
<script>
/**
 * @description 上传图片
 * @param {Array}  value 上传图片数组
 * @param {Boolean} multiple 是否多张上传
 * @param {String} beforeURL 默认显示文件路径前缀
 * @param {String} action 文件上传路径
 * @param {Boolean} showList 是否显示文件列表
 * @param {Array} format
 * @param {Number} maxSize 最大文件长度
 * @param {Number} maxFile 最大文件数量
 * @param {String} name 上传表单名称
 * @param {Boolean} isLoadImg 是否上传图片 (若为true 则包含查看图片,删除图片 图片列表的功能)
 *
 * @event success(File:file) 上传成功
 * @event remove(File:file) 删除成功 只删除本地文件
 * */
export default {
  name: "FyUpload",
  props: {
    value: {
      type: Array,
      default: []
    },
    multiple: {
      type: Boolean,
      default: true
    },
    isLoadImg: {
      type: Boolean,
      default: false
    },
    beforeURL: {
      type: String,
      default: ""
    },
    action: {
      type: String,
      default: "/api/v1/upload/image"
    },
    showList: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default: ["jpg", "jpeg", "png"]
    },
    maxSize: {
      type: Number,
      default: 800
    },
    maxFile: {
      type: Number,
      default: 5
    },
    name: {
      type: String,
      default: "Filedata"
    }
  },
  watch: {
    value(val) {
      this.defaultList = val;
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList;
      });
    }
  },
  data() {
    return {
      imgIndex: 0,
      visible: false,
      Carvisible: false,
      uploadList: [],
      defaultList: this.value
    };
  },
  methods: {
    visibleChange(flag) {
      if (flag == false) {
        setTimeout(() => {
          this.Carvisible = false;
        }, 200);
      }
    },
    /**查看图片 */
    handleView(imgIndex) {
      this.imgIndex = imgIndex;
      this.visible = true;
      this.Carvisible = true;
    },
    /**删除图片 */
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.$emit("input", this.uploadList.concat());
      this.$emit("remove", file);
    },
    handleSuccess(res, file) {
      file.url = res.url;
      file.name = "";
      this.$emit("input", this.uploadList.concat());
      this.$emit("success", file);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: `文件格式  ${file.name}  不正确，请选择${this.format.join("、")}`
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: `文件  ${file.name} 太大，不超过${this.maxSize}kb`
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < this.maxFile;
      if (!check) {
        this.$Notice.warning({
          title: "超出文件数量限制",
          desc: `最多可以上传${this.maxFile}个文件.`
        });
      }
      return check;
    }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style lang="less">
.fy-upload-modal {
  .ivu-modal-wrap {
    z-index: 1002;
  }
}
.fy-upload {
  .ivu-modal {
    top: 50px;
  }
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
}
.img-carousel {
  .img-wrap {
    height: 600px;
    background: #fff;
    overflow-y: auto;
    text-align: center;
  }
}
</style>