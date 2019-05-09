<template>
  <div :style="{height:clientHeight-50+'px'}">
    <!-- cube-page  -->
    <cube-page title="教练">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <!-- 搜索框 -->
          <cube-input v-model="searchValue" :clearable="clearable" placeholder="搜索">
            <i slot="append" class="cubeic-search" @click="search(searchValue)"></i>
          </cube-input>
          <baidu-map
            class="map"
            :center="mylocation"
            :zoom="11"
            :style="{height:clientHeight-100+'px'}"
          >
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

            <!-- <bm-marker :position="mylocation" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            </bm-marker>-->
            <bm-marker
              v-for="item in list"
              :key="item.userId"
              :position="position = {lng:item.longitude,lat:item.latitude}"
              :dragging="false"
              animation="BMAP_ANIMATION_BOUNCE"
              @click="goDetail(item.userId)"
            >
              <bm-label
                :content="item.realName+'('+item.coachStyle+')'"
                :labelStyle="{'border': '2px solid #55efc4',
  'border-radius': '16px',
  'font-size':'14px',}"
                :offset="{width: -35, height: 30}"
              />
              <!-- <bm-info-window
                :show="show"
                :position="windowPosition"
                @close="infoWindowClose"
                @open="infoWindowOpen"
                class="window"
              >
                <div class="left">
                  <div
                    class="avatar"
                    @click="goDetail(item.userId)"
                    :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+item.headImg|| '') + ')'}"
                  ></div>
                  <p class="name">{{item.realName}}</p>
                </div>
                <div class="right">
                  <p>{{item.coachStyle}}</p>
                </div>
              </bm-info-window>-->
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
      windowPosition: { lng: 0, lat: 0 },
      clearable: {
        visible: true,
        blurHidden: false
      },
      windowInfo: {},
      searchValue: "",
      clientHeight: "",
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      show: true,
      list: [],
      userImg: ""
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
        this.userImg = "http://47.111.104.78:8082" + res.data.headImg;

        console.log(this.userImg);
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
    goDetail(id,roleId) {
      this.$router.push({ path: '/personalPage',query:{id:id,roleId:2}});
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
</style>
<style>

</style>



