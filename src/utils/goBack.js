// 返回上一页
export default function goBack(second = 0, save) {
  setTimeout(() => {
    let source = uni.getStorageSync('source')
    if (!source) {
      source = '/'
    }
    if (!save || !source) {
      history.back()
    }
    if (source) {
      uni.redirectTo({
        url: source,
        success() {
          uni.removeStorageSync('source')
        },
        fail() {
          console.log('跳转失败,尝试Tab跳转,url: ' + source)
          uni.switchTab({
            url: source,
            success() {
              uni.removeStorageSync('source')
            },
            fail() {
              console.log('Tab跳转失败,url: ' + source)
            }
          })
        }
      })
    }
  }, second * 1000)
}
