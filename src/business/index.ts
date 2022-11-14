// 代币授权业务
import useStatus from '@/hooks/useStatus' // 一些加载中的状态
import { writeContract, readContract, getTransaction } from '@/web3'
import * as types from './types' // 类型声明
const { loadingStatus } = useStatus()

// 无限制授权
const QUOTA = '11579208923731620000000000000000000000000000000000000000000000000000000000000'

const Approve = (config: types.Config) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let approveTokenAStatus = false
    let approveTokenBStatus = false
    const queryApproveTokenA = () => {
      readContract({
        abi: config.tokenA.abi,
        contract: config.tokenA.contract,
        walletAddress: config.address,
        method: 'allowance',
        config: [config.address, config.targetContract]
      })
        .then(async res => {
          console.log('查询TokenA授权额度', res)
          if (Number(res) <= 0) {
            if (!approveTokenAStatus) {
              writeContract({
                abi: config.tokenA.abi,
                contract: config.tokenA.contract,
                walletAddress: config.address,
                method: 'approve',
                config: [config.targetContract, config.quota ? config.quota : QUOTA]
              })
                .then(transactionNumber => {
                  if (transactionNumber) {
                    approveTokenAStatus = true
                    setTimeout(async () => {
                      await queryApproveTokenA()
                    }, 2000)
                  }
                })
                .catch(err => {
                  reject(err)
                })
            } else {
              setTimeout(async () => {
                await queryApproveTokenA()
              }, 2000)
            }
          } else {
            console.log('授权成功TokenA成功')
            const queryApproveTokenB = () => {
              console.log('开始授权TokenB')
              readContract({
                abi: config.tokenB?.abi,
                contract: config.tokenB?.contract,
                walletAddress: config.address,
                method: 'allowance',
                config: [config.address, config.targetContract]
              })
                .then(async res => {
                  console.log('查询TokenB授权额度', res)
                  if (Number(res) <= 0) {
                    if (!approveTokenBStatus) {
                      writeContract({
                        abi: config.tokenA.abi,
                        contract: config.tokenA.contract,
                        walletAddress: config.address,
                        method: 'approve',
                        config: [config.targetContract, config.quota ? config.quota : QUOTA]
                      })
                        .then(async transactionNumber => {
                          approveTokenBStatus = true
                          if (transactionNumber) {
                            setTimeout(async () => {
                              await queryApproveTokenB()
                            }, 2000)
                          }
                        })
                        .catch(() => {
                          loadingStatus.value = false
                        })
                    } else {
                      setTimeout(async () => {
                        await queryApproveTokenB()
                      }, 2000)
                    }
                  } else {
                    console.log('双币授权成功,开始执行业务')
                    writeContract({
                      ...config.businessConfig
                    })
                      .then(transactionNumber => {
                        console.log('获得交易号:', transactionNumber)
                        console.log('开始查询链上交易是否成功')
                        const query = async () => {
                          console.log('查询交易中')
                          const res = await getTransaction(transactionNumber)
                          if (res && res.blockHash !== null && res.status) {
                            // 真实查到之后
                            console.log('查询成功,通知后端')
                            resolve(transactionNumber)
                          } else if (res && !res.status) {
                            console.log('自动查询出错')
                            reject('自动查询出错')
                          } else {
                            setTimeout(() => {
                              query()
                            }, 2000)
                          }
                        }
                        query()
                      })
                      .catch(err => {
                        console.log(err)
                        reject(err)
                      })
                  }
                })
                .catch(err => {
                  reject(err)
                })
            }
            if (config?.tokenB?.abi) {
              await queryApproveTokenB()
            } else {
              console.log('单币授权成功,开始执行业务')
              writeContract({
                ...config.businessConfig
              })
                .then(transactionNumber => {
                  console.log('获得交易号:', transactionNumber)
                  console.log('开始查询链上交易是否成功')
                  const query = async () => {
                    console.log('查询交易中')
                    const res = await getTransaction(transactionNumber)
                    if (res && res.blockHash !== null && res.status) {
                      // 真实查到之后
                      console.log('查询成功,通知后端')
                      resolve(transactionNumber)
                    } else if (res && !res.status) {
                      console.log('自动查询出错')
                      reject('自动查询出错')
                    } else {
                      setTimeout(() => {
                        query()
                      }, 2000)
                    }
                  }
                  query()
                })
                .catch(err => {
                  console.log(err)
                  reject(err)
                })
            }
          }
        })
        .catch(err => {
          reject(err)
        })
    }
    await queryApproveTokenA()
  })
}

export { Approve }
