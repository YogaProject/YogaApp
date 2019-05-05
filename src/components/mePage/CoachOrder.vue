<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="我的订单" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="orders"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
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
                    {{item.accepter.nickname}}
                    <i class="cubeic-vip">vip{{item.accepter.level}}</i>
                  </div>
                  <div class="course">
                    <span>课程名称：{{item.course.courseName}}</span>
                    <span>课程描述：{{item.course.courseDetail}}</span>
                    <span>课程价格：￥{{item.course.coursePrice}}元</span>
                  </div>
                  <p class="total">总计：￥{{item.orderMoney}}元</p>
                </div>
                <div class="opration">
                  <cube-button v-if="item.orderStatus==='待确认'" @click="checkOrder(item.orderId)">确认</cube-button>
                  <cube-button v-if="item.orderStatus==='待确认'" @click="cancelOrder(item.orderId)">取消</cube-button>
                  <cube-button
                    v-if="item.orderStatus==='教练已确认'"
                    @click="completeOrder(item.orderId)"
                  >完成</cube-button>
                  <cube-button v-if="item.orderStatus==='已完成'" @click="goComment">查看评论</cube-button>
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
  name: "coachOrder",
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
          createtime: "2019-02-02 16:44:44",
          updatetime: "2019-03-01 16:44:44",
          course: {
            courseName: "花腔",
            courseDetail: "没有",
            coursePrice: "180.0"
          },
          orderMoney: "179.0",
          orderStatus: "已确认"
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$post("/api/user/listOrder").then(res => {
        if (res.code === 1) {
          this.orders = res.data;
        }
      });
    },
    checkOrder(orderId) {
      let order = {
        orderId: orderId,
        result: "accept"
      };
      this.$post("/api/coach/updateOrderForNewOrder", order).then(res => {
        console.log(res.message);
        if (res.code === 1) {
          this.getData();
        }
      });
    },
    cancelOrder(orderId) {
      let order = {
        orderId: orderId,
        result: "cancel"
      };
      this.$post("/api/coach/updateOrderForNewOrder", order).then(res => {
        console.log(res.message);
        if (res.code === 1) {
          this.getData();
        }
      });
    },
    completeOrder(orderId) {
      this.$post("/api/coach/updateOrderForWaitToPay", orderId).then(res => {
        console.log(res.message);
        if (res.code === 1) {
          this.getData();
        }
      });
    },
    goComment() {
      this.$router.push("/comments");
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(_foods[1]);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
    onPullingUp() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = _foods.slice(0, 5);
          this.items = this.items.concat(newPage);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
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
  /* border: 1px solid red; */
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
}
</style>

<style>
</style>

