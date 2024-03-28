<template>
  <view class="collect-item" @click="toGood()">
    <image :src="garbage.pic.picUrl" mode="aspectFill" />
    <view class="collect-detail">
      <text>{{ good.garbageName }}</text>
      <text>库存 : {{ good.garbageAmount }}</text>
      <text>￥{{ good.garbagePrice }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import { getGarbageAPI } from "@/services/shop";
const props = defineProps(["good"]);

const garbage = ref();

const getGarbage = async () => {
  const { data } = await getGarbageAPI(props.good.garbageId);
  console.log(data)
  garbage.value = data;
};

const toGood = () => {
  uni.navigateTo({ url: "/pages/goods/goods?id=" + props.good.garbageId });
}

onLoad(async () => {
  await getGarbage();
});
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
