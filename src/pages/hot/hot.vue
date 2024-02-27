<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeHotAPI } from '@/services/home'
import { getSoldOutGarbageAPI } from '@/services/hot'
import type { Garbage } from '@/types/global'

//获取热门推荐数据
const gaebageList = ref<Garbage[]>([])
const getGaebageList = async () => {
  const res = await getHomeHotAPI()
  gaebageList.value = res.data.reduce((result, currentArray) => result.concat(currentArray), []) as Garbage[];
}

//控制激活
const active = ref(0)
const handleActive = (id: number) => {
  active.value = id
  if (id === 1) getSoldOutGarbageList()
  else if (id === 0) getGaebageList()
}

//获取即将售空数据
const getSoldOutGarbageList = async () => {
  const res = await getSoldOutGarbageAPI()
  gaebageList.value = res.data
}

//是否加载数据完毕
const isFinished = ref(false)

onLoad(async () => {
  await getGaebageList()
  isFinished.value = true
})
</script>

<template>
  <view class="viewport" v-if="isFinished">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image
        src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-05-20/84abb5b1-8344-49ae-afc1-9cb932f3d593.jpg"
        mode="scaleToFill"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text class="text" :class="{ active: active === 0 }" @click="handleActive(0)">热门推荐</text>
      <text class="text" :class="{ active: active === 1 }" @click="handleActive(1)">即将售空</text>
    </view>
    <!-- 推荐列表 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="goods">
        <navigator hover-class="none" class="navigator" v-for=" goods  in  gaebageList " :key="goods.garbageId"
          :url="`/pages/goods/goods?id=`">
          <image class="thumb" :src="goods.pic.picUrl"></image>
          <view class="name ellipsis">{{ goods.garbageName }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.garbagePrice.toFixed(2) }}</text>
          </view>
        </navigator>
      </view>
    </scroll-view>
  </view>
  <!-- 骨架屏 -->
  <RpPageSkeleton v-else />
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}

.cover {
  width: 100%;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;

  image {
    width: 100%;
  }
}

.scroll-view {
  flex: 1;
}

.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;

  .text {
    margin: 0 20rpx;
    position: relative;
  }

  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #282a29;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;

  .navigator {
    width: 310rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  .thumb {
    width: 305rpx;
    height: 305rpx;
  }

  .name {
    height: 88rpx;
    font-size: 26rpx;
  }

  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }

  .symbol {
    font-size: 70%;
  }

  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>