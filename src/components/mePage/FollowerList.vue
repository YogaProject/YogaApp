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
            <cube-input v-model="search" :clearable="clearable" placeholder="搜索">
              <i slot="append" class="cubeic-search"></i>
            </cube-input>
            <ul v-for="item in list" :key="item.id">
              <li class="column">
                <div
                  class="avatar"
                  :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+item.userHeadimg|| '') + ')'}"
                ></div>
                <span>
                  {{item.userNickName}}
                  <i class="cubeic-vip">vip{{item.userLevel}}</i>
                </span>
                <span class="is follow" v-if="item.followStatus===1">互相关注</span>
                <span class="is follow" v-if="item.followStatus===0">已关注</span>
                <span
                  class="not follow"
                  v-if="item.followStatus!=1&&userId!=item.userId&&item.followStatus!=0"
                  @click="follow(item.userId)"
                >
                  <i class="cubeic-add"></i>关注
                </span>
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
      clearable: {},
      search: "",
      role: "",
      title: "我的粉丝",
      list: [],
      userId: 0
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
    this.userId = sessionStorage.getItem("userId");

    this.getList();
  },
  methods: {
    getList() {
      let id = "";
      if (this.$route.params.id == undefined) {
        id = sessionStorage.getItem("userId");
      } else {
        id = this.$route.params.id;
      }

      let user = {
        state: 0,
        userId: id
      };
      this.$post("/api/follow/showFollowList", user).then(res => {
        // getList(){   this.$post('/api/user/getAllMyFans',0).then(res=>{
        if (res.code === 1) {
          this.list = res.data;
        }
      });
    },
    follow(userId) {
      //   关注此人
      this.$post("/api/follow/addFollow", userId).then(res => {
        const toast = this.$createToast({
          txt: res.message,
          type: "correct"
        });
        toast.show();
        this.getList();
      });
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
.cubeic-search {
  padding-right: 15px;
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

.not {
  background-color: #ffeaa7;
}
</style>
