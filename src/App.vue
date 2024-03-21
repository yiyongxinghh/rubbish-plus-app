<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { init } from "@/utils/goeasy";
onLaunch(() => {
  init()
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<template></template>

<style>
.uni-input-input {
  height: 100rpx;
}
</style>
