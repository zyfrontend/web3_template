<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import useStatus from '@/hooks/useStatus'
const { scheduleStatus, percentage, istrue } = useStatus()
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

let timer = null
let seed = 10
const cur = 1

timer = setInterval(() => {
  if (!istrue.value) {
    percentage.value += seed
    if (seed <= 0.2) {
      seed = 0.1
      if (cur >= 100) {
        seed = 0.01
      }
    } else {
      seed--
    }
  } else {
    seed = 0
    percentage.value = 100
    clearInterval(timer)
  }
}, 200)

watchEffect(() => {
  if (Math.ceil(percentage.value) === 100) {
    clearInterval(timer)
    scheduleStatus.value = false
    console.log('加载完成')
  }
})
</script>

<template>
  <van-overlay :show="scheduleStatus">
    <view class="Schedule">
      <view class="progress">
        <van-progress :percentage="percentage" stroke-width="16rpx" :show-pivot="false" />
      </view>
      <view class="loading-text">
        <view>{{ t(loadingText) }}</view>
        <view style="width: 80rpx; text-align: center; margin: 0 6rpx">
          {{ percentage.toFixed(1) }}
        </view>
        %
      </view>
    </view>
  </van-overlay>
</template>

<style lang="scss" scoped>
.Schedule {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #8e44ad;
  .progress {
    width: 90%;
  }
  .loading-text {
    margin-top: 50rpx;
    line-height: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
</style>
