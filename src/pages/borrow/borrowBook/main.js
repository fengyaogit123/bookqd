import { Book, Category, Press, User } from "@/service";
import dict from '@/mixins/dict'
export default {
    name: "BorrowBook",
    mixins: [dict],
    props: {
        modal: Object
    },
    watch: {
        "modal.show": {
            handler: function () {
                if (this.modal.show && this.modal.row) {
                    this.modal.row.isAdmin = this.modal.row.isAdmin + "";
                    let { category, press } = this.modal.row
                    return (this.params = {
                        ...this.params,
                        ...this.modal.row,
                        category: category ? category._id : '',
                        press: press ? press._id : ''
                    });
                }
                this.modal.row = null;
            },
            immediate: true
        }
    },
    data() {
        return {
            params: this.initData(),
            categoryList: [],
            pressList: [],
            loading: false,
            users: [],
            userId: "",
            rules: {
                userId: { type: "string", required: true, message: "必填项" },
                _id: { type: "string", required: true, message: "必填项" },
                borrowStatus: { type: "string", required: true, message: "必填项" },
            }
        };
    },
    created() {
        this.getCategoryAll();
        this.getPressAll();
    },
    methods: {
        initData() {
            return {
                _id: undefined,
                name: "",
                category: "",
                press: "",
                author: "",
                stock: "",
                desc: "",
                borrowStatus: "0",
                userId: "",
            };
        },
        async remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                try {
                    let { data } = await User.get({
                        name: query,
                        pageNo: 1,
                        size: 20
                    })
                    this.loading = false;
                    this.users = data.rows || [];
                } catch (e) {
                    this.loading = false;
                }
            }
        },
        async modalOk() {
            let validate = await this.$refs.form.validate();
            if (!validate) return;
            if (this.params.borrowStatus != 1) {
                await this.borrow();
            } else {
                await this.book();
            }
            this.$Message.success("提交成功！");
            this.initModal("ok");
        },
        //借书
        async borrow() {
            let { data } = await Book.borrow(this.$QS.stringify({
                _id: this.params._id,
                borrowStatus: 1,
                userId:this.params.userId
            }));
        },
        //还书
        async book() {
            let { data } = await Book.borrow(this.$QS.stringify({
                _id: this.params._id,
                borrowStatus: 0,
                userId:this.params.userId
            }));
        },

        cancel() {
            this.initModal("cancel");
        },
        initModal(type) {
            this.params = this.initData();
            this.modal.show = false;
            this.$refs.form.resetFields();
            this.$emit(type);
        }
    }
};