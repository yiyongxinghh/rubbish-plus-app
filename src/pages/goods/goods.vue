<script setup lang="ts">
import dayjs from "dayjs";
import { onLoad } from "@dcloudio/uni-app";
import { getGarbageAPI } from "@/services/shop";
import {
  insertGarbageToCollectionAPI,
  findAllCollectionAPI,
} from "@/services/user";
import { sendCommentAPI, findAllGarbagCommentsAPI } from "@/services/comment";
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import type { Garbage, Collection, Comment, User } from "@/types/global";
import AddressPanel from "./components/AddressPanel.vue";
import ServicePanel from "./components/ServicePanel.vue";
import CountPanel from "./components/CountPanel.vue";
import CommentPanel from "./components/CommentPanel.vue";

//获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const user = useUserStore();

//接收页面参数
const query = defineProps<{
  id: string;
}>();

const formData = reactive({
  count: 0,
  address: "",
});

//抽屉
const showLeft = ref();

//弹出层
const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void;
  close: () => void;
}>();
//弹出层条件渲染
const popupName = ref<"address" | "service" | "count" | "comment">();
const openPopup = (name: typeof popupName.value) => {
  popupName.value = name;
  popup.value?.open();
};
//关闭弹出层后执行部分逻辑
const colsePopup = async (value: number | string | object) => {
  switch (popupName.value) {
    case "address":
      formData.address = value as string;
      break;
    case "count":
      formData.count = value as number;
      break;
    case "comment":
      readDetail.value = false;
      commentDetail.value = null;
      if (!value) {
        break;
      }
      const comment = value as Comment;
      if (comment.commentContent === "") {
        return uni.showToast({
          title: "请输入评论内容",
          icon: "none",
        });
      }
      comment.garbage = parseInt(query.id);
      comment.user = user.userDate!.userId;

      await sendCommentAPI(comment);
      await findAllGarbagComments();
      break;
  }
  popup.value?.close();
};

//滚动触底
const guessRef = ref();
const onScrolltolower = () => {
  guessRef.value?.getMore();
};

//咨询商家
const chat = (userId: number) => {
  uni.navigateTo({
    url: `/pagesMember/chat/chat?id=${userId}`,
  });
};

const changeCollection = ref();
const collectionList = ref<Collection[]>([]);
//收藏
const collect = async () => {
  try {
    await insertGarbageToCollectionAPI(
      changeCollection.value,
      parseInt(query.id)
    );
  } catch (error) {
    uni.showToast({
      title: " 收藏失败",
    });
  }
};
//选择
const change = (item: Collection) => {
  changeCollection.value = item.collectionId;
};

//立即购买
const buyNow = () => {
  if (formData.count === 0) {
    return uni.showToast({
      title: "请选择购买数量",
      icon: "none",
    });
  }
  if (formData.address === "") {
    return uni.showToast({
      title: "请选择收货地址",
      icon: "none",
    });
  }
};

//获取商品信息
const garbage = ref<Garbage>();
const getGarbage = async () => {
  const { data } = await getGarbageAPI(+query.id);
  garbage.value = data;
};

//评论列表
const commentList = ref<Comment[]>([]);
//获取指定废品所有评论
const findAllGarbagComments = async () => {
  const { data } = await findAllGarbagCommentsAPI(+query.id);
  commentList.value = data;
};

//是否阅读评论详情
const readDetail = ref(false);
const commentDetail = ref();
const openReadDetail = (comment: Comment) => {
  openPopup("comment");
  commentDetail.value = comment;
  readDetail.value = true;
};

onLoad(async () => {
  await Promise.all([getGarbage(), onScrolltolower(), findAllGarbagComments()]);
  collectionList.value = (await findAllCollectionAPI(
    user.userDate!.userId
  )) as any;
});
</script>

