/**
 * @function 延迟函数
 * @param second {number} 延迟间隔
 * @returns {Promise<any>}
 * @private
 */
function _delay(second = 4000) {
  // 延迟second
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve()
    }, second)
  })
}

/**
 * @function 递归函数
 * @param promise {Promise<any>}
 * @param resolve
 * @param reject
 * @param count {number} 第几次请求
 * @param totalCount {number} 请求次数
 * @private
 */
function _recursion(promise, resolve, reject, count, totalCount) {
  _delay().then(() => {
    promise()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (count >= totalCount) {
          reject(err)
          return
        }
        _recursion(promise, resolve, reject, count + 1, totalCount)
      })
  })
}

/**
 * @function 请求重试函数
 * @param promise {Promise<any>}
 * @param totalCount {number} 请求次数
 * @returns {Promise<any>}
 */
function requestTry(promise, totalCount) {
  return new Promise((resolve, reject) => {
    const count = 1
    promise()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        if (count >= totalCount) {
          reject(err)
          return
        }
        _recursion(promise, resolve, reject, count + 2, totalCount)
      })
  })
}

export default requestTry
