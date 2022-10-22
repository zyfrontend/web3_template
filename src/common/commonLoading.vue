<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useStatus from '@/hooks/useStatus'
const { loadingStatus } = useStatus()
const { t } = useI18n()

defineProps({
  loadingColor: {
    type: String,
    default: '#1989fa'
  },
  loadingText: {
    type: String,
    default: '加载中...'
  },
  loadingType: {
    type: String,
    default: 'circular'
  },
  loadingSize: {
    type: String,
    default: '80rpx'
  }
})
</script>

<template>
  <van-overlay :show="loadingStatus">
    <view class="Loading">
      <van-loading vertical :color="loadingColor" :size="loadingSize" :type="loadingType">
        {{ t(loadingText) }}
      </van-loading>
    </view>
  </van-overlay>
</template>

<style lang="scss" scoped>
.Loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
