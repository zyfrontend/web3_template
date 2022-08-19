// 获取日期
export default function getDate() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = `0${month}`
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = year + month + strDate
  return currentdate
}
