<template>
  <scroll-view :scroll-y="true" class="login-container">
    <view class="panel">
      <view class="login-title">
        <image
          src="@/static/images/rubbish-white.png"
          mode="aspectFit"
          class="login-icon"
        />
        <view>
          <text id="typing">欢迎使用废品回收系统.</text>
        </view>
      </view>
      <view class="scroll" v-if="!isRegister">
        <view class="login-content" v-if="!isCodeLogin">
          <view class="res">
            <view
              >还没有帐号？<text @click="isRegister = !isRegister"
                >注册</text
              ></view
            >
          </view>
          <input class="login-input email" v-model="formData.userEmail" />
          <input
            class="login-input pass"
            password
            v-model="formData.userPass"
          />
        </view>
        <view class="login-content" v-else>
          <input class="login-input email" v-model="formData.userEmail" />
          <view class="login-code">
            <input class="login-input code" v-model="code" />
            <button
              @click="sendCode"
              :disabled="isSendCode"
              :class="{ send: isSendCode }"
            >
              {{ isSendCode ? `code(${codeTime})` : "code" }}
            </button>
          </view>
        </view>
        <view class="login-button">
          <button class="login-btn handel" @click="isCodeLogin = !isCodeLogin">
            切换
          </button>
          <button class="login-btn" @click="login(isCodeLogin)">登录</button>
        </view>
      </view>
      <view class="scroll" v-else>
        <view class="res-content" v-if="!isCodeLogin">
          <view class="res">
            <view
              >已经有帐号了.
              <text @click="isRegister = !isRegister">登录</text></view
            >
          </view>
          <input class="login-input name" v-model="registerFormData.userName" />
          <input
            class="login-input email"
            v-model="registerFormData.userEmail"
          />
          <input
            class="login-input phone"
            v-model="registerFormData.userPhone"
          />
          <input
            class="login-input pass"
            password
            v-model="registerFormData.userPass"
          />
          <input
            class="login-input again"
            password
            v-model="registerFormData.againPass"
          />
          <input
            class="login-input address"
            v-model="registerFormData.userAddress"
          />
        </view>
        <view class="login-button">
          <button class="login-btn" @click="register()">注册</button>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import type { userData, registerData } from "@/types/login";
import {
  getCodeAPI,
  emailLoginAPI,
  registerAPI,
  codeVerificationLoginAPI,
} from "@/services/login";
import { useUserStore } from "@/stores/userStore";
//引入打字库
import Typed from "typed.js";
//验证库
import validator from "validator";

//引入用户仓库
const userStore = useUserStore();

//登录表单
const formData = reactive<userData>({
  userEmail: "",
  userPass: "",
});

//是否注册页
const isRegister = ref(false);
//注册表单
const registerFormData = reactive<registerData>({
  userName: "",
  userPass: "",
  againPass: "",
  userEmail: "",
  userAddress: "",
  userPhone: "",
});

//验证码
const code = ref("");
//是否为验证码登录
const isCodeLogin = ref(false);
//是否发送了验证码
const isSendCode = ref(false);
const codeTimer = ref(); //验证码定时器
const codeTime = ref(60); //时间
//发送验证码
const sendCode = async () => {
  try {
    await getCodeAPI(formData.userEmail);
  } catch (error) {
    return showToast("邮箱不存在", false);
  }
  isSendCode.value = true;
  codeTimer.value = setInterval(() => {
    codeTime.value--;
    if (codeTime.value < 0) {
      codeTime.value = 60;
      isSendCode.value = false;
      clearInterval(codeTimer.value);
    }
  }, 1000);
};

// 登录提示
const showToast = (title: string, isSuccess: boolean) => {
  uni.showToast({
    title,
    icon: isSuccess ? "success" : "error",
  });
};

//置空
const empty = () => {
  registerFormData.userEmail = "";
  registerFormData.userPass = "";
  registerFormData.againPass = "";
  registerFormData.userName = "";
  registerFormData.userPhone = "";
  registerFormData.userAddress = "";
};

