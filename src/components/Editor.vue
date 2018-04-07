<template>
    <div>
        <div :id="id">

        </div>
    </div>
</template>

<script>
import XSS from "xss";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      id: `$editor-${new Date().getTime()}`
    };
  },
  props: {
    defaultBody: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    defaultBody(val) {
      if (!this.editor) {
        this.$nextTick(() => {
          this.init();
        });
        return;
      }
      this.$nextTick(() => {
        this.editor.txt.html(this.defaultBody || "");
      });
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const Editor = window.wangEditor;
      if (!Editor) {
        throw new Error("wangEditor is not undefined!");
      }
      if (this.editor) return;
      const dom = document.getElementById(this.id);
      this.editor = new Editor(dom); // 初始化UE
      this.editor.customConfig.uploadImgServer = "/api/v1/upload/editor";
      this.editor.create();
      this.editor.txt.html(this.defaultBody || "");
    },
    get() {
      return this.editor;
    },
    html() {
      if (!this.editor) {
        throw new Error("wangEditor is not undefined!");
      }
      return XSS(this.editor.txt.html());
    },
    text() {
      if (!this.editor) {
        throw new Error("wangEditor is not undefined!");
      }
      return XSS(this.editor.txt.text());
    }
  },
  beforeDestroy() {
    this.editor = null;
  }
};
</script>

<style>
.w-e-text-container {
  min-height: 600px;
}
</style>
