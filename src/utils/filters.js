import Vue from 'vue';
function toText(str) {
    if (typeof str !== "string") return "";
    return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}
function toDate(value) {
    if (!value) return "";
    const TODAY = +new Date();
    const MIN = 60 * 1000; //分钟
    const HOUR = 60 * MIN; //小时
    const DAY = 24 * HOUR; //一天
    const WEEK = 7 * DAY; //一周
    const MONTH = 30 * DAY; //一月
    let time = +new Date(value); //时间
    //小时
    if (TODAY - time < MIN) {
        return "刚刚";
    }
    if (TODAY - time < HOUR) {
        return parseInt((TODAY - time) / MIN) + " 分钟前";
    }
    if (TODAY - time < DAY) {
        return parseInt((TODAY - time) / HOUR) + " 小时前";
    }
    if (TODAY - time < WEEK) {
        return parseInt((TODAY - time) / DAY) + " 天前";
    }
    if (TODAY - time < MONTH) {
        return parseInt((TODAY - time) / WEEK) + " 周前";
    }
    if (TODAY - time >= MONTH) {
        return new Date(value).Format("yyyy-MM-dd");
    }
}

Vue.filter('toText',toText)
Vue.filter('toDate',toDate)