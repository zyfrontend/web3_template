<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useRootStore } from '@/store/Root'

const UseRootStore = useRootStore()
onLaunch(() => {
  UseRootStore.getInformationAction().then(config => {
    const selfConfig = config.chain.self_config
    const dateTime = config.datetime
    UseRootStore.connectWalletAction({ selfConfig, dateTime })
  })
})
</script>
<style lang="scss"></style>
