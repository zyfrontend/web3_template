import { AbiItem } from 'web3-utils'
import { writeContractType } from '@/web3'
// 代币授权配置信息
interface Config {
  tokenA: {
    // 合约abi
    abi: AbiItem
    // 合约地址
    contract: string
  }
  tokenB?: {
    // 合约abi
    abi: AbiItem
    // 合约地址
    contract: string
  }
  // 授权的目标合约
  targetContract: string
  // 当前用户钱包地址
  address: string
  // 可选：授权金额,默认无限制
  quota?: string
  // 业务配置
  businessConfig: writeContractType
}

export { Config }
