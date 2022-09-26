import Web3 from 'web3/dist/web3.min.js'
// import Web3 from 'web3'
import * as types from '@/types/web3.types'
// web3 ts的类型定义
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
      // console.error('User denied account access')
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
  return new Promise((resolve, reject) => {
    window?.ethereum
      ?.request({
        method: 'eth_requestAccounts'
      })
      .then(accounts => {
        if (accounts && accounts[0]) {
          resolve(accounts[0])
        } else {
          reject()
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 获取区块信息
function getTransaction(transactionHash: string) {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionReceipt(transactionHash, function (error, result) {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  })
}

function readContract(obj: types.readContractType) {
  const { config } = obj
  // 创建合约对象
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // console.log(await new web3.eth.Contract(JSON.parse(obj.abi), obj.contract, obj.options).methods)
    await new web3.eth.Contract(JSON.parse(obj.abi), obj.contract, obj.options).methods[obj.method](
      ...Array.from(config)
    ).call((error: never, result: string) => {
      if (!error) {
        if (obj.decimal) {
          resolve(Web3.utils.fromWei(result, 'ether'))
        } else {
          resolve(result)
        }
      } else {
        reject(error)
      }
    })
  })
}

async function writeContract(obj: types.writeContractType) {
  const { config } = obj
  // 创建合约对象
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    console.log(config)
    // console.log(await new web3.eth.Contract(JSON.parse(obj.abi), obj.contract, obj.options).methods)
    await new web3.eth.Contract(JSON.parse(obj.abi), obj.contract, obj.options).methods[obj.method](
      ...Array.from(config)
    ).send(
      {
        from: obj.walletAddress
      },
      (error: never, transactionHash: string) => {
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

async function connectWeb3(config: types.connectWeb3Type) {
  // console.log(web3.eth.net.getId())

  // console.log(window.tronWeb)
  // // 判断链对不，链不对就请求切换网络，或者添加网络，
  // if (window.ethereum) {
  window?.ethereum?.request({
    method: 'wallet_addEthereumChain', // Metamask的api名称
    params: [
      {
        chainId: `0x${config.chainId.toString(16)}`, // 网络id，16进制的字符串
        chainName: config.chainName, // 添加到钱包后显示的网络名称
        rpcUrls: [
          config.host // rpc地址
        ],
        iconUrls: [
          'https://testnet.hecoinfo.com/favicon.png' // 网络的图标，暂时没看到在哪里会显示
        ],
        blockExplorerUrls: [
          config.blockExplorerUrl // 网络对应的区块浏览器
        ],
        nativeCurrency: {
          // 网络主币的信息
          name: config.symbol,
          symbol: config.symbol,
          decimals: config.decimals
        }
      }
    ]
  })
  // } else if (window.tronWeb) {
  //   console.log(window.tronWeb)
  //   const tronWeb = window.tronWeb
  //   const walletAddress = tronWeb.defaultAddress.base58
  //   console.log(walletAddress)
  // }
  // 链接钱包
  // eslint-disable-next-line no-return-await
  return await connectWallet()
}

async function mainCurrencyTransaction(obj: types.mainCurrencyTransactionType) {
  return new Promise((resolve, reject) => {
    window?.ethereum
      ?.request({
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
      .then(transactionHash => {
        // 成功执行
        resolve(transactionHash)
      })
      .catch(() => {
        // 失败执行
        reject()
      })
  })
}

function network(config: types.connectWeb3Type) {
  window?.ethereum?.request({
    method: 'wallet_addEthereumChain', // Metamask的api名称
    params: [
      {
        chainId: `0x${config.chainId.toString(16)}`, // 网络id，16进制的字符串
        chainName: config.chainName, // 添加到钱包后显示的网络名称
        rpcUrls: [
          config.host // rpc地址
        ],
        iconUrls: [
          'https://testnet.hecoinfo.com/favicon.png' // 网络的图标，暂时没看到在哪里会显示
        ],
        blockExplorerUrls: [
          config.blockExplorerUrl // 网络对应的区块浏览器
        ],
        nativeCurrency: {
          // 网络主币的信息
          name: config.symbol,
          symbol: config.symbol,
          decimals: config.decimals
        }
      }
    ]
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
  mainCurrencyTransaction,
  network
}
