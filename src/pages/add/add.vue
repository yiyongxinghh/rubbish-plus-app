<template>
  <!-- 头部 -->
  <RpTitle :title="'上传'" />
  <scroll-view scroll-y class="add-container">
    <input type="text" class="add-input name" />
    <input type="text" class="add-input type" />
    <input type="text" class="add-input des" />
    <view class="item count">
      <text>库存</text>
      <uni-number-box class="number" @change="" />
    </view>
    <view class="item count">
      <text>金额</text>
      <uni-number-box class="number" @change="" />
    </view>
    <view class="item category">
      <text>分类</text>
      <uni-data-select
        v-model="categoryId"
        :localdata="categoryList"
        @change="change()"
      ></uni-data-select>
    </view>
    <view class="item img">
      <text>图片</text>
        <uni-file-picker limit="1"></uni-file-picker>
    </view>
    <view class="footer">
      <button>取消</button>
      <button>确定</button>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getCategories } from "@/services/home";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const categoryList = ref([]);
const categoryId = ref(0);

const change = () => {
  console.log(categoryId.value);
};

onLoad(async () => {
  const { data } = await getCategories();
  data.category.forEach((ele: any) => {
    ele.value = ele.categoryId;
    ele.text = ele.categoryName;
  });
  categoryList.value = data.category;
});
</script>

<style>
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
.add-container {
  height: calc(100% - 80rpx);
  background: linear-gradient(
    to right top,
    rgb(55, 58, 75) 0%,
    rgb(49, 51, 67) 20%,
    rgba(56, 59, 77, 0.9) 60%,
    rgba(53, 55, 73, 0.4) 100%
  );

  .add-input {
    position: relative;
    height: 100rpx;
    border-radius: 20rpx;
    margin: 20rpx;
    line-height: 100rpx;
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 28rpx;
    padding-left: 100rpx;

    &::before {
      display: inline-block;
      width: 100rpx;
      height: 100rpx;
      color: rgb(113, 114, 119);
      position: absolute;
      top: 50%;
      left: 10rpx;
      transform: translate(0, -50%);
      white-space: nowrap;
    }
  }

  .item {
    margin: 20rpx;
    color: rgb(113, 114, 119);
    font-size: 28rpx;
    display: flex;
    align-items: center;
  }

  .category {
    .uni-stat__select {
      margin-left: 20rpx;
    }
  }

  .img{
    .uni-file-picker{
        margin-left: 20rpx;
    }
  }

  .number {
    margin: 20rpx;
  }

  .name {
    &::before {
      content: "废品名";
    }
  }

  .type {
    &::before {
      content: "类型";
    }
  }
  .des {
    &::before {
      content: "描述";
    }
  }

  .footer{
    height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
