<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="我的课程" showBack="true">
      <span slot="rightbtn" class="add" @click="goAdd">
        <i class="cubeic-add"></i>添加课程
      </span>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="courses"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul v-for="item in courses" :key="item.id">
              <li>
                <div class="info">
                  <span class="name">{{item.courseName}}</span>
                  <!-- <span class="coursetime">每课时{{item.time}}</span> -->
                  <span class="price">价格：{{item.price}}/每课时</span>
                </div>
                <div class="content">
                  <p>{{item.detail}}</p>
                </div>
              </li>
            </ul>
          </cube-scroll>
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
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      courses: [
        {
          id: "1",
          name: "力量瑜伽",
          time: "1小时",
          price: "120.0",
          content:
            "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
        }
      ]
    };
  },
  mounted(){
    let id = sessionStorage.getItem('userId');
     this.$post('api/course/listCourseByCoachId',id).then(res=>{
          if(res.code===1){
            this.courses = res.data;
          }
        })
  },
  methods: {
    goAdd(){
      this.$router.push('/addcourse');
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.items.unshift(_foods[1]);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    },
    onPullingUp() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          let newPage = _foods.slice(0, 5);
          this.items = this.items.concat(newPage);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.add {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0px 15px;
  color: #fff;
  font-size: 16px;
}

.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #eee;
}

li {
  min-height: 150px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: 15px;
  background-color: #fff;
  box-shadow: 0 0 5px #aaa;
}

.info {
  height: 70px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 0 0 15px;
  line-height: 22px;
  border-bottom: 1px solid #ccc;
  margin: 0 10px;
}

.name {
  font-size: 19px;
  line-height: 22px;
}

.coursetime {
  font-size: 14px;
  color: #bbb;

}

.price {
  font-size: 14px;
  color: #bbb;
}
.content {
  text-align: left;
  padding: 5px;
  line-height: 20px;
  margin: 0 10px;
}

.content p {
  word-wrap: break-word;
}
</style>
