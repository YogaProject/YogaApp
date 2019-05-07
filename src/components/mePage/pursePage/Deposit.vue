<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="充值" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-checker v-model="checkerValue" :options="options" type="radio"/>
          <div class="alipay" @click="alipay">支付宝充值</div>
          <div class="alipay" @click="bank">银联支付</div>
          <footer>
            <p>
              <i class="cubeic-warn"></i>充值不退款
            </p>
          </footer>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "comment",
  components: {
    CubePage
  },
  data() {
    return {
      checkerValue: "",
      options: [
        {
          value: 30,
          text: "￥30"
        },
        {
          value: 50,
          text: "￥50"
        },
        {
          value: 100,
          text: "￥100"
        },
        {
          value: 300,
          text: "￥300"
        },
        {
          value: 500,
          text: "￥500"
        },
        {
          value: 1200,
          text: "￥1200"
        }
      ]
    };
  },
  methods: {
    alipay() {
      // 第三方接口
      this.$post("/api/wallet/alipay", this.checkerValue).then(res => {
        const div = document.createElement("div");
        div.innerHTML = res;
        document.body.appendChild(div);
        document.forms[0].submit();
      });
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
}
.alipay {
  height: 60px;
  width: 130px;
  background-color: #0984e3;
  color: white;
  font-size: 18px;
  border-radius: 16px;
  line-height: 60px;
  margin-left: 40px;
  margin-top: 30px;
}

footer {
  position: absolute;
  bottom: 10px;
  font-size: 15px;
  color: #ccc;
}

footer p {
  text-align: center;
  padding-left: 150px;
}
</style>
<style>
.cube-checker-item {
  background-color: #ffeaa7;
  border-radius: 16px;
  height: 60px;
  width: 60px;
  font-size: 18px;
  font-weight: 700;
  margin: 10px 10px 10px 10px;
  line-height: 60px;
  color: #fff;
}
.cube-checker-item_active {
  background-color: #fdcb6e;
}
</style>

