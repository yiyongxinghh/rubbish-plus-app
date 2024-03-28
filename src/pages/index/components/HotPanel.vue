<script setup lang="ts">
import type { HotItem } from '@/types/home'
defineProps<{ hotList: Array<HotItem[]> }>()

const goMore = () => {
  uni.navigateTo({ url: '/pages/hot/hot' })
}
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel">
    <view class="text">
      <text class="text-title">精品推荐</text>
      <text class="more" @click="goMore">更多<text class="iconfont">&#xe663;</text></text>
    </view>
    <view class="hot">
      <view class="item" v-for="(item, index) in hotList" :key="index">
        <view class="title">
          <text class="title-desc">{{ item[0]?.garbageName }}</text>
          <text class="title-desc">{{ item[1]?.garbageName }}</text>
        </view>
        <navigator class="space" hover-class="none" :url="`/pages/hot/hot`">
          <image class="image" mode="aspectFit" :src="item[0]?.pic.picUrl"></image>
          <image class="image" mode="aspectFit" :src="item[1]?.pic.picUrl"></image>
        </navigator>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
/* 热门推荐 */
.panel {
  margin: 0 10rpx;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83);
  border-radius: 10rpx;

  .text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12rpx;

    .text-title {
      font-size: 32rpx;
      font-weight: bold;
    }

    .more {
      color: #999;
      font-size: 26rpx;
    }

  }

  .hot {
    display: flex;
    flex-wrap: wrap;
    min-height: 508rpx;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between !important;
      padding: 24rpx 24rpx 0;
      font-size: 32rpx;
      color: #262626;
      position: relative;

      .title-desc {
        font-size: 24rpx;
        color: #7f7f7f;
      }
    }

    .item {
      display: flex;
      flex-direction: column;
      width: 49.8%;
      height: 254rpx;
      border-right: 1rpx solid #eee;
      border-top: 1rpx solid #eee;

      .title {
        justify-content: start;
      }

      &:nth-child(2n) {
        border-right: 0 none;
      }

      &:nth-child(-n + 2) {
        border-top: 0 none;
      }

      .space {
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .image {
          width: 150rpx;
          height: 150rpx;
        }
      }


    }

    .cards {
      flex: 1;
      padding: 15rpx 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>