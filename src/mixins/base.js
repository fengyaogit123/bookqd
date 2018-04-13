//增删改查基础混合
export default {
    methods: {
        //分页change
        async pageChange(pageNo) {
            this.params.pageNo = pageNo;
            this.showList();
        },
        //重置search
        async reset(form) {
            form && form.resetFields();
        },
        //查询
        async search() {
            this.params.pageNo = 1;
            this.showList()
        },
        //多选
        async selectChange(rows) {
            this.rows = rows;
        },
        //删除多个
        async deletes(ids) {
            if ((!ids || ids.length == 0) && (!this.rows || this.rows.length == 0)) {
                return this.$Message.info("请选择删除的列表！")
            }
            this.$Modal.confirm({
                title: "提示",
                content: "是否确认删除？",
                onOk: async () => {
                    this.confirmDel(ids);
                },
                onCancel: () => {
                    this.cancelDel && this.cancelDel();
                }
            });
        },
    }
}