<script setup lang="ts">
import { ref } from 'vue'
import type { BannerItem } from '@/types/home';

defineProps<{ bannerList: BannerItem[] }>()

const activeIndex = ref(0)

const onChange: UniHelper.SwiperOnChange = (ev) => {
  activeIndex.value = ev.detail.current
}

</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="pic in bannerList" :key="pic.picId">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="pic.picUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text v-for="(item, index) in bannerList.length" :key="item" class="dot"
        :class="{ active: index === activeIndex }"></text>
    </view>
  </view>
</template>

<style lang="scss">
:host {
  display: block;

}

/* 轮播图 */
.carousel {
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  height: 280rpx;

  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;

    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }

    .active {
      background-color: #fff;
    }
  }

  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>