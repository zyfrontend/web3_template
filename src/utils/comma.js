// export default function toThousands(num) {
//   return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
// }

export default function paddingNum(num) {
  let logo = '' //用于记录是正值还是负值
  if (num < 0) {
    logo = '-'
    num = -num //将负数转正,如果不转正，则下面获取它的length时，会由于有个负号，使得长度+1，最终加逗号位置出错
  }

  const result = num.toString().split('') //将数字转化为了数组，便于使用数组中的splice方法插入逗号
  let position = result.indexOf('.') //获取小数点的位置，根据有无小数点确定position最终值进入添加逗号环节
  position = position !== -1 ? (position -= 1) : result.length //因为只需考虑整数部分插入逗号，所以需要考虑有没有逗号。有逗号则不等于-1，减去逗号位置，则是下标0~position就是整数部分；若不是小数，则num原本就是整数，直接取其length即可
  while (position > 2) {
    //只要下标值大于2，说明前面还可以插入“,”，则继续循环
    position -= 3 //下标前移3位，然后在这个下标对应的元素后面插入逗号
    result.splice(position + 1, 0, ',')
  }
  return logo + result.join('') //数组转换为字符串,前面+logo，若为负数则拼接个符号，否则拼接空字符
}
