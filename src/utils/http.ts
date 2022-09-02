// const BASE_URL = "";
interface optionsType {
  url: string
  method?: string
  data?: any
}
interface customOptionsType {
  loading?: boolean
  message?: boolean
}

export const http = (options: optionsType, customOptions: customOptionsType): Promise<RetType> => {
  // 自定义配置
  // eslint-disable-next-lint camelcase
  const custom_options = Object.assign(
    {
      loading: false, // 是否开启loading层效果, 默认为false
      message: false // 是否使用后端返回 message, 默认为false
    },
    customOptions
  )
  /**
   * 加载动画
   * */
  // 开始加载
  function startLoading() {
    // eslint-disable-next-line camelcase
    custom_options.loading
      ? uni.showLoading({
          mask: true
        })
      : ''
  }
  startLoading()

  // 结束加载
  function endLoading() {
    uni.hideLoading()
  }

  // 提示信息
  function Toast(params: any) {
    // eslint-disable-next-line camelcase
    custom_options.message
      ? uni.showToast({
          icon: params.name,
          title: params.msg
        })
      : ''
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: options.url, //接收请求的API
      method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
      data: options.data || {}, //接收请求的data,不传默认为空
      timeout: 100000,
      header: {
        'Content-Type': 'application/json',
        'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
      },
      success: response => {
        switch (response.data.code || response.data.data.code) {
          case 400:
            reject(response)
            break
          case 200:
            resolve(response)
            break
          case 401:
            reject(response)
            break
          case 405:
            resolve(response)
            break
          case 500:
            reject(response)
            break
          default:
            resolve(response)
        }
      },
      fail: err => {
        endLoading()
        reject(err)
      },
      complete: () => {
        //  关闭加载动画
        endLoading()
      }
    })
  })
}
