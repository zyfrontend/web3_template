// 获取参数
export default function getQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  if (window.location.href.split('?').length > 1) {
    const r = window.location.href.split('?')[1].match(reg)
    if (r != null) return unescape(r[2])
    return null
  }
  return false
}
