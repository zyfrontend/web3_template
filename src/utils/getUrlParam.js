// JS`正则表达式`获取地址栏url参数：
export default function getUrlParam(name) {
  var reg = new RegExp('code=([0-9a-zA-Z]*)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) return unescape(r[1])
  return null // 返回参数值
}
// 调用方法
// var title = getUrlParam("title");
