<template>
  <view class="order-container">
    <!-- 头部 -->
    <RpTitle :title="'我的订单'" />
    <!-- 订单列表 -->
    <scroll-view scroll-y class="order-content">
      <uni-collapse accordion>
        <uni-collapse-item
          :title="`订单${order.orderId}--${dayjs(order.orderDate).format(
            'YYYY-MM-DD HH:mm:ss'
          )}`"
          :border="false"
          v-for="order in orderList"
        >
          <uni-list v-if="order.orderToGarbage.length !== 0">
            <uni-list-item
              v-for="garbage in order.orderToGarbage"
              :thumb="garbage.garbage.pic.picUrl"
              :title="garbage.garbage.garbageName"
              :note="`购买数量${garbage.garbageQuantity}`"
              :rightText="order.orderIsSign ? '已签收' : '未签收'"
              clickable
              @click="open(order.orderId)"
            />
          </uni-list>
          <uni-list v-else>
            <uni-list-item
              :title="order.orderDescription"
              :rightText="order.orderIsSign ? '已签收' : '未签收'"
              clickable
              @click="open(order.orderId)"
            />
          </uni-list>
        </uni-collapse-item>
      </uni-collapse>
    </scroll-view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog title="签收" @confirm="isSign()">
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { findUserAllOrderAPI } from "@/services/user";
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const { userDate } = useUserStore();

const popup = ref()
const orderId = ref()

const orderList = ref([]);
const findUserAllOrder = async () => {
  const { data } = await findUserAllOrderAPI(
    userDate.userId,
    userDate.userRank,
    "",
    ""
  );
  console.log(data);

  orderList.value = data;
};

const open = (id: number)=>{
  orderId.value = id
  popup.value.open()
}

//签收
const isSign = () => {};

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
