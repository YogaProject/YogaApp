<template>
  <div>
    <div class="panel">
      <router-view></router-view>
    </div>
    <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler" id="tab">
      <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
        {{item.name}}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
// 判断登录用户的权限
// 传入mainNav的tabs数据

export default {
  name: "mainPage",

  components: {},
  data() {
    return {
      clientHeight: "",
      selectedLabel: "main",
      // 动态改变
      tabs: [
        {
          label: "main",
          name: "首页",
          component: "/main/newsPage",
          icon: "cubeic-home"
        },
        {
          label: "coach",
          name: "教练",
          component: "coach-page",
          icon: "cubeic-search"
        },
        {
          label: "venue",
          name: "场馆",
          component: "venue-page",
          icon: "cubeic-location"
        },
        {
          label: "me",
          name: "我",
          component: "me-page",
          icon: "cubeic-person"
        }
      ]
    };
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`; //
  },
  methods: {
    clickHandler(e) {
      console.log(e);
      switch (e) {
        case "main":
          console.log("!");
          this.$router.push({ path: "/main/newsPage" });
          break;
        case "coach":
          console.log("!");
          this.$router.push({ path: "/main/coachPage" });
          this.selectedLabel = "coach";
          break;
        case "venue":
          console.log("!");
          this.$router.push({ path: "/main/venuePage" });
          this.selectedLabel = "venue";
          break;
        case "me":
          console.log("!");
          this.$router.push({ path: "/main/mePage" });
          this.selectedLabel = "me";
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
/* .panel{
  height:200px;
  overflow: hidden;
} */


.box {
  display: flex;
  flex-direction: column;
}

#tab {
  font-size: 16px;
  height: 50px;
  width: 100%;
  position: absolute;
  z-index: 100;
  /* bottom:0; */
  background-color: #fff;
}
</style>
