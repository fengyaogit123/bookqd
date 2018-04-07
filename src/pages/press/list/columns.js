import router from "@/router";
export default function () {
    return [
        {
            type: "selection",
            width: 60,
            align: "center"
        },
        {
            title: "_id",
            width: 200,
            key: "_id",
            align: "center"
        },
        {
            title: "名称",
            key: "name",
            align: "center",
        },
        {
            title: "操作",
            align: "center",
            width: 150,
            render: (h, { row }) => {
                const editClick = () => {
                    this.modal.show = true;
                    this.modal.row = row;
                }
                return (
                    <div>
                        <Button class="link" type="text" size="small" onClick={editClick}>编辑</Button>
                        <Button class="link" type="text" size="small" onClick={() => this.deletes([row._id])}>删除</Button>
                    </div>
                )
            }
        }
    ]
}