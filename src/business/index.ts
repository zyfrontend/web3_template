// 代币授权业务
import useStatus from '@/hooks/useStatus'
import { writeContract, readContract, getTransaction } from '@/web3'
import * as types from './types'
import * as web3Types from '@/types/web3.types'
const { loadingStatus } = useStatus()

// 无限制授权
const QUOTA = '11579208923731620000000000000000000000000000000000000000000000000000000000000'

const Approve = (config: types.Config, fn: () => void) => {
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
      .then(res => {
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
                  setTimeout(() => {
                    queryApproveTokenA()
                  }, 2000)
                }
              })
              .catch(() => {
                loadingStatus.value = false
              })
          } else {
            setTimeout(() => {
              queryApproveTokenA()
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
              .then(res => {
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
                          setTimeout(() => {
                            queryApproveTokenB()
                          }, 2000)
                        }
                      })
                      .catch(() => {
                        loadingStatus.value = false
                      })
                  } else {
                    setTimeout(() => {
                      queryApproveTokenB()
                    }, 2000)
                  }
                } else {
                  console.log('双币授权成功,开始执行业务')
                  return () => {
                    fn()
                  }
                }
              })
              .catch(() => {
                loadingStatus.value = false
              })
          }
          if (config?.tokenB?.abi) {
            queryApproveTokenB()
          } else {
            console.log('单币授权成功,开始执行业务')
            return () => {
              fn()
            }
          }
        }
      })
      .catch(() => {
        loadingStatus.value = false
      })
  }
  queryApproveTokenA()
}

const QueryOrder = (
  config: web3Types.writeContractType,
  outputPay: () => void,
  createOrder: () => void
) => {
  writeContract({
    abi: config.abi,
    contract: config.contract,
    walletAddress: config.walletAddress,
    method: config.method,
    config: config.config
  })
    .then(async transactionNumber => {
      // 创建订单
      console.log('开始创建订单')
      createOrder()
      const queryOrder = async () => {
        const res = await getTransaction(transactionNumber)
        console.log(res.Status)
        if (res.blockHash !== null) {
          //  成功
          console.log('支付成功')
          await outputPay()
        } else {
          setTimeout(() => {
            queryOrder()
          }, 2000)
        }
      }
      queryOrder()
    })
    .catch(err => {
      loadingStatus.value = false
      console.log(err)
    })
}

export { Approve, QueryOrder }
