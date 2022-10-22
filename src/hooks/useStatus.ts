import { ref } from 'vue'

const currentLanguage = ref<string>('zh-cn') // 当前显示语言

const loadingStatus = ref<boolean>(false) // 加载状态
const loadingText = ref<string>('loading') // 加载文本
const scheduleStatus = ref<boolean>(true)
const scheduleText = ref<string>('资源加载中') // 加载文本
const percentage = ref<number>(0)
const istrue = ref<boolean>(false)
export default function useStatus() {
  return {
    currentLanguage,
    loadingStatus,
    scheduleStatus,
    scheduleText,
    percentage,
    istrue,
    loadingText
  }
}
