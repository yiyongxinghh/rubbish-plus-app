<template>
  <view class="collect">
    <!-- 头部 -->
    <RpTitle :title="'我的收藏'" />
    <view class="collect-content">
      <!-- 收藏列表 -->
      <view class="collect-title">
        <text>收藏夹</text>
        <text class="iconfont" @click="buildCollect">&#xe623;</text>
      </view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog
          ref="inputClose"
          mode="input"
          title="创建收藏夹"
          value=""
          placeholder="请输入收藏加名称"
          @confirm="dialogInputConfirm"
        ></uni-popup-dialog>
      </uni-popup>
      <uni-collapse accordion>
        <uni-collapse-item
          :title="collection.collectionName"
          :border="false"
          v-for="collection in collectionList"
        >
        <RpGood v-for="good in collection?.collectionToGarbages" :good="good.garbage"/>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { createCollectionAPI, findAllCollectionAPI } from "@/services/user";
import { useUserStore } from "@/stores/userStore";
import { onLoad } from "@dcloudio/uni-app";
import type { Collection } from "@/types/global";

const { userDate } = useUserStore();

const collectionList = ref<Collection[]>([]);

//弹出模态框
const inputDialog = ref();
const buildCollect = () => {
  inputDialog.value.open();
};

//确定建立收藏夹
const dialogInputConfirm = async (val: string) => {
  if (val) {
    try {
      await createCollectionAPI({
        collectionName: val,
        user: userDate?.userId as number,
      });
      await requestCollections();
      return uni.showToast({
        title: "创建成功",
      });
    } catch (error) {
      return uni.showToast({
        title: "错误",
        icon: "error",
      });
    }
  } else {
    return uni.showToast({
      title: "输入不能为空",
      icon: "error",
    });
  }
};

const requestCollections = async () => {
  const { data } = await findAllCollectionAPI(userDate?.userId as number);
  collectionList.value = data;
  console.log(collectionList.value);
  
};

onLoad(async () => {
  await requestCollections();
});
</script>

<style scoped lang="scss">
page {
  height: 100%;
}

.collect {
  height: 100%;
  background-color: #fff;

  .collect-content {
    height: calc(100% - 80rpx);
    padding: 0 10rpx;

    .collect-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80rpx;
      width: 100%;
      background-color: #f5f5f5;
      border-radius: 10rpx;
      padding: 0 10rpx;
      box-sizing: border-box;

      & text:nth-child(1) {
        font-size: 30rpx;
        font-weight: bold;
      }

      & text:nth-child(2) {
        font-size: 40rpx;
        font-weight: bold;
      }
    }
  }
}
</style>
