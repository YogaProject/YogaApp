<template>
  <div class="box" ref="box">
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
    <cube-tab-panels v-model="selectedLabel" class='panel' :style="{width: clientWidth+'px'}">
      <cube-tab-panel v-for="item in tabs" :label="item.label" :key="item.label" >
        <component v-bind:is="item.component" @goRegister="goRegister" :width="clientWidth"></component>
      </cube-tab-panel>
    </cube-tab-panels>
    <!-- footer做一个下拉显示的动画效果 -->
   <login-footer></login-footer>
  </div>
</template>
<script>
import PhoneBox from "@/components/loginPage/PhoneLogin";
import EmailBox from "@/components/loginPage/EmailLogin";
import Footer from "@/components/loginPage/Footer"
export default {
  name: "loginPage",
  components: {
    "login-phone-box": PhoneBox,
    "login-email-box": EmailBox,
    "login-footer":Footer
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
          component: "login-phone-box",
          icon: "cubeic-mobile-phone"
        },
        {
          label: "email",
          name: "邮箱",
          component: "login-email-box",
          icon: "cubeic-email"
        }
      ]
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //document.body.clientWidth;
    console.log('height:'+this.clientHeight);
    this.clientWidth = `${document.body.clientWidth}`;
        console.log('width:'+this.clientWidth);
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

    goRegister(){
      this.$emit("goRegister");
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

/* logo */
.logo {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: #55efc4;
  font-size: 72px;
  height: 200px;
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
