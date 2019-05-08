/* eslint-disable */
<template>
  <div :style="{height:clientHeight+'px'}">
    <!-- cube-page  -->
    <cube-page title="个人主页" showBack>
      <div slot="content">
        <div class="view-wrapper">
          <!-- 头像、昵称、vip -->
          <div class="box">
            <div class="meBox">
              <div class="avatar" :style="{backgroundImage: 'url(' + (avatar || '') + ')'}"></div>
              <span class="name" v-if="roleId==1">{{user.userNickname}}</span>
              <span class="name" v-if="roleId==2">{{user.realName}}</span>
              <i class="cubeic-vip">vip{{user.level}}</i>
            </div>
            <p>个人简介：{{user.detail}}</p>
          </div>

          <!-- 关注、粉丝、动态、交易入口 -->
          <div class="entrance">
            <div class="block" @click="goFollow(user.userId)">
              <p class="num">{{user.focus}}</p>关注
            </div>
            <div class="block" @click="goFollower(user.userId)">
              <p class="num">{{user.fans}}</p>粉丝
            </div>
            <div class="block" v-if="roleId==2">
              <router-link to="/comments">
                <p class="num">{{user.comments}}</p>评价
              </router-link>
            </div>
            <div class="block" @click="follow(user.userId)">
              <p class="follow">+加关注</p>
            </div>
          </div>

          <div class="info" v-if="user.privacy==1">
            <p class="title">联系方式</p>
            <p>手机号：{{user.phone}}</p>
            <p>QQ：{{user.qq}}</p>
            <P>微信：{{user.wechat}}</P>
          </div>
        </div>
        <cube-button @click="goSignCoach()" class="btn" v-if="roleId==1">约私教</cube-button>
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
      perm: "ok",
      clientHeight: "",
      student: false,
      userId: "",
      roleId: "",
      avatar: "",
      user: {
        id: "",
        phone: "13333445566",
        qq: "3344555522",
        wechat: "13333445566"
      }
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    this.userId = this.$route.params.id;
    console.log("!!!" + this.userId);
    this.roleId = sessionStorage.getItem("roleId");
    let meId = sessionStorage.getItem("userId");
    this.getData();
  },
  methods: {
    getData() {
      if (this.roleId === "1") {
        this.$post("/api/user/getStudentInfo", this.userId).then(res => {
          if (res.code === 1) {
            this.user = res.data;
            this.avatar = "http://47.111.104.78:8082" + res.data.userHeadimg;
          }
        });
      } else {
        this.$post("/api/user/getDetailInfoByUserId", this.userId).then(res => {
          console.log(res.data);
          this.user = res.data;
          this.avatar = "http://47.111.104.78:8082" + res.data.headImg;
        });
      }
    },
    goFollow(id) {
      this.$router.push({ path: `/follow/${id}` });
    },
    goFollower(id) {
      this.$router.push({ path: `/follower/${id}` });
    },
    goSignCoach() {
      this.$router.push({ path: `/signcoach/${this.userId}` });
    },
    follow(userid) {
      this.$post("/api/follow/addFollow", userid).then(res => {
        const toast = this.$createToast({
          txt: res.message,
          type: "correct"
        });
        toast.show();
        this.getData();
      });
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
.box {
  min-height: 120px;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
}
.meBox {
  display: flex;
  flex-direction: row;
  justify-items: center;
  padding-left: 30px;
  align-items: center;
}

.box p {
  font-size: 16px;
  text-align: left;
  padding: 20px 40px;
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
.info {
  margin-top: 30px;
  background-color: #fff;
  min-height: 150px;
  line-height: 50px;
  text-align: left;
  padding: 20px;
  box-shadow: 0 0 10px #aaa;

  /* border:1px solid #aaa; */
}

.info p {
  padding-left: 5px;
}
.title {
  border-bottom: 1px solid #ccc;
}
.follow {
  width: 100%;
  /* background-color:  */
}
.btn {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>