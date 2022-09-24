<script setup lang="ts">
import { getCurrentInstance, ComponentPublicInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import { onLoad } from '@dcloudio/uni-app'
const { proxy } = getCurrentInstance() as ComponentPublicInstance | null
const { t } = useI18n()

onLoad(async () => {
  await proxy.$onLaunched
  // ...登录之后的业务
})
</script>

<template>
  <view>
    <h1>{{ t('home') }}</h1>
  </view>
</template>

<style lang="scss" scoped></style>
