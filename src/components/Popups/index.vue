<template>
  <view class="popups" :style="`background: ${background}`">
    <template v-if="popupsType === 'default'">
      <view class="input-container animate__animated animate__zoomInUp">
        <view class="input-row"><input v-model="address" type="text" /></view>
        <view class="input-row"><input v-model="amount" type="text" /></view>
        <view>
          <van-button @click="confirmClick">{{ t('confirm') }}</van-button>
          <van-button @click="closeClick">{{ t('close') }}</van-button>
        </view>
      </view>
    </template>
    <template v-if="popupsType === 'loading'">
      <van-loading vertical :color="messageColor">{{ t(popupsLoadingMessage) }}</van-loading>
    </template>
    <template v-if="popupsType === 'message'">
      <view class="animate__animated animate__bounce default">
        {{ t(popupsMessage) }}
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import usePopupsStatus from './hooks'
const { popupsStatus, popupsType, popupsMessage, popupsLoadingMessage } = usePopupsStatus()
const { t } = useI18n()
defineProps({
  background: {
    type: String,
    default: 'rgba(0, 0, 0, 0.5)',
  },
  messageColor: {
    type: String,
    default: 'rgba(255, 255, 255, 1)',
  },
})

const emit = defineEmits(['confirmClick'])
const confirmClick = () => {
  emit('confirmClick')
}
const closeClick = () => {
  popupsStatus.value = false
}

const address = ref<string>('')
const amount = ref<number | undefined | null>(null)

defineExpose({
  address,
  amount,
})
// 组件卸载前恢复默认
onBeforeUnmount(() => {
  address.value = ''
  amount.value = null
  popupsType.value = 'default'
})
</script>

<style lang="scss" scoped>
.popups {
  width: 100vw;
  height: 100vh;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .input-container {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.input-row {
  background: red;
  margin-bottom: 12rpx;
}
</style>
