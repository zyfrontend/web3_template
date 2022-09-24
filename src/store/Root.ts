// 第三方包
import { defineStore } from 'pinia'
// import { Toast } from 'vant'
// hooks
// import useStatus from '@/hooks/useStatus'

// web3
import { connectWeb3 } from '@/web3'

// 网络请求
import { getInformation, userLogin, switchLanguage } from '@/request/api'
// import { languageType } from '@/request/types'

// 工具
import { md5, getDate, getQueryString, textOmit } from '@/utils'
import { Approve } from '@/business'
// type typescript
// import * as web3Types from '@/types/web3.types'
import * as apiTypes from '@/types/api.types'
import * as RootTypes from '@/types/Root.types'
// const { currentLanguage } = useStatus()
export const useRootStore = defineStore('Root', {
  state: () => {
    return {
      address: '',
      information: '',
      languageList: '',
      defaultLanguage: ''
    }
  },
  getters: {
    userAddress(state) {
      return textOmit(state.address, 8, 8)
    },
    loginStatus(state) {
      return state.address ? '已连接到钱包' : '未连接到钱包'
    }
  },
  actions: {
    // 连接钱包
    async connectWalletAction(data: RootTypes.connectWalletActionTypes) {
      const { selfConfig, dateTime } = data
      this.address = await connectWeb3({
        ...selfConfig
      })
      // 用户进行登录
      await userLogin({
        address: this.address,
        sign: md5(`${this.address}.${getDate(dateTime)}`).substring(0, 10),
        code: getQueryString('code')
      })
    },
    // 获取配置信息
    async getInformationAction() {
      const res = await getInformation()
      console.log(res)
      // this.information = res
      // this.languageList = res.language.langs
      // this.defaultLanguage = res.language.default
      // if (!uni.getStorageSync('language')) {
      //   currentLanguage.value = res.language.default
      //   uni.setStorageSync('language', res.language.default)
      // }
      // 网站开关
      // const status = res.config.base.web_status
      // if (Number(status) !== 1) {
      //   uni.reLaunch({
      //     url: '/pages/error/unobstructed',
      //   })
      // }
      // 进行返回以便接收
      return res
    },

    // 语言切换

    async switchLanguageAction(data: apiTypes.languageTypes) {
      await switchLanguage(data)
    }
  }
})
