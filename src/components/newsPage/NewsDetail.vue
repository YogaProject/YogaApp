<template>
  <div>
    <!-- 滚动+评论header吸附上方 -->
    <!-- cube-page -->
    <cube-page title="动态正文" showBack>
      <div slot="content">
        <div class="view-wrapper" :style="{height:clientHeight-50+'px'}">
          <cube-sticky :pos="scrollY">
            <cube-scroll :scroll-events="scrollEvents" @scroll="scrollHandler">
              <!-- 动态展示部分div -->
              <div class="news">
                <header class="info">
                  <!-- 头像 -->
                  <div class="avatar" @click="goPage(content.userId)"  :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+content.userHeadimg|| '') + ')'}"></div>
                  <!-- 用户昵称 -->
                  <span class="name">{{content.userNickName}}</span>
                  <!-- vip -->
                  <i class="cubeic-vip">vip{{content.userLevel}}</i>
                  <!-- 日期+时间 -->
                  <span class="date">{{content.publishTime}}</span>
                </header>
                <div class="picture" @click="showImagePreview"  :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+content.img|| '') + ')'}">
                  <!-- 图片展示 -->
                  <p class="title">{{content.title}}</p>
                </div>
                <div class="message">
                  <!-- 文字内容 -->
                  <p>{{content.content}}</p>
                </div>
                <!-- 定位 -->
                <footer>
                  <span class="cubeic-location">梅溪湖</span>
                </footer>
              </div>
              <cube-sticky-ele ele-key="评论">
                <ul class="sticky-header">
                  <li class="ele">
                    评论 {{content.commentCount}} 
                    <!-- <i class="cubeic-good"></i> -->
                    <i class="cubeic-message" @click="addcomment(content.mid)">发评论</i>
                  </li>
                </ul>
              </cube-sticky-ele>
              <!-- ul替换评论卡片div -->
              <div class="comments" v-for="item in comment" :key="item.commentId">
                <!-- 评论者头像 -->
                <header class="info">
                  <div class="avatar" @click="goPage(item.userId)" :style="{backgroundImage: 'url(' + (userImg|| '') + ')'}"></div>
                  <!-- 评论者昵称 -->
                  <span class="name">
                    {{item.userNickName}}
                    <i class="cubeic-vip">vip2</i>
                  </span>
                </header>
                <!-- 评论内容 -->
                <div class="context">
                  <span class="text">{{item.commentDetail}}</span>
                  <!-- 评论的评论（若无则不显示，若大于五条则显示是否展开） -->
                  <div class="inner-comm" v-if="item.children.length!=0">
                    <p v-for="child in item.children" :key="child.commentId">
                      <span class="inner-name">{{child.userNickName}}:</span>
                      {{child.commentDetail}}
                    </p>
                  </div>
                </div>
                <!-- 评论时间 -->
                <p class="time">
                  <span>{{item.commentCreateTime}}</span>
                  <!-- <span class="cubeic-message" @click="addcomment"></span> -->
                </p>
              </div>
            </cube-scroll>
          </cube-sticky>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";
export default {
  name: "newsDetail",
  components: {
    CubePage
  },
  data() {
    return {
      scrollEvents: ["scroll"],
      scrollY: 0,
      showInner: true,
      content: {},
      comment:[],
      clientHeight:"",
    };
  },
  mounted() {
        this.clientHeight = `${document.documentElement.clientHeight}`;

    let mid = this.$route.params.id;
    console.log(mid);
    this.$post("/api/homepage/showHomepageDetail", mid).then(res => {
      console.log(res.data);
      this.content = res.data;
    });

    this.$post("/api/comment/showComments", mid).then(res => {
      console.log(res.data);
      this.comment = res.data;
    });
  },
  methods: {
    // 判断children超过两条则显示
    goPage(id) {
      // 点击跳转该用户主页 获取该用户id
      this.$router.push(`/personalpage/${id}`)
    },
    showImagePreview() {
      this.$createImagePreview({
        imgs: this.content.img
      }).show();
    },
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    addcomment(id ) {
      // ！！传入动态id 回复的评论id
      this.$router.push(`/comment/${id}`);
    }
  }
};
</script>
<style scoped>
.avatar {
  border-radius: 50%;
  margin: 6px 6px 6px 6px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  background-color: #aaa;
  background-size: cover;
  outline: none;
  display: inline-block;
}

.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 0;
  width: 100%;
}

.news {
  /* border: 1px solid #aaaaaa; */
  font-size: 14px;
  min-height: 200px;
  margin-top: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px #aaa;
}
.info {
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
/* 动态发布时间 */
.date {
  margin-left: 140px;
  color: #ccc;
}
/* 动态标题 */
.title {
  font-size: 20px;
  background-color: rgba(236, 240, 241, 0.5);
  height: 30px;
  width: 100%;
  position: absolute;
  bottom: 30px;
  line-height: 30px;
}
.message p {
  word-wrap: break-word;
  text-align: left;
  margin: 20px 20px 20px 20px;
}
.picture {
  /* 图片大小范围 */
  min-height: 200px;
  min-width: 200px;
  max-height: 300px;
  max-height: 300px;
  background-color: #aaa;
  position: relative;
  margin-bottom: 30px;
  background-size:cover;
}
.name{
  width:70px;
  line-height: 20px;
}
.cubeic-vip {
  font-size: 12px;
  /* border: 1px solid purple; */
  border-radius: 10px;
  padding-left: 2px;
  padding-right: 3px;
  background-color: yellow;
}

footer {
  height: 30px;
  text-align: right;
  margin-right: 20px;
}
.cubeic-location {
  color: #bbbbbb;
}

/* comment */
.ele {
  /* border-bottom: 1px solid #bbb; */
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  box-shadow: 0 -4px 10px #aaa;
  background-color: #fff;
  text-align: left;
  padding-left: 20px;
}
.comments {
  /* border: 1px solid purple; */
  font-size: 14px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.context {
  /* 共多少条回复，展开*/
  width: 80%;
  /* border: 1px solid purple; */
  margin-left: 40px;
  text-align: left;
  padding: 10px 10px 10px 10px;
}

.inner-comm {
  background: rgba(236, 240, 241, 0.5);
  margin-top: 10px;
  padding: 10px 10px 10px 10px;
  color: rgb(133, 132, 132);
}
.inner-comm span {
  /* display: inline-block; */
  white-space: nowrap;
}
.inner-comm p {
  /* word-break: break-word; */
  text-align: justify;
  word-wrap: break-word;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  /* overflow:hidden; */
  line-height: 18px;
}
.inner-name {
  color: rgb(65, 93, 218);
}

.time {
  text-align: left;
  color: #ccc;
  font-size: 12px;
  margin-left: 50px;
}

.cubeic-message {
  float: right;
  margin-right: 30px;
  color: #aaa;
  font-size: 12px;
}
</style>
