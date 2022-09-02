import http from '@/utils/Request'
// 配置信息
export function getInformation() {
  return http.request({
    url: '/api/common/config',
    method: 'GET'
  })
}

// 登录
export function userLogin(data) {
  return http.request({
    url: '/api/common/login',
    method: 'POST',
    data
  })
}

export function getUserInfo() {
  return http.request({
    url: '/api/user/userInfo',
    method: 'GET'
  })
}

export function apply(data) {
  return http.request({
    url: '/api/user_withdraw/apply',
    method: 'POST',
    data
  })
}

export function outputPay(data) {
  return http.request({
    url: '/api/order/outputPay',
    method: 'POST',
    data
  })
}
export function switchLanguage(data) {
  return http.request({
    url: '/api/common/language',
    method: 'POST',
    data
  })
}
