<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="评论" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <!-- <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler" id="tab">
            <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">{{item.name}}</cube-tab>
          </cube-tab-bar> -->
          <cube-scroll
            ref="scroll"
            :data="comments"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul v-for="item in comments" :key="item.id">
              <li>
                <div class="info">
                  <span>
                    {{item.userNickname}}
                    <i class="cubeic-vip">{{item.userLevel}}</i>
                  </span>
                  <span class="time">{{item.commentCreatetime}}</span>
                  <span class="type">{{item.courseName}}</span>
                </div>
                <div class="content">
                  <cube-rate v-model="item.commentDegree" :disabled="true" :max="5" :justify="false"></cube-rate>
                  <p>{{item.commentDetail}}</p>
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
  name: "comments",
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
      selectedLabel: "all",
      tabs: [
        {
          label: "all",
          name: "全部"
        },
        {
          label: "good",
          name: "好评"
        },
        {
          label: "middle",
          name: "中评"
        },
        {
          label: "bad",
          name: "差评"
        }
      ],
      comments: [
        {
          id: "1",
          name: "马佳",
          time: "2019-2-2",
          coursetype: "声乐",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          rate: 3,
          userLevel: "vip2"
        }
      ]
    };
  },
  mounted() {
          let coachId = this.$route.query.coachId;
    let userId = sessionStorage.getItem("userId");
    this.$post("/api/user/getAllMyComments",coachId).then(res => {
      if (res.code === 1) {
        this.comments = res.data;
      } else {
        const toast = this.$createToast({
          txt: res.message,
          type: "txt"
        });
        toast.show();
      }
    });
  },
  methods: {
    clickHandler(e) {},
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
  height: 60px;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 10px 0 0 15px;
  line-height: 20px;
}
#tab {
  font-size: 14px;
  height: 40px;
  background-color: #fff;
}
.cubeic-vip {
  font-size: 12px;
  border-radius: 10px;
  padding-left: 2px;
  padding-right: 3px;
  background-color: yellow;
}
.time {
  font-size: 14px;
  color: #aaa;
}

.content {
  text-align: left;
  padding: 5px;
  line-height: 20px;
}

.content p {
  word-wrap: break-word;
}
</style>
<style>
.cube-rate {
  width: 120px;
}
</style>

