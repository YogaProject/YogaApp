<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="返回主页" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <router-link to="/main/mePage">前往我的页面></router-link>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "coupons",
  components: {
    CubePage
  },
  data() {
    return {
    }
  },

  methods: {

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
  background-color: #fff;
}
</style>
