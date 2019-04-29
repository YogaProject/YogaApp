<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="提现" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-select v-model="money" :options="options"></cube-select>

          <div class="box">
            <p>提现金额</p>
            <cube-input v-model="value" type="number" :clearable="clearable">
              <span slot="prepend">￥</span>
            </cube-input>
            <p>可用余额 {{remain}}元</p>
          </div>
          <cube-button @click="withdraw">预计两小时内到账，确认提现</cube-button>
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
        money:'',
      value: "",
      remain: "0.00",
      clearable: {
        visible: true,
        blurHidden: false,
       
      },
       options: ["尾号0111", "尾号0112", "尾号0113", "尾号0114"]
    };
  },
  methods: {
      withdraw(money,value){

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
.box {
  font-size: 20px;
  margin-bottom: 30px;
  background-color: #fff;
}

.box p {
  font-size: 14px;
  text-align: left;
  padding: 20px 20px;
  height: 30px;
  line-height: 30px;
}
.box span {
  font-size: 20px;
  font-weight: 700;
  padding: 0 20px;
}
</style>
