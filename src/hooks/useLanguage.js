import { ref } from 'vue'

const currentLanguage = ref('zh-cn')
export default function useLanguage() {
  return {
    currentLanguage
  }
}
