// 代币授权业务
import useStatus from '@/hooks/useStatus'
import { writeContract, readContract } from '@/web3'
import * as types from './types'
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

export { Approve }
