<template>
  <!-- 头部 -->
  <RpTitle :title="'修改个人信息'" />
  <scroll-view scroll-y class="update-container">
    <input
      type="text"
      class="update-input email"
      v-model="userData.userEmail"
    />
    <input type="text" class="update-input name" v-model="userData.userName" />
    <input
      type="text"
      class="update-input phone"
      v-model="userData.userPhone"
    />
    <input
      type="text"
      class="update-input address"
      v-model="userData.userAddress"
    />
    <input type="text" class="update-input pass" v-model="userData.userPass" />
    <input type="text" class="update-input again" v-model="passAgain" />
    <view class="item img">
      <text>头像</text>
      <uni-file-picker limit="1" @select="upload"></uni-file-picker>
    </view>
    <view class="footer">
      <button>取消</button>
      <button @click="confirm">确定</button>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { showToast } from "@/utils/index";
import { updateUserAPI, findOneUserAPI } from "@/services/user";
import { onLoad } from "@dcloudio/uni-app";
//验证库
import validator from "validator";

const query = defineProps({
  id: {
    type: String,
  },
});
console.log(query.id);

const userData = reactive({
  userEmail: "",
  userName: "",
  userPhone: "",
  userAddress: "",
  userPass: "",
});
const passAgain = ref("");

//上传
let fileUrl: string = "";
const upload = (files) => {
  console.log(files);
  fileUrl = files.tempFilePaths[0];
  console.log(fileUrl);
};

const confirm = async () => {
  if (!validator.isLength(userData.userName, { min: 5, max: 10 })) {
    return showToast("名字长度5-10", false);
  }
  if (!validator.isEmail(userData.userEmail)) {
    return showToast("邮箱不正确", false);
  }
  if (!validator.isMobilePhone(userData.userPhone, "zh-CN")) {
    return showToast("手机不正确", false);
  }
  if (!validator.isLength(userData.userPass, { min: 5, max: 10 })) {
    return showToast("密码长度5-10", false);
  }
  if (!validator.equals(userData.userPass, passAgain.value)) {
    return showToast("两次密码不一致", false);
  }
  if (!validator.isLength(userData.userAddress, { min: 1 })) {
    return showToast("地址太短", false);
  }
  if (fileUrl) {
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
        updateUserAPI(query.id, { ...userData, pic })
          .then(() => {
            showToast("修改成功", true);
          })
          .catch((error) => {
            showToast("修改失败", false);
          });
      },
    });
  } else {
    updateUserAPI(query.id, userData)
      .then(() => {
        showToast("修改成功", true);
      })
      .catch((error) => {
        console.log(error);

        showToast("修改失败", false);
      });
  }
};

onLoad(async () => {
  const { data } = await findOneUserAPI(query.id);
  userData.userEmail = data.userEmail;
  userData.userName = data.userName;
  userData.userPhone = data.userPhone;
  userData.userAddress = data.userAddress;
});
</script>

<style>
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
.update-container {
  height: calc(100% - 80rpx);
  background: linear-gradient(
    to right top,
    rgb(55, 58, 75) 0%,
    rgb(49, 51, 67) 20%,
    rgba(56, 59, 77, 0.9) 60%,
    rgba(53, 55, 73, 0.4) 100%
  );

  .update-input {
    position: relative;
    height: 100rpx;
    border-radius: 20rpx;
    margin: 20rpx;
    line-height: 100rpx;
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 28rpx;
    padding-left: 140rpx;

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

  .img {
    .uni-file-picker {
      margin-left: 20rpx;
    }
  }

  .name {
    &::before {
      content: "用户名称";
    }
  }

  .email {
    &::before {
      content: "用户邮箱";
    }
  }

  .phone {
    &::before {
      content: "用户手机";
    }
  }

  .address {
    &::before {
      content: "用户地址";
    }
  }

  .pass {
    &::before {
      content: "密码";
    }
  }
  .again {
    &::before {
      content: "重复密码";
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
