import { ref } from 'vue'

const currentLanguage = ref<string>('zh-cn') // 当前显示语言

const loadingStatus = ref<boolean>(false) // 加载状态
const loadingText = ref<string>('loading') // 加载文本

export default function useStatus() {
  return {
    currentLanguage,
    loadingStatus,
    loadingText
  }
}