<template>
  <scroll-view
    :scroll-y="true"
    class="viewport"
    @scrolltolower="onScrolltolower"
  >
    <!-- 基本信息 -->
    <view class="goods">
      <!-- 商品主图 -->
      <view class="preview">
        <image mode="aspectFill" :src="garbage?.pic.picUrl" />
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
        <view class="item arrow" @click="openPopup('count')">
          <text class="label">选择</text>
          <text v-if="formData.count === 0" class="text ellipsis">
            请选择购买数量</text
          >
          <text v-else class="text ellipsis selected">
            选择购买数量 {{ formData.count }}</text
          >
          <text class="iconfont">&#xe663;</text>
        </view>
        <view class="item arrow" @click="openPopup('address')">
          <text class="label">送至</text>
          <text v-if="!formData.address" class="text ellipsis">
            请选择收获地址</text
          >
          <text v-else class="text ellipsis selected">
            收获地址 {{ formData.address }}</text
          >
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
            <text class="label">废品分类</text>
            <text class="value">{{ garbage?.category.categoryName }}</text>
          </view>
          <view class="item">
            <text class="label">废品类型</text>
            <text class="value">{{ garbage?.garbageType }}</text>
          </view>
          <view class="item">
            <text class="label">废品描述</text>
            <text class="value">{{ garbage?.garbageDescription }}</text>
          </view>
        </view>
        <!-- 图片详情 -->
        <image mode="aspectFill" :src="garbage?.pic.picUrl"></image>
      </view>
    </view>
    <!-- 评论 -->
    <view class="comment panel">
      <view class="title">
        <text>评价</text>
        <text class="send" @click="openPopup('comment')">发送</text>
      </view>
      <view class="content">
        <uni-list :border="true">
          <!-- 显示圆形头像 -->
          <uni-list-chat
            v-for="comment in commentList"
            :title="(comment.user as User)?.userName"
            :avatar="(comment.user as User)?.pic.picUrl"
            :note="comment.commentContent"
            clickable
            @click="openReadDetail(comment)"
            :time="dayjs(comment.commentTime).format('YYYY-MM-DD HH:mm:ss') as string"
          >
          </uni-list-chat>
        </uni-list>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <RpGuess ref="guessRef" />
  </scroll-view>

  <!-- 用户操作 -->
  <view
    class="toolbar"
    :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }"
  >
    <view class="buttons">
      <view class="user" @click="chat(garbage.user.userId)">咨询</view>
      <view class="addcart" @click="showLeft.open()"> 收藏 </view>
      <view class="buynow" @click="buyNow()"> 立即购买 </view>
    </view>
  </view>

  <!-- 弹出层 -->
  <uni-popup ref="popup" type="bottom" background-color="#fff" :mask-click="false">
    <AddressPanel v-if="popupName === 'address'" @close="colsePopup" />
    <ServicePanel v-if="popupName === 'service'" @close="colsePopup" />
    <CountPanel v-if="popupName === 'count'" @close="colsePopup" />
    <CommentPanel
      v-if="popupName === 'comment'"
      @close="colsePopup"
      :readDetail="readDetail"
      :commentDetail="commentDetail"
    />
  </uni-popup>

  <uni-drawer ref="showLeft" mode="left" :width="320" @close="collect()">
    <scroll-view scroll-y class="close">
      <uni-list>
        <uni-list-item
          clickable
          title="列表文字"
          :rightText="changeCollection === index ? '已选择' : ''"
          v-for="item in collectionList"
          @click="change(item)"
        />
      </uni-list>
    </scroll-view>
  </uni-drawer>
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
    .selected {
      color: #414443;
      font-size: 28rpx;
      font-weight: bolder;
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
  image {
    width: 100%;
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

/* 评论 */
.comment {
  padding-left: 20rpx;
  .title {
    .send {
      border: none;
    }
  }
  .comment-item {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;
    .time {
      font-size: 22rpx;
      color: #ccc;
    }
  }
}

/* 底部工具栏 */
.toolbar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
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

.close {
  height: 100%;
}
</style>
