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
                <p class="title">{{data.realName}}</p>
                <p class="click">点击量：{{data.clicks}}</p>
                <p class="location">
                  <i class="cubeic-location" @click="openMap">{{data.userLocation}}</i>
                </p>
                <p class="content">{{data.content}}</p>
                <cube-button @click="goSign(data.userId)" v-if="role==='2'">签约场馆</cube-button>
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
      role: "",
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      items: [
        {
          url: "",
          image:
            "//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png"
        },
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
  mounted() {
    this.role = sessionStorage.getItem("roleId");
    let id = this.$route.params.id;
    let venue = this.$route.query.venue;
    console.log(id)
    this.$post("/api/user/getVenueDetailInfoByUserId", id).then(res => {
      if (res.code === 1) {
        this.data = res.data;
      }
    });
  },
  methods: {
    goSign(uesrId) {
      this.$createDialog({
        type: "confirm",
        icon: "cubeic-alert",
        title: "签约场馆",
        content: "确定签约此场馆吗？",
        confirmBtn: {
          text: "确定按钮",
          active: true,
          disabled: false
        },
        cancelBtn: {
          text: "取消按钮",
          active: false,
          disabled: false
        },
        onConfirm: () => {
          this.$post("/api/coach/applyForSign", uesrId).then(res => {
            if (res.code === 1) {
              this.$createToast({
                type: "warn",
                time: 3000,
                txt: "已发送签约申请"
              }).show();
            }
            else{
              this.$createToast({
                type: "warn",
                time: 1000,
                txt: res.message
              }).show();
            }
          });
        },
        onCancel: () => {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: "点击取消按钮"
          }).show();
        }
      }).show();
    },
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


