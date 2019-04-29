<template>
    <div>
        <cube-page title="设置" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <div class="list">
            <div class="column info" >
              <router-link to="/personal">
                个人信息
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/permissions">
                隐私
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/binding">
                绑定手机号
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
    
            <div class="column">
              <router-link to="/coachorder">
                关于
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
    name: "settings",
  components: {
    "cube-page": CubePage
  },
    data(){
      return{

      }
    }
}
</script>
<style scoped>
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 16px;
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
