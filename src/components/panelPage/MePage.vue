/* eslint-disable */
<template>
  <div :style="{height:clientHeight-50+'px'}">
    <!-- cube-page  -->
    <cube-page title="我">
      <i slot="leftbtn" class="cubeic-setting" @click="goSetting"></i>
      <i slot="rightbtn" class="cubeic-email" @click="goMessage"></i>

      <div slot="content">
        <div class="view-wrapper">
          <!-- 头像、昵称、vip -->
          <div class="meBox">
            <div class="avatar" :style="{backgroundImage: 'url(' + (userImg|| '') + ')'}"></div>
            <span class="name" v-if="role==1">{{data.userNickname}}</span>
            <span class="name" v-if="role==2">{{data.realName}}</span>
            <i class="cubeic-vip">vip{{data.userLevel}}</i>
            <p></p>
          </div>
          <!-- 关注、粉丝、动态、交易入口 -->
          <div class="entrance">
            <div class="block"  @click="goFollow(data.userId)">
                <p class="num">{{data.focus}}</p>关注
            </div>
            <div class="block" @click="goFollower(data.userId)">
                <p class="num">{{data.fans}}</p>粉丝
            </div>
            <div class="block">
              <router-link to="/mynews">
                <p class="num">{{data.info}}</p>动态
              </router-link>
            </div>
            <div class="block" v-if="role==2">
              <router-link to="/comments">
                <p class="num">{{data.comments}}</p>评价
              </router-link>
            </div>
          </div>
          <!-- 钱包等功能入口 ,判断用户身份来展示入口-->
          <div class="list">
            <div class="column" v-if="role==2">
              <router-link to="/course">
                我的课程
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column">
              <router-link to="/purse">
                我的钱包
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
        
            <div class="column" v-if="role==1">
              <router-link to="/userorder">
                我的订单
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <div class="column" v-if="role==2">
              <router-link to="/coachorder">
                我的订单
                <i class="cubeic-arrow"/>
              </router-link>
            </div>
            <!-- <div class="column" v-if="role==2">
              <router-link to="/myvenue">
                我的场馆
                <i class="cubeic-arrow"/>
              </router-link>
            </div> -->
            <!-- <div class="column">
              <router-link to="/">
                *众筹*
                <i class="cubeic-arrow"/>
              </router-link>
            </div>-->
          </div>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "mePage",
  components: {
    "cube-page": CubePage
  },
  data() {
    return {
      follow: 0,
      follower: 0,
      mynews: 0,
      comments: 0,
      clientHeight: "",
      role: "",
      nickName: "",
      userLevel: "",
      userImg: "",
      venue: {
        venueId: "",
        venueName: ""
      },
      data: {}
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    this.role = sessionStorage.getItem("roleId");
    let userId = sessionStorage.getItem("userId");
    if (this.role === "1") {
      this.$post("/api/user/getStudentInfo", userId).then(res => {
        if (res.code === 1) {
          console.log(res.data);
          this.venue.venueId = res.data.venueId;
          this.venue.venueName = res.data.venueName;
          this.userImg = 'http://47.111.104.78:8082' + res.data.userHeadimg;
          this.data = res.data;
        } else {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: res.message
          }).show();
        }
      });
    }
    if (this.role === "2") {
      this.$post("/api/user/getDetailInfoByUserId", userId).then(res => {
        if (res.code === 1) {
          console.log(res.data);
          this.data = res.data;
          this.userImg = 'http://47.111.104.78:8082' + res.data.userHeadimg;
        } else {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: res.message
          }).show();
        }
      });
    }
    // this.$fetch('/api/')
  },
  methods: {
       goFollow(id){
      this.$router.push({path:`/follow/${id}`});
    },
    goFollower(id){
      this.$router.push({path:`/follower/${id}`});

    },
    goSetting() {
      this.$router.push({ path: "/settings" });
    },
    goMessage() {
      this.$router.push({ path: "/notify" });
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

/* 用户展示 */
.cubeic-vip {
  font-size: 12px;
  border-radius: 10px;
  padding-left: 2px;
  padding-right: 3px;
  background-color: yellow;
}
.meBox {
  height: 100px;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding-left: 30px;
  align-items: center;
  background-color: white;
}

.avatar {
  border-radius: 50%;
  margin: 6px 20px 6px 6px;
  min-width: 70px;
  width: 70px;
  height: 70px;
  background-color: #aaa;
  background-size: cover;
  outline: none;
  display: inline-block;
}

/* 用户关注等入口 */
.entrance {
  background-color: #fff;
  height: 50px;
  display: flex;
  flex-direction: row;
  box-shadow: 0 5px 5px #aaa;
}
.block {
  height: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.num {
  color: black;
  font-weight: 700;
  margin-bottom: 5px;
}

/* 功能列表 */
.list {
  margin-top: 30px;
  /* border:1px solid #aaa; */
}

.column {
  /* border:1px solid red; */
  height: 50px;
  background-color: white;
  margin-bottom: 10px;
  box-shadow: 0 0 5px #aaa;
  line-height: 50px;
  text-align: left;
  padding-left: 40px;
}

.cubeic-arrow {
  float: right;
  margin-right: 30px;
}

.cubeic-setting {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px;
  color: #fff;
  font-size: 26px;
}

.cubeic-email {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 15px;
  color: #fff;
  font-size: 26px;
}
</style>