<template>
  <div :style="{height:clientHeight-50+'px'}">
    <!-- cube-page  -->
    <cube-page title="教练">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <!-- 搜索框 -->
          <cube-input
            v-model="searchValue"
            :clearable="clearable"
            placeholder="搜索"
            
          >
            <i slot="append" class="cubeic-search" @click="search(searchValue)"></i>
          </cube-input>
          <baidu-map
            class="map"
            :center="mylocation"
            :zoom="10"
            :style="{height:clientHeight-100+'px'}"
          >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

            <!-- <bm-marker :position="mylocation" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>-->
            <bm-marker
              v-for="item in list"
              :key="item.userId"
              :position="{lng:item.longitude,lat:item.latitude}"
              :dragging="false"
              animation="BMAP_ANIMATION_BOUNCE"
              @click="infoWindowOpen"
            >
              <!-- <bm-label content="教练A" :offset="{width: -35, height: 30}"/> -->
              <bm-info-window
                :show="show"
                :key="item.userId"
                :positon="{lng:item.longitude,lat:item.latitude}"
                @close="infoWindowClose"
                @open="infoWindowOpen"
                class="window"
              >
                <div class="left">
                  <div class="avatar" @click="goDetail(item.userId)"></div>
                  <p class="name">{{item.realName}}</p>
                </div>
                <div class="right">
                  <p>{{item.coachStyle}}</p>
                </div>
              </bm-info-window>
            </bm-marker>
          </baidu-map>
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
      mylocation: { lng: 104.0, lat: 30.582 },
      clearable: {
        visible: true,
        blurHidden: false
      },
      searchValue: "",
      clientHeight: "",
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      show: false,
      list: []
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    let location = {
      latitude: this.mylocation.lat,
      longitude: this.mylocation.lng
    };
    this.$post("/api/user/listAroundCoachByAddress", location).then(res => {
      console.log("data:" + res.data);

      if (res.code === 1) {
        this.list = res.data;
        console.log(this.list);
      }
    });
  },
  methods: {
    search(searchValue) {
      let search = {
        realName: searchValue,
        latitude: this.mylocation.lat,
        longitude: this.mylocation.lng
      };

      this.$post("/api/user/listAroundCoachByAddress", search).then(res => {
        if (res.code === 1) {
          this.list = res.data;
        }
      });
    },
    goDetail(id) {
      this.$router.push({ path: `/personalPage/${id}` });
    },
    handleClick(id) {},
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
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
  background-color: #eee;
}

.map {
  width: 100%;
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

.window {
  font-size: 18px;
  display: flex;
  flex-direction: row;
  width: 200px;
}
.left {
  border-right: 1px solid #ccc;
  width: 100px;
}
.cube-rate {
  width: 100%;
}
.right {
  width: 100px;
  line-height: 30px;
  margin: 10px 10px;
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
.cube-input {
  /* width: 90%; */
}
</style>
<style>
</style>



