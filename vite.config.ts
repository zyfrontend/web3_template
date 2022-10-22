import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import eslintPlugin from 'vite-plugin-eslint' //导入包
const path = require('path')

export default defineConfig({
  plugins: [
    uni(),
    Components({
      resolvers: [VantResolver()]
    }),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue', 'src/**/*.ts', 'src/*.ts']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 生产环境移除 console
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://depm.tianyantu.com/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
