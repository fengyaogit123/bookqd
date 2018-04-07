import { Book, Category, Press } from "@/service";
export default {
    methods: {
        async getCategoryAll() {
            let { data } = await Category.getAll();;
            this.categoryList = data.rows;
        },
        async getPressAll() {
            let { data } = await Press.getAll();;
            this.pressList = data.rows;
        },
    }
}