<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="充值记录" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="logs"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul v-for="log in logs" :key="log.id">
              <li>
                <span class="left">
                  <i class="type">{{log.type}}</i>
                  <i class="time">{{log.time}}</i>
                </span>
                <span class="right">￥{{log.money}}</span>
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
  name: "depositLog",
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
      logs: [
        {
          id: "1",
          time: "2019-09-09 22:22:22",
          type: "充值",
          money: "0.00"
        },
        {
          id: "2",
          time: "2019-09-09 22:22:22",
          type: "提现",
          money: "0.00"
        }
      ]
    };
  },
  methods: {
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
}

li {
  border-bottom: 1px solid #ccc;
  height: 80px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 20px;
  flex: 1;
}

.right {
  text-align: right;
  margin-right: 20px;
  flex: 1;
}

.type {
  font-style: normal;
  font-size: 17px;
  font-weight: 700;
  margin: 10px 0;
}

.time {
  font-style: normal;
  font-size: 14px;
  color: #aaa;
}
</style>
