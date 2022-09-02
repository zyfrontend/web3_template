import { http } from '@/utils'
import {
  Node,
  Login,
  voteActionType,
  buyNodeType,
  withdrawType,
  miningType,
  miningPledgeType,
  redemptionType
} from './types'
// 登录api
export async function userLogin(data: Login) {
  try {
    const res = await http(
      {
        url: '/api/common/login',
        method: 'post',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    if (res.data.code === 200) {
      uni.setStorageSync('x-token', res.data.data['x-token'])
      return res.data.data
    }
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}
// 用户信息
export async function userInfo() {
  try {
    const res = await http(
      {
        url: '/api/user/userInfo'
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}
// 配置信息
export async function information() {
  try {
    const res = await http(
      {
        url: '/api/common/config'
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}
// 切换语言
export async function switchLanguage(data: string) {
  try {
    const res = await http(
      {
        url: '/api/common/language',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}

// 首页挖矿收益信息
export async function miningInformation() {
  try {
    const res = await http(
      {
        url: '/api/user/minDetail'
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}
// 节点产品详情
export async function nodeProductDetails(data: Node) {
  try {
    const res = await http(
      {
        url: '/api/product/detail',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}

// 投票列表

export async function voteList() {
  try {
    const res = await http(
      {
        url: '/api/vote/index'
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.msg,
      icon: 'none'
    })
  }
}

// 进行投票
export async function vote(data: voteActionType) {
  try {
    const res = await http(
      {
        url: '/api/vote/toVote',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
  }
}
// 挖矿列表页
export async function miningList(data: any) {
  try {
    const res = await http(
      {
        url: '/api/mining/index',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
  }
}

// 节点购买
export async function buyNode(data: buyNodeType) {
  try {
    const res = await http(
      {
        url: '/api/order/outputPay',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}

// 背包列表
export async function backPackList(data: any) {
  try {
    const res = await http(
      {
        url: '/api/user_product/backPack',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}

// 推荐信息
export async function inviteData() {
  try {
    const res = await http(
      {
        url: '/api/user/teamdata'
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}
// 推荐列表
export async function inviteListData(data: any) {
  try {
    const res = await http(
      {
        url: '/api/user/inviteAmount',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}
// 提现信息
export async function withdraw(data: withdrawType) {
  try {
    const res = await http(
      {
        url: '/api/user_withdraw/apply',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // 抛出异常
    if (err) {
      throw err.data
    }
  }
}

export async function assetsDetail(data: any) {
  try {
    const res = await http(
      {
        url: '/api/user/assetDetails',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // 抛出异常
    throw err.data
  }
}

export async function recharge(data: buyNodeType) {
  try {
    const res = await http(
      {
        url: '/api/order/outputPay',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    console.log(res)
    return res.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}

export async function miningDetail(data: miningType) {
  try {
    const res = await http(
      {
        url: '/api/bank/bankDetail',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}

export async function miningHistory(data: any) {
  try {
    const res = await http(
      {
        url: '/api/bank/bankList',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    // return err.data
  }
}

export async function miningPledge(data: miningPledgeType) {
  try {
    const res = await http(
      {
        url: '/api/bank/saveBank',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    if (err) {
      throw err.data
    }
    // return err.data
  }
}
// 赎回

export async function redemption(data: redemptionType) {
  try {
    const res = await http(
      {
        url: '/api/bank/redemption',
        method: 'POST',
        data
      },
      {
        // 自定义配置
        // loading: false,
      }
    )
    return res.data
  } catch (err) {
    uni.showToast({
      title: err.data.msg,
      icon: 'none'
    })
    if (err) {
      throw err.data
    }
    // return err.data
  }
}
