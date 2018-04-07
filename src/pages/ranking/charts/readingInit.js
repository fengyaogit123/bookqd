// 图书借阅量统计图
export function readingInit({ data, dataset },ctx) {
    let source = dataset.createView('reading').source(data);
    let chart = new G2.Chart({
        container: "chart1",
        forceFit: true,
        height: 250
    });
    chart.source(source);
    Bar(chart)
    return chart
}
export function Bar(chart, clear) {
    clear && chart.clear();
    chart.interval().position('name*borrowTotal').color('name')
    chart.render();
}