/// <reference types="vite/client" />
import { MetaMaskInpageProvider } from '@metamask/providers'
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | undefined
    web3?: any
  }
}
