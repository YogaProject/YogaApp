<template>
  <div :style="{height:clientHeight-50+'px'}">
    <!-- cube-page  -->
    <cube-page title="所有场馆">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="venues"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <cube-input v-model="search" :clearable="clearable" placeholder="搜索">
              <i slot="append" class="cubeic-search" @click="search(search)"></i>
            </cube-input>
            <baidu-map
              class="map"
              :center="{lng: 116.404, lat: 39.915}"
              :zoom="15"
              :style="{height:clientHeight-100+'px'}"
            >
              <bm-marker
                v-for="item in locations"
                :key="item"
                :position="item"
                :dragging="true"
                animation="BMAP_ANIMATION_BOUNCE"
                @click="infoWindowOpen"
              >
                <!-- <bm-label content="教练A" :offset="{width: -35, height: 30}"/> -->
                <bm-info-window
                  :show="show"
                  @close="infoWindowClose"
                  @open="infoWindowOpen"
                  class="window"
                  @click="goDetail(venues[0].id)"
                >
                  <div class="avatar" ></div>
                  <p class="name">{{venues[0].name}}</p>
                  <p>{{venues[0].location}}</p>
                </bm-info-window>
              </bm-marker>
            </baidu-map>
          </cube-scroll>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "venues",
  components: {
    CubePage
  },
  data() {
    return {
      show: false,
      search: "",
      clientHeight: "",
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      locations: [{ lng: 116.404, lat: 39.915 }],
      venues: [
        {
          id: "1",
          name: "梅溪湖",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          location: "湖南长沙",
          img: ""
        },
        {
          id: "2",
          name: "梅溪湖",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          location: "湖南长沙",
          img: ""
        },
        {
          id: "3",
          name: "梅溪湖",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          location: "湖南长沙",
          img: ""
        },
        {
          id: "4",
          name: "梅溪湖",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          location: "湖南长沙",
          img: ""
        }
      ]
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
  },
  methods: {
    goDetail(id) {
      this.$router.push({ path: "/venuedetail" });
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    search(search) {},
    handleClick(id) {},
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
.avatar {
  border-radius: 50%;
  margin: 6px 20px 6px 6px;
  min-width: 50px;
  width: 50px;
  height: 50px;
  background-color: #aaa;
  background-size: cover;
  outline: none;
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
.bkimage {
  width: 345px;
  height: 150px;
  background-color: #aaa;
  position: relative;
}

.content {
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.content p {
  word-wrap: break-word;
}

.cubeic-search {
  padding-right: 15px;
}

.window {
  font-size: 18px;
  display: flex;
  flex-direction: column;
  width: 200px;
}
</style>


