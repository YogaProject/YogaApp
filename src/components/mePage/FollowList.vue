<template>
  <div>
    <!-- cube-page  -->
    <cube-page :title="title" showBack>
      <div slot="content">
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="list"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <!-- 搜索框 -->
            <cube-input v-model="searchValue" :clearable="clearable" placeholder="搜索">
              <i slot="append" class="cubeic-search" @click="search(searchValue)"></i>
            </cube-input>
            <ul v-for="item in list" :key="item.followId">
              <li class="column">
                <div class="avatar" @click="goPage"></div>
                <span>
                  {{item.userNickName}}
                  <i class="cubeic-vip">vip{{item.userLevel}}</i>
                </span>
                <span class="is follow" v-if="item.followStatus===1">互相关注</span>
                <span class="not follow" v-if="item.followStatus===0">已关注</span>
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
  name: "followList",
  components: {
    CubePage
  },
  data() {
    return {
      searchValue:'',
      clearable: {},
      role: "",
      title: "我的关注",
      list: []
    };
  },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      };
    }
  },
  mounted() {
    this.$post("/api/follow/showFollowList", 1).then(res => {
      if (res.code === 1) {
        this.list = res.data;
      }
    });
  },

  methods: {
    search(searchValue){
      this.$post('api/follow/searchFollow',searchValue).then(res=>{
         if (res.code === 1) {
        this.list = res.data;
      }
      else{
         const toast = this.$createToast({
          txt: res.message,
          type: "correct"
        });
        toast.show();
      }
      })
    },
    goPage() {
      //   跳转个人页面
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
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
  font-size: 16px;
}
.avatar {
  border-radius: 50%;
  margin: 6px 6px 6px 20px;
  min-width: 20px;
  width: 35px;
  height: 35px;
  background-color: #aaa;
  background-size: cover;
  outline: none;
  display: inline-block;
}
.cubeic-search {
  padding-right: 15px;
}
.column {
  height: 70px;
  border-bottom: 1px solid #aaa;
  line-height: 70px;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  margin: 0 5px;
}
.cubeic-vip {
  font-size: 12px;
  border-radius: 10px;
  padding-left: 2px;
  padding-right: 3px;
  background-color: yellow;
}
.follow {
  height: 30px;
  width: 60px;
  border-radius: 16px;
  background-color: #ddd;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  position: fixed;
  right: 15px;
}
</style>
