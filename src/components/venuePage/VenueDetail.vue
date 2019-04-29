<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="场馆详情" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <div>
              <div class="content">
                <cube-slide :data="items"/>
                <p class="title">{{data.name}}</p>
                <p class="click">点击量：{{data.clicks}}</p>
                <p class="location">
                  <i class="cubeic-location" @click="openMap">{{data.location}}</i>
                </p>
                <p class="content">{{data.content}}</p>
              </div>
            </div>
          </cube-scroll>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "venueDetail",
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
      items: [
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png"
        },
        {
          url: "http://www.didichuxing.com/",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png"
        }
      ],
      data: {
        id: "1",
        name: "梅溪湖",
        clicks: "22222",
        location: "湖南长沙",
        content: "梅溪湖36人男团由此出道"
      }
    };
  },
  methods: {
    openMap(location) {},
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

.content {
  background-color: #fff;
  min-height: 200px;
  text-align: left;
  margin: 0;
  margin-top: 10px;
  font-size: 16px;
  line-height: 30px;
  padding: 10px;
}
.title {
  font-size: 26px;
  font-weight: 700;
}
.click {
  font-size: 12px;
  color: #ddd;
  border-bottom: 1px solid #eee;
}

.location {
  border-bottom: 1px solid #eee;
  line-height: 50px;
}
</style>


