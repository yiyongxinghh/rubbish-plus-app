<template>
  <!-- 头部 -->
  <RpTitle :title="'上传'" />
  <scroll-view scroll-y class="add-container">
    <input
      type="text"
      class="add-input name"
      v-model="garbageData.garbageName"
    />
    <input
      type="text"
      class="add-input type"
      v-model="garbageData.garbageType"
    />
    <input
      type="text"
      class="add-input des"
      v-model="garbageData.garbageDescription"
    />
    <view class="item count">
      <text>库存</text>
      <uni-number-box class="number" v-model="garbageData.garbageAmount" />
    </view>
    <view class="item count">
      <text>金额</text>
      <uni-number-box class="number" v-model="garbageData.garbagePrice" />
    </view>
    <view class="item category">
      <text>分类</text>
      <uni-data-select
        v-model="garbageData.category"
        :localdata="categoryList"
        @change="change()"
      ></uni-data-select>
    </view>
    <view class="item img">
      <text>图片</text>
      <uni-file-picker limit="1" @select="upload"></uni-file-picker>
    </view>
    <view class="footer">
      <button>取消</button>
      <button @click="confirm">确定</button>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getCategories } from "@/services/home";
import { addGarbageAPI } from "@/services/user";
import { showToast } from "@/utils/index";
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/userStore";
import { ref, reactive } from "vue";
//验证库
import validator from "validator";

const userStore = useUserStore();

const categoryList = ref([]);

const garbageData = reactive({
  garbageName: "",
  garbageType: "",
  garbageAmount: 1,
  garbagePrice: 1,
  garbageDescription: "",
  category: 0,
});

const change = () => {
  console.log(garbageData.category);
};

//上传
let fileUrl: string = "";
let pic: string;
const upload = (files: any) => {
  console.log(files);
  fileUrl = files.tempFilePaths[0];
  console.log(fileUrl);
};


const confirm = async () => {
  if (!validator.isLength(garbageData.garbageName, { min: 1 })) {
    return showToast("请输入废品名称", false);
  }
  if (!validator.isLength(garbageData.garbageType, { min: 1 })) {
    return showToast("请输入废品类型", false);
  }
  if (!validator.isLength(garbageData.garbageDescription, { min: 1 })) {
    return showToast("请输入废品描述", false);
  }
  if (garbageData.category === 0) {
    return showToast("请选择分类", false);
  }
  if (!validator.isLength(fileUrl, { min: 1 })) {
    return showToast("请上传图片", false);
  }
  uni.uploadFile({
    url: "https://server.rubbish-plus.top/pic/upload",
    filePath: fileUrl,
    name: "file",
    header: {
      "Content-Type": "multipart/form-data",
    },
    success: (uploadFileRes: any) => {
      console.log(uploadFileRes);
      const responseData = JSON.parse(uploadFileRes.data); // 解析JSON字符串
      const pic = responseData.data.identifiers[0].picId;
      addGarbageAPI({ ...garbageData, pic, user: userStore.userDate!.userId })
        .then(() => {
          showToast("上传成功", true);
        })
        .catch((error) => {
          showToast("上传失败", false);
        });
    },
  });
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

  .img {
    .uni-file-picker {
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

  .footer {
    height: 200rpx;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
