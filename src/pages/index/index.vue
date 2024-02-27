<template>
  <!-- 自定义导航栏 -->
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view @scrolltolower="onScrolltolower" refresher-enabled @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered" class="scroll-view" :scroll-y="true">
    <RpPageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <RpSwiper :bannerList="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :panelList="panelList" />
      <!-- 热门商品 -->
      <HotPanel :hotList="hotList" />
      <!-- 猜你喜欢 -->
      <RpGuess ref="guessRef" />
    </template>
  </scroll-view>
  <!-- 底部导航 -->
  <RpTabbar :selected="0" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBannerAPI, getPanelListAPI, getHomeHotAPI } from "@/services/home";
import type { BannerItem, PanelItem, HotItem } from '@/types/home';
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { RpGuessInstance } from '@/types/components';

const bannerList = ref<BannerItem[]>([])
const panelList = ref<PanelItem[]>([])
const hotList = ref<Array<HotItem[]>>([])

const isTriggered = ref(false)

//获取首页轮播图数据
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI(1, 5)
  bannerList.value = res.data.pics
}

//获取首页分类面板数据
const getPanelListData = async () => {
  const res = await getPanelListAPI()
  panelList.value = res.data
}

//猜你喜欢组件实例
const guessRef = ref<RpGuessInstance>()

//获取热门推荐数据
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.data
}

//滚动触底
const onScrolltolower = () => {
  guessRef.value?.getMore()
}
//自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  //开始动画
  isTriggered.value = true
  isLoading.value = true
  //重置数据
  guessRef.value?.resetData()
  //加载数据
  await Promise.all([getHomeBannerData(), getPanelListData(), getHomeHotData(), guessRef.value?.getMore()])
  //结束动画
  isTriggered.value = false
  isLoading.value = false
}

//是否加载中
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([
    getHomeBannerData(),
    getPanelListData(),
    getHomeHotData()
  ])
  isLoading.value = false
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  height: 100%;
  flex: 1;
  overflow: hidden;
}
</style>
