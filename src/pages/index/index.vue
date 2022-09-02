<template>
  <view class="container">
    <van-button @click="showPopupsClick">Popups</van-button>
    <Popups v-if="popupsStatus" @confirmClick="submit" />
  </view>
</template>

<script setup lang="ts">
import usePopupsStatus from '@/components/Popups/hooks'

const { popupsStatus, popupsType } = usePopupsStatus()
const showPopupsClick = () => {
  popupsStatus.value = true
}
const submit = () => {
  setTimeout(() => {
    popupsType.value = 'loading'
    setTimeout(() => {
      popupsType.value = 'message'
      setTimeout(() => {
        popupsStatus.value = false
      }, 2000)
    }, 2000)
  }, 100)
}
</script>

<style lang="scss" scoped></style>
