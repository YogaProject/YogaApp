<template>
  <div class="box" ref="box">
    <span class="goLogin" @click="goLogin">
      <i class="cubeic-back"></i>
      已有账号？返回登录
    </span>
    <h1 class="logo">YOGA</h1>
    <!-- router?tab?切换component -->
    <cube-tab-bar v-model="selectedLabel" show-slider inline @click="clickHandler" id="tab">
      <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{item.name}}
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel" :style="{width: clientWidth+'px'}">
      <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label">
        <component v-bind:is="item.component"></component>
      </cube-tab-panel>
    </cube-tab-panels>
    <!-- footer做一个下拉显示的动画效果 -->
    <register-footer></register-footer>
  </div>
</template>
<script>
import PhoneBox from "@/components/registerPage/PhoneRegister";
import EmailBox from "@/components/registerPage/EmailRegister";
import Footer from "@/components/loginPage/Footer";
export default {
  name: "RegisterPage",
  components: {
    "register-phone-box": PhoneBox,
    "register-email-box": EmailBox,
    "register-footer": Footer
  },
  data() {
    return {
      clientHeight: "",
      clientWidth:"",
      selectedLabel: "phone",
      tabs: [
        {
          label: "phone",
          name: "手机",
          component: "register-phone-box",
          icon: "cubeic-mobile-phone"
        },
        {
          label: "email",
          name: "邮箱",
          component: "register-email-box",
          icon: "cubeic-email"
        }
      ]
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    //console.log(self.clientHeight);
      this.clientWidth = `${document.body.clientWidth}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  },

  methods: {
    changeFixed(clientHeight) {
      //动态修改样式
      console.log(clientHeight);
      this.$refs.box.style.height = clientHeight + "px";
    },

    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    goLogin() {
      this.$emit("goLogin");
    }
  }
};
</script>
<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* 回去登录 */
.goLogin {
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 10px;
  align-self: flex-start;
  margin-left: 5px;
}

/* logo */
.logo {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: #55efc4;
  font-size: 72px;
  /* height: 200px; */
  /* width: 250px; */
  /* margin-left: 60px;
  margin-top: 80px; */
}
/* tabbar */
#tab {
  font-size: 16px;
  width: 270px;
  text-align: center;
}
</style>
