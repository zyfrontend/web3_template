<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRootStore } from '@/store/Root'
import commonSchedule from '@/common/commonSchedule.vue'
import useStatus from '@/hooks/useStatus'
const { loadingStatus } = useStatus()
const { proxy } = getCurrentInstance() as ComponentPublicInstance | null
const { t } = useI18n()
const UseRootStore = useRootStore()

const ApproveClick = () => {
  loadingStatus.value = true
  UseRootStore.testApprove()
}
</script>

<template>
  <commonSchedule loading-text="资源加载中" />
  <view>
    <h1>{{ t('home') }}</h1>
    <view @click="ApproveClick">Approve</view>
  </view>
</template>

<style lang="scss" scoped></style>
