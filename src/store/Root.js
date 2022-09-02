// 第三方包
import { defineStore } from 'pinia'
import { Toast } from 'vant'
// hooks
import useLanguage from '@/hooks/useLanguage'

// web3
import { connectWeb3, getTransaction, writeContract, Web3 } from '@/web3'

// 网络请求
import { getInformation, userLogin, switchLanguage } from '@/request/api'
import { languageType } from '@/request/types'

// 工具
import { md5, getDate, getQueryString, textOmit } from '@/utils'
const { currentLanguage } = useLanguage()
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
    async connectWalletAction(data) {
      const selfConfig = data.chain.self_config
      this.address = await connectWeb3({
        ...selfConfig
      })
      // 用户进行登录
      await userLogin({
        address: this.address,
        sign: md5(`${this.address}.${getDate()}`).substring(0, 10),
        code: getQueryString('code')
      })
    },
    // 获取配置信息
    async getInformationAction() {
      const res = await getInformation()
      this.information = res
      this.languageList = res.language.langs
      this.defaultLanguage = res.language.default
      if (!uni.getStorageSync('language')) {
        currentLanguage.value = res.language.default
        uni.setStorageSync('language', res.language.default)
      }
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

    async switchLanguageAction(data: languageType) {
      await switchLanguage(data)
    },

    // 钱包支付
    async getBlockInfoAction() {
      const config: any = await getInformation()
      writeContract({
        abi: config.chain.presell.abi,
        contract: config.chain.presell.contract,
        walletAddress: this.address,
        method: 'transfer',
        config: [config.chain.presell.collect_address, Web3.utils.toWei('20', 'ether').toString()]
      }).then(async transactionNumber => {
        const query = async () => {
          console.log('进行查询交易中')
          const res: any = await getTransaction(transactionNumber)
          if (res.blockHash !== null) {
            // 真实查到之后
            console.log(res)
          } else {
            setTimeout(() => {
              query()
            }, 500)
          }
        }
        await query()
      })
    }
  }
})
