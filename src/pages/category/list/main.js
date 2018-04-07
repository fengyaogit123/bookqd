import { Category } from "@/service";
import columns from "./columns";
import base from '@/mixins/base'
export default {
    name: "Category",
    mixins: [base],
    components: {
        NewRow: () => import('../newRow/index.vue')
    },
    data() {
        return {
            loading: false,
            data: [],
            count: 0,
            params: {
                pageNo: 1, //当前页
                size: 20,
                name:""
            },
            rows: [],
            columns: columns.call(this),
            modal: {
                show: false,
                row:null,//编辑的对象
            }
        };
    },
    created() {
        this.showList();
    },
    methods: {
        async addrow() {
            this.modal.show = true;
        },
        async showList() {
            const { data } = await Category.get({
                ...this.params,
            });
            let { rows = [], count } = data;
            this.data = rows;
            this.count = count;
            this.$Message.success("加载完成");
        },
        async confirmDel(ids) {
            let { data } = await Category.delete({
                ids: ids || this.rows.map(({ _id }) => _id)
            });
            this.$Message.success("删除成功！");
            this.showList();
        },

    }
};