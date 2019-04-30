<template>
  <div>
    <!-- cube-page  -->
    <cube-page :title="title" showBack="true">
      <div slot="content">
        <div class="view-wrapper">
          <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler" id="tab">
            <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">{{item.name}}</cube-tab>
          </cube-tab-bar>
          <cube-scroll
            ref="scroll"
            :data="list"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <!-- 搜索框 -->
      
            <ul>
              <li v-for="item in list" :key="item.id">
                <div class="column">
                  <div class="avatar" @click="goPage"></div>
                  <span>
                    {{item.name}}
                    <i class="cubeic-vip">{{item.userLevel}}</i>
                  </span>
                </div>
                <p>内容…aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa………………………</p>
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
  name: "notifyPage",
  components: {
    CubePage
  },
  data() {
    return {
      selectedLabel: "all",
      role: "",
      title: "通知",
      tabs: [
        {
          label: "all",
          name: "全部"
        },
        {
          label: "sign",
          name: "签约"
        }
      ],
      list: [
        {
          id: 1,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 2,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 3,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 4,
          name: "王凯",
          userLevel: "vip4",
          isfollow: false
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        },
        {
          id: 5,
          name: "王凯",
          userLevel: "vip4",
          isfollow: true
        }
      ]
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
  methods: {
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

li {
  height: 70px;
  border-bottom: 1px solid #aaa;
  margin: 0 5px;
}
.column {
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}

p {
    width: 80%;
  font-size: 14px;
  text-align: left;
  padding-left: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

#tab {
  font-size: 14px;
  height: 40px;
  background-color: #fff;
}
</style>