// 登录
const login = async (isCodeLogin: boolean) => {
  if (isCodeLogin) {
    try {
      const { data } = await codeVerificationLoginAPI(
        formData.userEmail,
        code.value
      );
      if (data.isLogin) {
        userStore.saveUserData(data.user);
        userStore.saveToken(data.access_token);
        showToast("登录成功", true);
        uni.switchTab({
          url: "/pages/index/index",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast("验证码错误", false);
      code.value = "";
      formData.userPass = "";
    }
  } else {
    try {
      const { data } = await emailLoginAPI(
        formData.userEmail,
        formData.userPass
      );
      if (data.isLogin) {
        userStore.saveUserData(data.user);
        userStore.saveToken(data.access_token);
        showToast("登录成功", true);
        uni.switchTab({
          url: "/pages/index/index",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast("用户名或密码错误", false);
      console.log(error);
      formData.userPass = "";
    }
  }
};

// 注册
const register = async () => {
  if (!validator.isLength(registerFormData.userName, { min: 5, max: 10 })) {
    return showToast("名字长度5-10", false);
  }
  if (!validator.isEmail(registerFormData.userEmail)) {
    return showToast("邮箱不正确", false);
  }
  if (!validator.isMobilePhone(registerFormData.userPhone, "zh-CN")) {
    return showToast("手机不正确", false);
  }
  if (!validator.isLength(registerFormData.userPass, { min: 5, max: 10 })) {
    return showToast("密码长度5-10", false);
  }
  if (
    !validator.equals(registerFormData.userPass, registerFormData.againPass)
  ) {
    return showToast("两次密码不一致", false);
  }
  if (!validator.isLength(registerFormData.userAddress, { min: 1 })) {
    return showToast("地址太短", false);
  }
  try {
    await registerAPI(
      registerFormData.userEmail,
      registerFormData.userPass,
      registerFormData.userName,
      registerFormData.userPhone,
      registerFormData.userAddress
    );
    showToast("注册成功", true);
    // 置空
    empty();
    // 返回登录
    isRegister.value = false;
  } catch (error) {
    showToast(error as string, false);
    console.log(error);
  }
};

// //开启自动打字
// const typing = () => {
//   new Typed('#typing', {
//     strings: ['Welcome to rubbish-plus.', '欢迎使用废品回收系统.'],
//     typeSpeed: 50,
//     loop: true,
//     smartBackspace: true,
//     backSpeed: 50,
//     autoInsertCss: true
//   });
// }

onMounted(() => {
  // typing()
});
</script>

<style>
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
@mixin content($height) {
  box-sizing: border-box;
  width: 700rpx;
  height: $height;
  padding: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  .res {
    align-self: start;
    color: #fff;

    text {
      color: rgb(0, 129, 241);
    }
  }

  .login-code {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .send {
      color: #b8bbbe;
      background-color: #38393a;
    }

    button {
      margin-left: 10px;
      width: 300rpx;
      height: 120rpx;
      line-height: 120rpx;
      border: 0;
      font-size: 20px;
      font-weight: 600;
      border-radius: 20px;
      color: #fff;
      background-color: rgb(0, 129, 241);
    }
  }

  .login-input {
    position: relative;
    width: 100%;
    height: 120rpx;
    border-radius: 20rpx;
    box-sizing: border-box;
    line-height: 120rpx;
    border: 1px solid #ccc;
    background-color: rgba(0, 0, 0, 0);
    color: #fff;
    font-size: 28rpx;
    padding-left: 78rpx;

    &::before {
      display: inline-block;
      width: 50px;
      height: 10px;
      color: rgb(113, 114, 119);
      position: absolute;
      top: 14px;
      left: 5px;
      white-space: nowrap;
    }

    &::after {
      content: "";
      display: inline-block;
      width: 40px;
      height: 40px;
      color: rgb(113, 114, 119);
      position: absolute;
      top: 5px;
      left: 5px;
      white-space: nowrap;
      background-size: 60%;
      background-repeat: no-repeat;
      z-index: 1;
    }
  }

  .error {
    border: 1px solid rgb(244, 39, 32);
    box-shadow: 0 0 1px 3px rgb(244, 39, 32);
  }

  .email {
    &::after {
      background-image: url("@/static/images/email.png");
    }

    &::before {
      content: "邮箱";
    }
  }

  .pass {
    &::after {
      background-image: url("@/static/images/lock.png");
    }

    &::before {
      content: "密码";
    }
  }

  .code {
    &::after {
      background-image: url("@/static/images/code.png");
    }

    &::before {
      content: "验证";
    }
  }

  .name {
    &::after {
      background-image: url("@/static/images/name.png");
    }

    &::before {
      content: "名字";
    }
  }

  .phone {
    &::after {
      background-image: url("@/static/images/phone.png");
    }

    &::before {
      content: "手机";
    }
  }

  .again {
    &::after {
      background-image: url("@/static/images/lock-again.png");
    }

    &::before {
      content: "确认";
    }
  }

  .address {
    &::after {
      background-image: url("@/static/images/address.png");
    }

    &::before {
      content: "地址";
    }
  }
}

@mixin button() {
  width: 760rpx;
  display: flex;
  justify-content: space-evenly;

  button {
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: rgb(0, 129, 241);
    border: 0;
    font-size: 20px;
    font-weight: 600;
    border-radius: 20px;
    color: #fff;
    margin: 15px auto;

    &.handel {
      background-color: rgb(81, 235, 104);
    }
  }
}

.login-container {
  height: 100%;
  background: linear-gradient(
    to right top,
    rgb(55, 58, 75) 0%,
    rgb(49, 51, 67) 20%,
    rgba(56, 59, 77, 0.9) 60%,
    rgba(53, 55, 73, 0.4) 100%
  );
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .panel {
    @media (max-width: 767px) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .login-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 36rpx;
      font-weight: bolder;

      .login-icon {
        height: 78rpx;
        margin-bottom: 10rpx;
      }

      #typing {
        display: inline;
      }
    }

    .scroll {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .login-content {
        @include content(400rpx);
      }

      .res-content {
        @include content(880rpx);
      }

      .login-button {
        @include button();
      }
    }
  }
}
</style>
