import router from "@/router";
export default function () {
    return [
        {
            title: "状态",
            align: "center",
            render: (h, { row }) => {
                let text = row.borrowStatus == 1 ? '借阅中' : '已还书'
                let type = row.borrowStatus == 1 ? 'blue' : 'green'
                return (
                    <Tag checkable color={type}>{text}</Tag>
                )
            }
        },
        {
            title: "书籍名称",
            align: "center",
            render: (h, { row }) => {
                return row.book.name
            }
        },
        {
            title: "作者",
            align: "center",
            render: (h, { row }) => {
                return row.book.author
            }
        },
        {
            title: "时间",
            align: "center",
            render: (h, { row }) => {
                return new Date(row.createdAt).Format('yyyy-MM-dd hh:mm:ss')
            }
        },
        {
            title: "用户姓名",
            align: "center",
            render: (h, { row }) => {
                return <Tag checkable color="default">{row.user.name}</Tag>
            }
        },
        {
            title: "性别",
            align: "center",
            render: (h, { row }) => {
                return row.user.sex
            }
        }
    ]
}