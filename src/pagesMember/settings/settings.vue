<script setup lang="ts">
import { ref,computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { updateAddressAPI } from "@/services/setting";
import type { User } from "@/types/global";
//引入用户仓库
const userStore = useUserStore();

//地址弹出层
const addressPopup = ref();
const changePopup = ref();

//登出
const logOut = () => {
  userStore.clearToken();
  userStore.clearUserData();
  uni.navigateTo({ url: "/pages/login/login" });
  uni.showToast({ title: "退出登录" });
};

const rankContent = computed(() => {
  if (userStore.userDate!.userRank === 1 && userStore.userCurrentRank === 0) {
    return "是否转换为配送者";
  } else if (userStore.userDate!.userRank === 1 && userStore.userCurrentRank === 1) {
    return "是否转换为普通用户";
  } else {
    return "无法进行身份转换";
  }
})

//转换分级
const changeUserRank = () => {
  const userRank = userStore.userDate!.userRank;
  if (userRank === 0||userRank === 2) {
    uni.showToast({ title: "无法进行身份转换",icon:"error"});
  } else if (userRank === 1) {
    if (userStore.userCurrentRank === 0) {
      userStore.changeCurrentRank(1);
      uni.showToast({ title: "成功转换为配送者" });
    } else if (userStore.userCurrentRank === 1) {
      userStore.changeCurrentRank(0);
      uni.showToast({ title: "成功转换为普通用户" });
    }
  }
};

//确认地址
const confirmAddress: UniHelper.UniPopupDialogOnConfirm = async (val) => {
  userStore.userDate!.userAddress = String(val);
  const res = await updateAddressAPI(
    userStore.userDate!.userId,
    userStore.userDate as User
  );
  console.log(res);
};
</script>

<template>
  <view class="viewport">
    <!-- 列表1 -->
    <view class="list" v-if="true">
      <view @click="addressPopup.open()" hover-class="none" class="item arrow">
        <text>我的收货地址</text>
        <text class="iconfont icon">&#xe663;</text>
      </view>
    </view>
    <!-- 列表2 -->
    <view class="list">
      <button
        hover-class="none"
        class="item arrow"
        open-type="openSetting"
        @click="changePopup.open()"
      >
        <text>授权管理</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
      <button hover-class="none" class="item arrow" open-type="feedback">
        <text>问题反馈</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
      <button hover-class="none" class="item arrow" open-type="contact">
        <text>联系我们</text>
        <text class="iconfont icon">&#xe663;</text>
      </button>
    </view>
    <!-- 列表3 -->
    <view class="list">
      <navigator hover-class="none" class="item arrow" url=" ">
        <text>关于废品回收系统</text>
        <text class="iconfont icon">&#xe663;</text>
      </navigator>
    </view>
    <!-- 操作按钮 -->
    <view class="action">
      <view class="button" @click="logOut">退出登录</view>
    </view>
    <uni-popup ref="addressPopup" type="dialog">
      <uni-popup-dialog
        mode="input"
        title="修改地址"
        value=""
        @confirm="confirmAddress"
      ></uni-popup-dialog>
    </uni-popup>

    <uni-popup ref="changePopup" type="dialog">
      <uni-popup-dialog
        title="转换分级"
        :content=rankContent
        @confirm="changeUserRank"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<style>
page {
  background-color: #f4f4f4;
}
</style>

<style lang="scss" scoped>
.viewport {
  padding: 20rpx;
}

/* 列表 */
.list {
  padding: 0 20rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;

  button {
    padding: 0;
  }

  .item {
    line-height: 90rpx;
    padding-left: 10rpx;
    font-size: 30rpx;
    color: #333;
    border-top: 1rpx solid #ddd;
    position: relative;
    text-align: left;
    border-radius: 0;
    background-color: #fff;

    &::after {
      width: auto;
      height: auto;
      left: auto;
      border: none;
    }

    &:first-child {
      border: none;
    }
  }

  .arrow {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      color: #e3d4d4;
      font-size: 48rpx;
      transform: rotateZ(90deg);
    }
  }
}

/* 操作按钮 */
.action {
  text-align: center;
  line-height: 90rpx;
  margin-top: 40rpx;
  font-size: 32rpx;
  color: #333;

  .button {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
  }
}
</style>
