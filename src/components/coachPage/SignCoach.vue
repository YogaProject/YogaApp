<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="约私教" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <div class="box">
            <header>确认订单</header>
            <p>已选择教练：{{coach.name}}</p>
            <p>选择课程：</p>
            <cube-select v-model="course" title="课程" :options="courses" placeholder="选择课程"></cube-select>
            <p>价格：{{money}}</p>
            <cube-button class="btn" @click="confirm">确认</cube-button>
          </div>
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
      validity: {},
      valid: undefined,
      courses: [{ value: "133", text: "瑜伽1" }],
      course: {},

      coach: {
        name: "郑云龙"
      }
    };
  },
  mounted() {
    // 请求课程列表，select
  },
  computed(){
    money:{
      return this.course.value;
    }
  },
  methods: {
    confirm() {
      // 提交表单
      // 跳转到order界面
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

.box {
  font-size: 16px;
  padding: 15px;
  text-align: left;
  line-height: 50px;
  min-height: 200px;
  margin: 10px 0;
  box-shadow: 0 0 10px #ccc;
}

header {
  border-bottom: 1px solid #ccc;
}
</style>
