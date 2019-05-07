<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="我的钱包" showBack>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <!-- 余额 -->
          <div class="remain">
            <p class="name">余额：</p>
            <p>￥{{data.remain}}元</p>
          </div>
          <!-- 充值提现 -->
          <div class="deposit">
            <!-- <div class="column">
              <router-link to="/deposit">
                绑定银行卡
                <i class="cubeic-arrow"/>
              </router-link>
            </div> -->
            <div class="column">
              <router-link to="/deposit">
                充值
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column" v-if="data.role==='2'">
              <router-link to="/withdraw">
                提现
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
          </div>
          <!-- 优惠券、交易记录 -->
          <div class="coupons">
            <div class="column">
              <router-link to="/coupons">
                优惠券
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/depositLog">
                充值记录
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "purse",
  components: {
    CubePage
  },
  data() {
    return {
      data: {
        role: "",
        remain: "0"
      }
    };
  },
  mounted() {
    this.data.role = sessionStorage.getItem("roleId")
    let userId = sessionStorage.getItem("userId");
    this.$post("/api/wallet/selectwallet", userId).then(res => {
      if (res.code === 1) {
        this.data.remain = res.data.balance;
      } else {
        const toast = this.$createToast({
          txt: res.message,
          type: "txt"
        });
        toast.show();
      }
    });
  },
  methods: {}
};
</script>
<style scoped>
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 16px;
  background-color: #eee;
}

.remain {
  height: 120px;
  line-height: 40px;
  box-shadow: 0 0 5px #aaa;
  margin-bottom: 20px;
  background-color: #fff;
}
.name {
  padding-top: 20px;
  text-align: left;
  margin-left: 40px;
  font-size: 20px;
  font-weight: 700;
}
.column {
  /* border:1px solid red; */
  height: 50px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 0 5px #aaa;
  line-height: 50px;
  text-align: left;
  padding-left: 40px;
}

.cubeic-arrow {
  float: right;
  margin-right: 30px;
}
</style>
