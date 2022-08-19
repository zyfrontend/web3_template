import { ref } from 'vue'
const popupsType = ref<string>('default')
const popupsStatus = ref<boolean>(false)
const popupsMessage = ref<string>('success')
const popupsLoadingMessage = ref<string>('loading')
export default function usePopupsStatus() {
  return { popupsStatus, popupsType, popupsMessage, popupsLoadingMessage }
}
