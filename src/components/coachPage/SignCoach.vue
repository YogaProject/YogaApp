<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="约私教" showBack>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <div class="box">
            <header>确认订单</header>
            <p>已选择教练：{{coach.name}}</p>
            <p>选择课程：</p>
            <cube-select
              v-model="course"
              title="课程"
              :options="courses"
              @change="change"
              placeholder="选择课程"
            ></cube-select>
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
      courses: [],
      course: {},
      data: [],
      coach: {
        name: "郑云龙"
      },
      money: "",
      coachId: 0
    };
  },
  mounted() {
    // 请求课程列表，select
    this.coachId = this.$route.params.id;
    this.$post("/api/user/getDetailInfoByUserId", this.coachId).then(res => {
      this.coach.name = res.data.realName;
    });
    this.$post("/api/course/listCourseByCoachId", this.coachId).then(res => {
      if (res.code === 1) {
        this.data = res.data;
        console.log("data1" + this.data);
        for (let i = 0; i < this.data.length; i++) {
          let item = {
            value: this.data[i].courseId,
            text: this.data[i].courseName
          };
          console.log("item" + item);

          this.courses.push(item);
        }
        console.log("courses" + this.courses);
      }
    });
    console.log("data" + this.data);
  },
  methods: {
    change(value, index, text) {
      console.log("change", value, index, text);
      for (let i = 0; i < this.data.length; i++) {
        console.log("!!!");
        if (this.data[i].courseId === value) {
          this.money = this.data[i].price;
        }
      }
      // this.course = text;
    },
    confirm() {
      console.log("course" + this.course);
      let order = {
        accepterId: this.coachId,
        courseId: this.course
      };
      this.$post("/api/student/saveOrder", order).then(res => {
        if (res.code === 1) {
          console.log('courseName'+res.data[0].course.courseName)
          const toast = this.$createToast({
            time: 1000,
            txt: res.message
          });
          toast.show();
          this.$router.push({path:"/userorder",query:{
            orderInfo:res.data
          }
          });
        }
      });
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
