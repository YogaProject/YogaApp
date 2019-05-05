<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="我的订单" showBack>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll ref="scroll" :data="orders" :options="options" @pulling-down="onPullingDown">
            <ul v-for="item in orders" :key="item.orderId">
              <li>
                <header>
                  <span class="id">订单编号：{{item.orderId}}</span>
                  <span class="status">{{item.orderStatus}}</span>
                </header>
                <div class="time">
                  <p>创建：{{item.createTime}}</p>
                  <p>上次更新：{{item.updateTime}}</p>
                </div>
                <div class="info">
                  <div>
                    <div class="avatar"></div>
                    {{item.payer.nickname}}
                    <i class="cubeic-vip">vip{{item.payer.level}}</i>
                  </div>
                  <div class="course">
                    <span>课程名称：{{item.course.courseName}}</span>
                    <span>课程描述：{{item.course.courseDetail}}</span>
                    <span>课程价格：￥{{item.course.coursePrice}}元</span>
                  </div>
                  <p class="total">总计：￥{{item.orderMoney}}元</p>
                </div>
                <div class="opration">
                  <cube-button v-if="item.orderStatus==='待付款'" @click="pay(item.orderId)">付款</cube-button>
                  <cube-button v-if="item.orderStatus==='待评价'" @click="goComment(item.orderId)">评论</cube-button>
                  <cube-button v-if="item.orderStatus==='待评价'" @click="refund(item.orderId)">申请退款</cube-button>
                  <cube-button
                    v-if="item.orderStatus==='待确认'"
                    @click="cancelOrder(item.orderId)"
                  >取消订单</cube-button>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "userhOrder",
  components: {
    CubePage
  },
  data() {
    return {
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },

      orderId: "",
      orders: [
        {
          orderId: "1111111111111",
          payer: { payerName: "高天鹤", userLevel: "vip10" },
          accepter: { accepterName: "王晰", userLevel: "vip10" },
          createtime: "2019-02-02 16:44:44",
          updatetime: "2019-03-01 16:44:44",
          course: {
            courseName: "花腔",
            courseDetail: "没有",
            coursePrice: "180.0"
          },
          orderMoney: "179.0",
          orderStatus: "待评价"
        }
      ],
      coupons: [],
      selectCoupon: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      // this.orders = this.$route.query.orderInfo;
      this.$post("/api/user/listOrder").then(res => {
        if (res.code === 1) {
          this.orders = res.data;
        }
      });
      console.log("orders" + this.orders);
    },
    cancelOrder(orderId) {
      this.$post("/api/student/updateOrderForCancel", orderId).then(res => {
        console.log(res.message);
        if (res.code === 1) {
          this.getData();
        }
      });
    },
    refund(orderId){
      // this.$post('/api/student/updateOrderForRefund')
    },
    pay(orderId) {
      // 请求优惠券信息
      this.orderId = orderId;
      this.$fetch("/api/user/listCouponsByUserId").then(res => {
        if (res.code === 1) {
          this.coupons = [];
          this.coupons.push({value:0,text:'无'})
          for (let i = 0; i < res.data.length; i++) {
            let item = {
              value: res.data[i].couponId,
              text: "代金券：" + res.data[i].faceValue
            };
            console.log("coupons" + item.value + item.text);
            this.coupons.push(item);
            console.log("coupons" + this.coupons[0].text);
          }
          if (!this.picker) {
            this.picker = this.$createPicker({
              title: "优惠券",
              data: [this.coupons],
              onSelect: this.selectHandle,
              onCancel: this.cancelHandle
            });
          }
          this.picker.show();
        }
      });
      // 弹出选择优惠券弹框,选择优惠券会触发一个更新方法
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$createDialog({
        type: "warn",
        content: `Selected Item: <br/> - value: ${selectedVal.join(
          ", "
        )} <br/> - index: ${selectedIndex.join(
          ", "
        )} <br/> - text: ${selectedText.join(" ")}`,
        icon: "cubeic-alert"
      }).show();
      this.selectCoupon = selectedVal;
      console.log(this.selectCoupon);
      let coupon = {
        couponId: selectedVal[0],
        orderId: this.orderId
      };
      this.$post("/api/student/updateOrderWithCoupon", coupon).then(res => {
        if (res.code === 1) {
          const toast = this.$createToast({
            txt: "Correct",
            type: "correct"
          });
          toast.show();
          this.$post("/api/student/updateOrderForPay", this.orderId).then(
            res => {
              if (res.code === 1) {
                console.log(res.message);
                this.getData();
              }
            }
          );
          // 付款
        }
      });
    },
    cancelHandle() {
      this.$createToast({
        type: "correct",
        txt: "Picker canceled",
        time: 1000
      }).show();
    },
    goComment(id) {
      this.$router.push({path:"/addcoursecomments",query:{id}});
    },
    onPullingDown() {
      // 模拟更新数据
      this.getData();
    }
  }
};
</script>
<style scoped>
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #eee;
}

li {
  min-height: 150px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 0 5px #aaa;
}
header {
  height: 30px;
  font-size: 14px;
  border-bottom: 1px solid #bbb;
  line-height: 30px;
  /* background-color: rgba(85, 239, 196, 0.4); */
}
.id {
  float: left;
  padding-left: 5px;
}

.status {
  float: right;
  padding-right: 5px;
}

.avatar {
  border-radius: 50%;
  /* margin: 6px 20px 6px 6px; */
  min-width: 30px;
  width: 30px;
  height: 30px;
  background-color: #aaa;
  background-size: cover;
  outline: none;
  display: inline-block;
}
.info {
  min-height: 60px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 0 0 15px;
  line-height: 20px;
  /* border: 1px solid #ccc; */
  margin: 10px;
}

.course {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
}
.cubeic-vip {
  font-size: 12px;
  border-radius: 10px;
  padding-left: 2px;
  padding-right: 3px;
  background-color: yellow;
}
.time {
  font-size: 10px;
  color: #aaa;
  text-align: left;
  line-height: 20px;
  padding-left: 10px;
}

.total {
  padding: 5px 10px 5px 0;
  text-align: right;
}
.opration {
  /* border: 1px solid #000; */
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px 10px;
}
.content {
  text-align: left;
  padding: 5px;
  line-height: 20px;
}

.content p {
  word-wrap: break-word;
}

.cube-btn {
  height: 35px;
  width: 60px;
  font-size: 12px;
  background-color: #fff;
  border: 1px solid #bbb;
  color: #aaa;
  border-radius: 8px;
  line-height: 35px;
  padding: 0;
  margin-left: 10px;
}
</style>

<style>
</style>

