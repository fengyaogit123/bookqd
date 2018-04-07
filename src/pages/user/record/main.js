import { Borrow } from "@/service";
import columns from "./columns";
import { stringify } from "querystring";
import base from '@/mixins/base'
export default {
    name: "Resou",
    mixins: [base],
    data() {
        return {
            loading: false,
            data: [],
            count: 0,
            params: {
                pageNo: 1, //当前页
                size: 20,
                userId: "",
                borrowStatus:"1"
            },
            rows: [],
            columns: columns.call(this),
            modal: {
                show: false,
                row: null,//编辑的对象
            }
        };
    },
    created() {
        this.params.userId = this.$route.query.userId;
        this.showList();
    },
    methods: {
        async addrow() {
            this.modal.show = true;
        },
        async showList() {
            const { data } = await Borrow.get({
                ...this.params,
            });
            let { rows = [], count } = data;
            this.data = rows;
            this.count = count;
            this.$Message.success("加载完成");
        },
    }
};