import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'

// 读合约方法
interface readContractType {
  abi?: AbiItem // 合约abi
  contract?: string // 合约地址
  method: string // 合约方法
  walletAddress: string // 钱包地址
  options?: ContractOptions // 合约配置 类似gas费那些
  config?: string[] // 合约方法需要的参数,需要按照该方法的参数顺序进行传参
  decimal?: boolean
}

// 写合约方法

interface writeContractType {
  abi?: AbiItem // 合约abi
  contract?: string // 合约地址
  method: string // 合约方法
  walletAddress?: string | undefined // 钱包地址
  config?: string[] // 合约方法需要的参数,需要按照该方法的参数顺序进行传参
  options?: ContractOptions // 合约配置 类似gas费那些
}

interface connectWeb3Type {
  blockExplorerUrl: string
  chainId: number
  chainName: string
  decimals: number
  env: string
  host: string
  symbol: string
}

// 主币交易
interface mainCurrencyTransactionType {
  from: string
  to: string
  value: string
}

export { readContractType, writeContractType, connectWeb3Type, mainCurrencyTransactionType }
