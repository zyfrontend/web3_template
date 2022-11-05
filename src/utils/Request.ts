import Request, { HttpResponse, HttpRequestConfig, HttpError } from 'luch-request'
const BASE_API = 'https://depm.api.tianyantu.com'
const http = new Request({
  baseURL: BASE_API, //设置请求的base url
  timeout: 300000, //超时时长5分钟,
  header: {
    'Content-Type': 'application/json',
    'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
  }
})
//请求拦截器
http.interceptors.request.use(
  (config: HttpRequestConfig) => {
    // 拦截添加token
    config.header = {
      'x-token': uni.getStorageSync('x-token') ? uni.getStorageSync('x-token') : ''
    }
    return config
  },
  (error: any) => {
    return Promise.resolve(error)
  }
)

// 响应拦截器
http.interceptors.response.use(
  (response: HttpResponse) => {
    switch (response.config.method) {
      case 'GET':
        return formatData(response.data)
      case 'POST':
        // 登录接口保存token
        if (response.config.url === '/api/common/login') {
          uni.setStorageSync('x-token', response.data.data['x-token'])
          return formatData(response.data)
        } else if (response.config.url === '/api/user_withdraw/apply') {
          return formatData(response)
        }
        return formatData(response.data)

      default:
        return formatData(response.data)
    }
  },
  (error: HttpError) => {
    console.log('响应拦截器错误捕获', error)
    return Promise.resolve(error)
  }
)

function formatData(data: any) {
  switch (data.code) {
    case 200:
      return data.data
    case 400:
      uni.showToast({
        title: data.msg,
        icon: 'none'
      })
      return Promise.reject(data)
    case 401:
      uni.showToast({
        title: data.msg,
        icon: 'none'
      })
      return Promise.reject(data)
    case 405:
      // 一般是交易查询不到
      return Promise.reject(data)
    default:
      return data
  }
}
export default http
