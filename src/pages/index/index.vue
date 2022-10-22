<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance, watchEffect, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app'
import { useRootStore } from '@/store/Root'
import commonLoading from '@/common/commonLoading.vue'
import commonSchedule from '@/common/commonSchedule.vue'
import useStatus from '@/hooks/useStatus'
const { loadingStatus, percentage, scheduleStatus, istrue } = useStatus()
const { proxy } = getCurrentInstance() as ComponentPublicInstance | null
const { t } = useI18n()
const UseRootStore = useRootStore()
watchEffect(() => {
  setTimeout(() => {
    console.log('完成')
  }, 2000)
})
const ApproveClick = () => {
  loadingStatus.value = true
  UseRootStore.testApprove()
}
</script>

<template>
  <!-- <commonLoading loading-text="资源加载中" /> -->
  <commonSchedule loading-text="资源加载中" />
  <view>
    <h1>{{ t('home') }}</h1>
    <view @click="ApproveClick">Approve</view>
  </view>
</template>

<style lang="scss" scoped></style>
