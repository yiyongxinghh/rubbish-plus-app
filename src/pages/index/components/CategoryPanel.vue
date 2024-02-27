<script setup lang="ts">
import type { PanelItem } from "@/types/home"
defineProps<{ panelList: PanelItem[] }>()
</script>

<template>
  <view class="category">
    <navigator
      class="category-item"
      hover-class="none"
      v-for="panel in panelList"
      :url="panel.panelDescription"
      :key="panel.panelId"
    >
      <image
        class="icon"
        :src="panel.panelUrl"
      ></image>
      <text class="text">{{ panel.panelName }}</text>
    </navigator>
    
  </view>
</template>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 10rpx;
  padding: 10rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 100rpx;
  background: white;
  box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83) !important;
  border-radius: 10rpx;
  .category-item {
    width: 140rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 50rpx;
      height: 50rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>