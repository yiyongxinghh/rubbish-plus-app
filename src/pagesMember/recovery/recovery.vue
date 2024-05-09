<template>
  <!-- 头部 -->
  <RpTitle :title="'回收'" />
  <scroll-view class="recovery-container" scroll-y>
    <!-- 回收卡片 -->
    <view class="recovery-card" v-for="category in categoryList">
      <view class="header">
        <image class="icon" :src="category.img" mode="scaleToFill" />
        <text>{{ category.categoryName }}</text>
      </view>
      <button @click="change(category)">回收</button>
    </view>
  </scroll-view>
  <uni-popup ref="popup" type="center" background-color="#fff">
    <uni-popup-dialog
      title="申请回收"
      message="成功消息"
      :duration="2000"
      :before-close="true"
      @close="close"
      @confirm="confirm"
    >
      <view class="popup-container">
        <view class="popup-item" v-for="item in recoverList">
          <text class="popup-title">{{ item.title }}</text>
          <text class="popup-text">{{ item.value }}</text>
        </view>
      </view>
    </uni-popup-dialog>
  </uni-popup>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import type { Order, Category } from "@/types/global";
import { getGarbageCategoryAPI, createRecoverOrderAPI } from "@/services/shop";
import { ref } from "vue";
import { reactive } from "vue";
import { useUserStore } from "@/stores/userStore";
import dayjs from "dayjs";

const { userDate } = useUserStore();

const categoryList = ref();

const recoverList = reactive([
  {
    title: "回收类型",
    value: "",
  },
  {
    title: "费用",
    value: 100,
  },
  {
    title: "订单时间",
    value: dayjs().format("YYYY-MM-DD HH:mm"),
  },
  {
    title: "申请人",
    value: userDate?.userName,
  },
  {
    title: "地址",
    value: userDate?.userAddress,
  },
  {
    title: "配送者",
    value: "随机分配",
  },
]);

//获取垃圾分类
const getGarbageCategory = async () => {
  const { data } = await getGarbageCategoryAPI();
  categoryList.value = data.category;
  categoryList.value.forEach((item: any) => {
    switch (item.categoryName) {
      case "可回收物":
        item.img = `../../static/my/rubbish.png`;
        break;
      case "有害垃圾":
        item.img = `../../static/my/rubbish4.png`;
        break;
      case "厨余垃圾":
        item.img = `../../static/my/rubbish1.png`;
        break;
      case "其他垃圾":
        item.img = `../../static/my/rubbish3.png`;
        break;
    }
  });
  console.log(categoryList.value);
  
};

//弹框
const popup = ref();
const change = (item: Category) => {
  recoverList[0].value = item.categoryName;
  popup.value.open();
};

//取消
const close = () => {
  popup.value.close();
};

//确认
const confirm = () => {
  recover();
  close();
};

//回收
const recover = async () => {
  const order: Order = {
    orderDate: new Date(),
    orderAddress: "123",
    orderIsSign: false,
    orderMoney: 100,
    orderDescription: "回收",
    Recipient: userDate?.userId as number,
  };
  await createRecoverOrderAPI(order);
};

onLoad(async () => {
  await getGarbageCategory();
});
</script>

<style>
page {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.recovery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  .recovery-card {
    margin: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;
    width: 700rpx;
    height: 260rpx;
    background-color: #fff;
    box-shadow: 0 4px 15px rgba(165, 168, 171, 0.83);
    border-radius: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .icon{
        width: 100rpx;
        height: 100rpx;
      }
      text {
        margin-top: 20rpx;
        font-size: 30rpx;
      }
    }
    button {
      width: 200rpx;
      height: 80rpx;
      margin: 0;
      line-height: 80rpx;
      background-color: #fff;
      border: none;
      outline: none;
      border-radius: 10rpx;
    }
  }
}
.uni-popup {
  ::v-deep .uni-popup__wrapper {
    border-radius: 20rpx;
  }
  .popup-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 500rpx;
    height: 660rpx;
    background-color: #fff;
    .popup-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .popup-title {
        font-size: 30rpx;
        font-weight: 700;
      }
      .popup-text {
        font-size: 30rpx;
      }
    }
  }
}
</style>
