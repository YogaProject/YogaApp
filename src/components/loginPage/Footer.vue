<template>
  <div class="footer">
    <div>
      <span class="line"></span>
      <span class="txt">
        第三方快捷登录
        <i :class="icon" @click="pull"></i>
      </span>
      <span class="line"></span>
    </div>
    <transition name="fade">
      <div v-if="show">
        <a href="#">
          <span class="qq">QQ登录</span>
        </a>
        <span class="seperator">|</span>
        <span class="wb">
          <a href="#">微博登录</a>
        </span>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      show: false,
      icon: "cubeic-pulldown"
    };
  },
  methods:{
        pull() {
      //第三方登录下拉
      this.show = !this.show;
      if (this.icon === "cubeic-pulldown") {
        this.icon = "cubeic-pullup";
      } else {
        this.icon = "cubeic-pulldown";
      }
    },
  }
};
</script>
<style scoped>
/* footer */
.footer {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 80px; */
  font-size: 12px;
  color: #aaaaaa;
  line-height: 30px;
}
.line {
  display: inline-block;
  width: 100px;
  /* // 横线长度 */
  border-top: 1px solid #ccc;
  margin-bottom: 5px;
  /* 位置//横线移动 */
  margin-left: 10px;

  height: 1px;
  /* //横线厚度 */
}
.txt {
  margin: 0 5px 0 10px;
}
.seperator {
  padding: 0 10px 0 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
