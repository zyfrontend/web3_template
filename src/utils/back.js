export default function backRouter() {
  /* uni.navigateBack({
    delta: 1
  }) */
  // @zxyuns 处理兼容，如果没有上一级界面则返回首页
  const pages = getCurrentPages()
  if (pages.length === 2) {
    uni.navigateBack({
      delta: 1
    })
  } else if (pages.length === 1) {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  } else {
    uni.navigateBack({
      delta: 1
    })
  }
}
