import router from "@/router";
export default function () {
    return [
        {
            type: "selection",
            width: 60,
            align: "center"
        },
        {
            title: "书名",
            key: "name",
            align: "center",
        },
        {
            title: "借阅状态",
            key: "borrowStatus",
            align: "center",
            width: 140,
            render: (h, { row }) => {

                return row.borrowStatus ?
                    <Tag type="dot" color="red">已借出</Tag>
                    : <Tag type="dot" color="green">未借出</Tag>
            }
        },
        {
            title: "类别",
            key: "category",
            align: "center",
            render: (h, { row }) => {
                return row.category && row.category.name || ""
            }
        },
        {
            title: "出版社",
            key: "press",
            align: "center",
            render: (h, { row }) => {
                return row.press && row.press.name || ""
            }
        },
        {
            title: "作者",
            key: "author",
            align: "center",
        },
        {
            title: "上架时间",
            key: "createdAt",
            align: "center",
            render: (h, { row }) => {
                return new Date(row.createdAt).Format('yyyy-MM-dd')
            }
        },
        {
            title: "操作",
            align: "center",
            width: 100,
            render: (h, { row }) => {
                const editClick = () => {
                    this.modal.show = true;
                    this.modal.row = row;
                }
                const status = row.borrowStatus;
                return (
                    <div>
                        {status ? <Button class="link" type="text" size="small" onClick={editClick}>还书</Button> : null}
                        {!status ? <Button class="link" type="text" size="small" onClick={editClick}>借书</Button> : null}
                    </div>
                )
            }
        }
    ]
}