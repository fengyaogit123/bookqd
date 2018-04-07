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
            title: "账号",
            key: "userName",
            align: "center",
        },
        {
            title: "姓名",
            key: "name",
            align: "center",
        },
        {
            title: "性别",
            key: "sex",
            align: "center",
        },
        {
            title: "权限",
            key: "isAdmin",
            align: "center",
            render: (h, { row }) => {
                return row.isAdmin ? <Tag type="dot" color="blue">管理员</Tag> : "读者"
            }
        },
        {
            title: "操作",
            align: "center",
            width: 200,
            render: (h, { row }) => {
                const editClick = () => {
                    this.modal.show = true;
                    this.modal.row = row;
                }
                const recordClick = () => {
                    this.$router.push({
                        name: 'Record',
                        query: { userId: row._id }
                    })
                }
                return (
                    <div>
                        <Button class="link" type="text" size="small" onClick={recordClick}>借阅记录</Button>
                        <Button class="link" type="text" size="small" onClick={editClick}>编辑</Button>
                        <Button class="link" type="text" size="small" onClick={() => this.deletes([row._id])}>删除</Button>
                    </div>
                )
            }
        }
    ]
}