<template>
  <view class="order-container">
    <!-- 头部 -->
    <RpTitle :title="'我的订单'" />
    <!-- 订单列表 -->
    <scroll-view scroll-y class="order-content">
      <uni-list>
        <uni-list-item
          title="列表左侧带略缩图"
          note="列表描述信息"
          thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
          thumb-size="lg"
          rightText="右侧文字"
          v-for="item in orderList"
          clickable
        ></uni-list-item>
      </uni-list>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { findUserAllOrderAPI } from "@/services/user";
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/userStore";
import {ref} from 'vue'

const { userDate } = useUserStore();

const orderList = ref([]);
const findUserAllOrder = async () => {
  const { data } = await findUserAllOrderAPI(userDate.userId,userDate.userRank,'','');
  orderList.value = data;
};

onLoad(async () => {
  await findUserAllOrder();
});
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.order-container {
  height: 100%;
  .order-content {
    height: calc(100% - 80rpx);
  }
}
</style>
