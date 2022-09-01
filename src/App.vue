<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style lang="scss">
* {
  text-transform: capitalize;
  /* capitalize 单词首字母大写 */
  /* uppercase 所有字母大写 */
  /* lowercase 所有字母小写 */
}
.default {
  color: white;
  font-size: 24rpx;
}
.content {
  padding: 32rpx 32rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.container {
  width: 100vw;
  height: calc(100vh - 88rpx);
}
</style>
