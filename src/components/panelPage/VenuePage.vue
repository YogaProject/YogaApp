<template>
  <div :style="{height:clientHeight-50+'px'}">
    <!-- cube-page  -->
    <cube-page title="所有场馆">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
    
            <cube-input v-model="searchValue" :clearable="clearable" placeholder="搜索">
              <i slot="append" class="cubeic-search" @click="search(searchValue)"></i>
            </cube-input>
            <baidu-map
              class="map"
              :center="mylocation"
              :zoom="10"
              :style="{height:clientHeight-100+'px'}"
            >
              <bm-marker
                v-for="item in venues"
                :key="item.userId"
                :position="{lng:item.longitude,lat:item.latitude}"
                :dragging="false"
                animation="BMAP_ANIMATION_BOUNCE"
                @click="infoWindowOpen"
              >
                <!-- <bm-label content="教练A" :offset="{width: -35, height: 30}"/> -->
                <bm-info-window
                  :show="show"
                  @close="infoWindowClose"
                  @open="infoWindowOpen"
                  class="window"
                >
                  <div class="left">
                    <div class="avatar" @click="goDetail(item.userId)"></div>
                    <p class="name">{{item.realName}}</p>
                    <p>{{item.clicks}}</p>
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
      show: false,
      clearable: {},
      searchValue: "",
      clientHeight: "",
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      mylocation: { lng: 104.0, lat: 30.582 },
      venues: []
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    let location = {
      latitude: this.mylocation.lat,
      longitude: this.mylocation.lng
    };
    this.$post("/api/user/listAroundVenueByAddress", location).then(res => {
      console.log("data:" + res.data);

      if (res.code === 1) {
        this.venues = res.data;
        console.log(this.venues);
      } else {
        // 查询不到添加提示
      }
    });
  },
  methods: {
    goDetail(id) {
      console.log(id);
      this.$router.push({ path: `/venuedetail/${id}` });
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    search(searchValue) {
      console.log("searchValue");
    },

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


