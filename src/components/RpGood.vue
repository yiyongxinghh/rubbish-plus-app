<template>
  <view class="collect-item">
    <image
      src="https://server.rubbish-plus.top/files/1708689963958.jpg"
      mode="aspectFill"
    />
    <view class="collect-detail">
      <text>XXX</text>
      <text>库存 : XXX</text>
      <text>￥666</text>
    </view>
  </view>
</template>

<script setup>
defineProps(['good'])
</script>

<style scoped lang="scss">
.collect-item {
  width: 100%;
  height: 200rpx;
  box-sizing: border-box;
  padding: 10rpx;
  border: 2rpx solid #f5f5f5;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;

  image {
    width: 320rpx;
    height: 100%;
    border-radius: 10rpx;
  }

  .collect-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    & text:nth-child(1) {
      font-size: 26rpx;
      font-weight: bolder;
    }

    & text:nth-child(2) {
      font-size: 20rpx;
      color: #ccc;
    }

    & text:nth-child(3) {
      font-size: 28rpx;
      color: rgb(231, 39, 39);
    }
  }
}
</style>
