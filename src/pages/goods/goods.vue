<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { getGarbageAPI } from "@/services/shop";
import { ref } from "vue";
import type { Garbage } from '@/types/global';
import AddressPanel from './components/AddressPanel.vue';
import ServicePanel from './components/ServicePanel.vue';

//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

//接收页面参数
const query = defineProps<{
  id: number
}>()

//弹出层
const popup = ref<{
  open: (type?:UniHelper.UniPopupType) => void,
  close: () => void
}>()
//弹出层条件渲染
const popupName = ref<'address'|'service'>()
const openPopup = (name: typeof popupName.value) => {
  popupName.value = name
  popup.value?.open()
}

//滚动触底
const guessRef = ref()
const onScrolltolower = () => {
  guessRef.value?.getMore()
}

//获取商品信息
const garbage = ref<Garbage>()
const getGarbage = async () => {
  const { data } = await getGarbageAPI(query.id)
  garbage.value = data
}

onLoad(async () => {
  await Promise.all([getGarbage(),onScrolltolower()]) 
})

</script>

<template>
  <scroll-view :scroll-y="true" class="viewport" @scrolltolower="onScrolltolower">
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <!-- <image mode="aspectFill" :src="garbage?.pic.picUrl" /> -->
      </view>

      <!-- 商品简介 -->
      <view class="meta">
        <view class="price">
          <text class="symbol">¥</text>
          <text class="number">{{ garbage?.garbagePrice.toFixed(2) }}</text>
        </view>
        <view class="name ellipsis">{{ garbage?.garbageName }}</view>
        <view class="desc"> {{ garbage?.garbageDescription }}</view>
      </view>

      <!-- 操作面板 -->
      <view class="action">
        <view class="item arrow">
          <text class="label">选择</text>
          <text class="text ellipsis"> 请选择商品规格</text>
          <text class="iconfont">&#xe663;</text>
        </view>
        <view class="item arrow" @click="openPopup('address')">
          <text class="label">送至</text>
          <text class="text ellipsis"> 请选择收获地址</text>
          <text class="iconfont">&#xe663;</text>
        </view>
        <view class="item arrow" @click="openPopup('service')">
          <text class="label">服务</text>
          <text class="text ellipsis"> 无忧退 快速退款 免费包邮</text>
          <text class="iconfont">&#xe663;</text>
        </view>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="detail panel">
      <view class="title">
        <text>详情</text>
      </view>
      <view class="content">
        <view class="properties">
          <!-- 属性详情 -->
          <view class="item">
            <text class="label">属性名</text>
            <text class="value">属性值</text>
          </view>
          <view class="item">
            <text class="label">属性名</text>
            <text class="value">属性值</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image mode="widthFix" src="https://yanxuan-item.nosdn.127.net/a8d266886d31f6eb0d7333c815769305.jpg"></image>
        <image mode="widthFix" src="https://yanxuan-item.nosdn.127.net/a9bee1cb53d72e6cdcda210071cbd46a.jpg"></image>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <RpGuess ref="guessRef" />
  </scroll-view>

  <!-- 用户操作 -->
  <view class="toolbar" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
    <view class="buttons">
      <view class="user">咨询</view>
      <view class="addcart"> 收藏 </view>
      <view class="buynow"> 立即购买 </view>
    </view>
  </view>

  <!-- 弹出层 -->
  <uni-popup
    ref="popup"
    type="bottom"
    background-color="#fff"
  >
    <AddressPanel v-if="popupName === 'address'" @close="popup?.close()"/>
    <ServicePanel v-if="popupName === 'service'" @close="popup?.close()"/>
  </uni-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.viewport {
  background-color: #f4f4f4;
  height: 100%;
  flex: 1;
  overflow: hidden;
}

.panel {
  margin-top: 20rpx;
  background-color: #fff;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    line-height: 1;
    padding: 30rpx 60rpx 30rpx 6rpx;
    position: relative;

    text {
      padding-left: 10rpx;
      font-size: 28rpx;
      color: #333;
      font-weight: 600;
      border-left: 4rpx solid #27ba9b;
    }

    navigator {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.arrow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 商品信息 */
.goods {
  background-color: #fff;

  .preview {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 480rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .meta {
    position: relative;
    border-bottom: 1rpx solid #eaeaea;

    .price {
      height: 130rpx;
      padding: 25rpx 30rpx 0;
      color: #fff;
      font-size: 34rpx;
      box-sizing: border-box;
      background-color: #35c8a9;
    }

    .number {
      font-size: 56rpx;
    }

    .brand {
      width: 160rpx;
      height: 80rpx;
      overflow: hidden;
      position: absolute;
      top: 26rpx;
      right: 30rpx;
    }

    .name {
      max-height: 88rpx;
      line-height: 1.4;
      margin: 20rpx;
      font-size: 32rpx;
      color: #333;
    }

    .desc {
      line-height: 1;
      padding: 0 20rpx 30rpx;
      font-size: 24rpx;
      color: #cf4444;
    }
  }

  .action {
    padding-left: 20rpx;

    .item {
      height: 90rpx;
      padding-right: 60rpx;
      border-bottom: 1rpx solid #eaeaea;
      font-size: 26rpx;
      color: #333;
      position: relative;
      display: flex;
      align-items: center;

      &:last-child {
        border-bottom: 0 none;
      }
    }

    .label {
      width: 60rpx;
      color: #898b94;
      margin: 0 16rpx 0 10rpx;
    }

    .text {
      flex: 1;
      -webkit-line-clamp: 1;
    }
  }
}

/* 商品详情 */
.detail {
  padding-left: 20rpx;

  .content {
    margin-left: -20rpx;
  }

  .properties {
    padding: 0 20rpx;
    margin-bottom: 30rpx;

    .item {
      display: flex;
      line-height: 2;
      padding: 10rpx;
      font-size: 26rpx;
      color: #333;
      border-bottom: 1rpx dashed #ccc;
    }

    .label {
      width: 200rpx;
    }

    .value {
      flex: 1;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  background-color: #fff;
  height: 100rpx;
  border-top: 1rpx solid #eaeaea;
  display: flex;
  align-items: center;

  .buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex: 1;

    view {
      width: 220rpx;
      text-align: center;
      line-height: 72rpx;
      font-size: 26rpx;
      color: #fff;
      border-radius: 72rpx;
    }

    .user {
      background-color: #575351;
    }

    .addcart {
      background-color: #ffa868;
    }

    .buynow {
      background-color: #27ba9b;
    }
  }

}
</style>