// 获取日期
export default function getDate(date: string) {
  if (date === null) {
    return
  }
  // 1.转数组
  const arr = date.split(' ')
  const arr1 = arr[0].split('-')
  return arr1.join('')
}
