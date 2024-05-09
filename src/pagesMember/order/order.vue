<template>
  <view class="order-container">
    <!-- 头部 -->
    <RpTitle :title="'我的订单'" />
    <!-- 订单列表 -->
    <scroll-view scroll-y class="order-content" v-if="userDate?.userRank !== 1">
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
              @click="open(order)"
            />
          </uni-list>
          <uni-list v-else>
            <uni-list-item
              :title="order.orderDescription"
              :rightText="order.orderIsSign ? '已签收' : '未签收'"
              clickable
              @click="open(order)"
            />
          </uni-list>
        </uni-collapse-item>
      </uni-collapse>
    </scroll-view>
    <scroll-view scroll-y class="order-content" v-else>
      <uni-collapse accordion>
        <uni-collapse-item
          :title="`订单${order.orderId}--${dayjs(order.orderDate).format(
            'YYYY-MM-DD HH:mm:ss'
          )}`"
          :border="false"
          v-for="order in orderList"
        >
          <uni-list>
            <uni-list-item
              :title="order.orderDescription"
              :note="`金额${order.orderMoney}`"
              :rightText="'未配送'"
              clickable
              @click="open(order)"
            />
          </uni-list>
        </uni-collapse-item>
      </uni-collapse>
    </scroll-view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog :title="delivery ? '接单' : '签收'" @confirm="isSign()">
      </uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { findUserAllOrderAPI } from "@/services/user";
import { updateOrderApI, findNullDeliverymanAPI } from "@/services/shop";
import { onLoad } from "@dcloudio/uni-app";
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

const { userDate } = useUserStore();

const popup = ref();
const orderId = ref();

const delivery = ref(false);

const orderList = ref([]);
//获取用户订单
const findUserAllOrder = async () => {
  const { data } = await findUserAllOrderAPI(
    userDate!.userId,
    userDate!.userRank
  );
  console.log(data);

  orderList.value = data;
};

const open = (order: any) => {
  console.log(order);
  orderId.value = order.orderId;
  if (!order.Deliveryman) {
    delivery.value = true;
  }
  popup.value.open();
};

//获取所有配送者为空的订单
const findNullDeliveryman = async () => {
  const { data } = await findNullDeliverymanAPI();
  console.log(data);

  orderList.value = data;
};

//签收
const isSign = async () => {
  if(delivery.value){
    await updateOrderApI(orderId.value, { Deliveryman: userDate!.userId });
  }else{
    await updateOrderApI(orderId.value, { orderIsSign: true });
  }
  if (userDate?.userRank !== 1) {
    await findUserAllOrder();
  } else {
    await findNullDeliveryman();
  }
  delivery.value = false;
};

onLoad(async () => {
  if (userDate?.userRank !== 1) {
    await findUserAllOrder();
  } else {
    await findNullDeliveryman();
  }
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
