import { Book } from "@/service";
import columns from "./columns";
import { stringify } from "querystring";
import base from '@/mixins/base'
import dict from '@/mixins/dict'
export default {
    name: "Book",
    mixins: [base, dict],
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
                category: "",
                name: "",
                press: "",
                author: "",
                createdAt: "",
                borrowStatus:""
            },
            rows: [],
            columns: columns.call(this),
            categoryList: [],
            pressList: [],
            modal: {
                show: false,
                row: null,//编辑的对象
            },
        };
    },
    created() {
        this.showList();
        this.getCategoryAll();
        this.getPressAll();
    },
    methods: {
        async addrow() {
            this.modal.show = true;
        },
        async showList() {
            let { createdAt } = this.params;
            createdAt = createdAt ? new Date(this.params.createdAt).Format('yyyy-MM-dd') : ""
            const { data } = await Book.get({
                ...this.params,
                createdAt
            });
            let { rows = [], count } = data;
            this.data = rows;
            this.count = count;
            this.$Message.success("加载完成");
        },
        async confirmDel(ids) {
            let { data } = await Book.delete({
                ids: ids || this.rows.map(({ _id }) => _id)
            });
            this.$Message.success("删除成功！");
            this.showList();
        },

    }
};