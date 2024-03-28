<template>
  <view class="comment-container">
    <!-- 头部 -->
    <RpTitle :title="'我的评价'" />
    <!-- 评价列表 -->
    <scroll-view scroll-y class="comment-content">
      <uni-list>
        <uni-list-item
          :note="comment.commentContent"
          clickable
          :title="comment.garbage?.garbageName"
          :thumb="comment.user.pic.picUrl"
          :rightText="dayjs(comment.commentTime).format('YYYY-MM-DD HH:mm:ss')"
          v-for="comment in commentList"
        ></uni-list-item>
      </uni-list>
    </scroll-view>
    <!-- <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog title="删除" @confirm="deleteComment()">
      </uni-popup-dialog>
    </uni-popup> -->
  </view>
</template>

<script lang="ts" setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
import dayjs from "dayjs";
import { showToast } from "@/utils/index";
import { findAllUserCommentsAPI, deleteCommentAPI } from "@/services/comment";
import { useUserStore } from "@/stores/userStore";

const { userDate } = useUserStore();

const commentList = ref([]);

const deleteId = ref();

const popup = ref<{
  open: (type?: UniHelper.UniPopupType) => void;
  close: () => void;
}>();
const open = (commentId) => {
  deleteId.value = commentId;
  popup.value.open();
};

//获取所有本用户的评论
const findAllUserComments = async () => {
  const { data } = await findAllUserCommentsAPI(userDate.userId);
  commentList.value = data;
  console.log(data);
};

// const deleteComment = async () => {
//   console.log(deleteId.value);
//   try {
//     await deleteCommentAPI(deleteId.value);
//     await findAllUserComments();
//     showToast("删除成功", true);
//     popup.value.close();
//   } catch (error) {
//     showToast("错误", false);
//   }
// };

// const deleteComment = async (id) => {
//   console.log(id);
  
//   await deleteCommentAPI(id);
// };

onLoad(async () => {
  await findAllUserComments();
});
</script>

<style scoped lang="scss">
page {
  height: 100%;
}
.comment-container {
  height: 100%;
  .comment-content {
    height: calc(100% - 80rpx);
  }
}
</style>
