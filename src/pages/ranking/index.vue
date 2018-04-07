<template>
    <div>
        <!-- 借阅量统计 -->
        <Card class="con-card">
            <h2 slot="title" class="font-center">
                图书借阅量统计图
            </h2>
            <Row>
                <Spin v-if="loading1" fix></Spin>
                <div>
                    <div class="min-height200" id="chart1"></div>
                </div>
            </Row>
        </Card>
        <br><br>
        <!-- 借阅量统计 -->
        <Card class="con-card">
            <h2 slot="title" class="font-center">
                图书借阅量统计
            </h2>
            <Table border :columns="columns" :data="data">
            </Table>
        </Card>
    </div>
</template>

<script>
import { Book } from "@/service";
import { readingInit } from "./charts/readingInit";
import columns from './columns'
export default {
  name: "Ranking",
  data() {
    return {
      dataSet: null,
      loading1: false,
      chart1: null,
      data: [],
      columns: columns.call(this)
    };
  },
  created() {
    this.dataSet = new DataSet();
    this.readingAmount();
  },
  methods: {
    async readingAmount() {
      let { data } = await Book.readingAmount();
      this.data = data;
      this.$nextTick(() => {
        this.chart1 = readingInit({ dataset: this.dataSet, data }, this);
      });
    }
  }
};
</script>

<style lang="less">
.no-bottom {
  padding-right: 300px;
  position: relative;
  .c-pull-right {
    position: absolute;
    width: 300px;
    padding: 10px;
    top: 0;
    right: 0;
    overflow: hidden;
    p {
      font-size: 14px;
      padding: 8px;
    }
  }
}
</style>
