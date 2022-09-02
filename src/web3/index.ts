import Web3 from 'web3/dist/web3.min.js'
import { AbiItem } from 'web3-utils'

// web3 ts的类型定义
import { ContractOptions } from 'web3-eth-contract'
// 检查是否是新的MetaMask 或 DApp浏览器
let web3Provider
async function init() {
  if (window.ethereum) {
    web3Provider = window.ethereum
    try {
      // 请求用户授权
      await window.ethereum.enable()
    } catch (error) {
      // 用户不授权时
      console.error('User denied account access')
    }
  } else if (window.web3) {
    // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
  }
}
init()
const web3 = new Web3(web3Provider)

// 链接钱包
async function connectWallet() {
  return new Promise(async (resolve, reject) => {
    const accounts = await window.ethereum
      .request({
        method: 'eth_requestAccounts'
      })
      .catch((err: any) => {
        reject(err)
      })
    if (accounts && accounts[0]) {
      resolve(accounts[0])
    } else {
      reject()
    }
  })
}
// 获取区块信息
function getTransaction(transactionHash: string) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransaction(transactionHash, function (error, result) {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

// 读合约方法
interface readContractType {
  abi: AbiItem // 合约abi
  contract: string // 合约地址
  method: string // 合约方法
  walletAddress: string // 钱包地址
  options?: ContractOptions // 合约配置 类似gas费那些
  config?: {
    account?: string
    quantity?: string
  }
}
function readContract(obj: readContractType) {
  const { config } = obj
  // 创建合约对象
  return new Promise(async (resolve, reject) => {
    await new web3.eth.Contract(obj.abi, obj.contract, obj.options).methods[obj.method](
      obj.walletAddress
    ).call((error: any, result: string) => {
      if (!error) {
        resolve(Web3.utils.fromWei(result, 'ether'))
      } else {
        reject(error)
      }
    })
  })
}
// 写合约方法

interface writeContractType {
  abi: AbiItem // 合约abi
  contract: string // 合约地址
  method: string // 合约方法
  walletAddress?: string | undefined // 钱包地址
  config?: string[] // 合约方法需要的参数,需要按照该方法的参数顺序进行传参
  options?: ContractOptions // 合约配置 类似gas费那些
  // process?: boolean // 数据预处理
  // unlimited?: boolean
}
async function writeContract(obj: writeContractType) {
  const { config } = obj
  // 创建合约对象
  return new Promise(async (resolve, reject) => {
    await new web3.eth.Contract(JSON.parse(obj.abi), obj.contract, obj.options).methods[obj.method](
      ...Array.from(config)
    ).send(
      {
        from: obj.walletAddress
      },
      (error: any, transactionHash: string) => {
        if (!error) {
          // 成功执行，返回交易号
          resolve(transactionHash)
        } else {
          // 失败执行
          reject(error)
        }
      }
    )
  })
}
async function connectWeb3(config: any) {
  // 判断链对不，链不对就请求切换网络，或者添加网络，
  if (window.ethereum) {
    try {
      await window.ethereum as any.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: Web3.utils.numberToHex(config.chainId) // 目标链ID
          }
        ]
      })
    } catch (e) {
      if (e as any.code === 4902) {
        try {
          await window.ethereum as any.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: Web3.utils.numberToHex(config.chainId), // 目标链ID
                chainName: config.chainName,
                nativeCurrency: {
                  name: config.symbol,
                  symbol: config.symbol,
                  decimals: config.decimals
                },
                rpcUrls: [config.host], // 节点
                blockExplorerUrls: [config.blockExplorerUrls]
              }
            ]
          })
        } catch (ee) {
          //
        }
      } else if (e as any.code === 4001) {return}
    }
  }
  // 链接钱包
  return await connectWallet()
}

// 主币交易

interface mainCurrencyTransactionType {
  from: string
  to: string
  value: string
}
async function mainCurrencyTransaction(obj: mainCurrencyTransactionType) {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: obj.from, // 付款方
            to: obj.to, // 收款方
            value: Web3.utils.toHex(Web3.utils.toWei(obj.value, 'ether')) // 价格 16进制
            // gasPrice: '0x'+'0',	// 手续费 可以不设置但是不能过低
            // gasLimit: '0x'+'5208',	// 暂时不知道是什么东西
            // gas: '0x'+'33450'	// 手续费 同上
          }
        ]
      })
      .then((transactionHash: string) => {
        // 成功执行
        resolve(transactionHash)
      })
      .catch(() => {
        // 失败执行
        reject()
      })
  })
}
export {
  Web3,
  web3,
  getTransaction,
  readContract,
  writeContract,
  connectWallet,
  connectWeb3,
  mainCurrencyTransaction
}
