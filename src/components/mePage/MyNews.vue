
/* eslint-disable */
<template>
  <!--图文页面组件  -->
  <!-- 无限滚动 -->
  <div class="box" :style="{height:clientHeight-50+'px'}">
    <cube-page type="recycle-list" title="动态" showBack>
      <div slot="content">
        <div class="view-wrapper">
          <!-- 筛选条件 -->
          <!-- 无限回收滚动 -->
          <cube-recycle-list class="list" :infinite="infinite" :size="size" :on-fetch="onFetch">
            <template slot="tombstone">
              <!--预展示  -->
              <div class="item tombstone">
                <div class="bubble">
                  <p></p>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </template>
            <!-- 实际内容展示 -->
            <template slot="item" slot-scope="{ data }">
              <div :id="data.userId" class="item" @click="handleClick(data.mid)">
                <div class="bubble">
                  <div class="info">
                    <!-- 头像 'http://47.111.104.78:8082'-->
                    <div class="avatar"  :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+data.userHeadimg|| '') + ')'}"></div>
                    <!-- 用户名 -->
                    <span class="name">
                      {{data.userNickName}}
                      [{{data.roleName}}]
                      <!-- vip -->
                      <i class="cubeic-vip">vip{{data.userLevel}}</i>
                    </span>

                    <!-- 发布时间 -->
                    <span class="time">{{data.publishTime}}</span>
                  </div>
                  <!-- 背景图片 -->
                  <div class="bkimage" :style="{backgroundImage: 'url(' + ('http://47.111.104.78:8082'+data.img || '') + ')'}"></div>
                  <div class="content">
                    <span>{{ data.title }}</span>
                  
                  </div>
                </div>
              </div>
            </template>
            <div slot="spinner">Loading Data</div>
            <div slot="noMore">没有更多数据了</div>
          </cube-recycle-list>
        </div>
      </div>
    </cube-page>
    <!-- 发布动态按钮 -->
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";
import AddBtn from "@/components/newsPage/addNewsBtn.vue";

export default {
  name: "newsPage",
  components: {
    // "news-header": header
    CubePage,
    "add-btn": AddBtn
  },
  data() {
    return {
      items:[],
      msg: [],
      clientHeight: "",
      selectedLabel: "all",
      initTime: new Date().getTime(),
      id: 0,
      size: 50,
      infinite: true,
      address: { longitude: 104.0, latitude: 30.582, roleId: 0 },
      data:{},
  
    };
  },
  mounted() {
    
    this.clientHeight = `${document.documentElement.clientHeight}`;
    var _this = this;
    let userId = sessionStorage.getItem('userId');
    this.$post("/api/homepage/showSomeoneHomepage",userId).then(res => {
      console.log(res.data);
      _this.msg = res.data;
    });
  },
  methods: {
    getItem(id) {
      if (id > 49) {
        this.id = 0;
      }
      const data = this.msg[id];
      // console.log(id + "." + data);
      return data;
    },
    onFetch() {
      return new Promise(resolve => {
        setTimeout(() => {
          for (let i = 0; i < this.size; i++) {
            this.items.push(this.getItem(this.id++));
          }
          resolve(this.items);
        }, 1000);
      });
    },
    handleClick(id) {
      // 传入id  并根据router跳转
      this.$router.push({path:`/newsDetail/${id}`});
    },

  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.view-wrapper {
  position: fixed;
  top: 54px;
  left: 0;
  bottom: 50px;
  width: 100%;
}

#tab {
  font-size: 14px;
  height: 40px;
  background-color: #fff;
}

.list {
  width: 375px;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ddd;
  list-style-type: none;
  text-align: center;

  .item {
    display: flex;
    padding: 10px 0;
    width: 100%;
    text-align: left;

    .info {
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      width:340px;
      // background-color #eeeeee
      .name {
        font-size: 16px;
        font-weight: 500;
      }

      .cubeic-vip {
        font-size: 12px;
        border: 1px solid purple;
        border-radius: 10px;
        padding-left: 2px;
        padding-right: 3px;
        background-color: yellow;
      }

      .time {
        margin-left: 60px;
        font-size:12px;
        
      }

      .avatar {
        border-radius: 50%;
        margin: 6px 6px 6px 6px;
        min-width: 40px;
        width: 40px;
        height: 40px;
        background-color: #aaa;
        // background-image: url('.\newsPage\Tulips.jpg')
        background-size: cover;
        outline: none;
      }
    }

    .bkimage {
      width: 330px;
      height: 120px;
      background-color: #aaa;
      background-size:cover;
    }

    p {
      margin: 0;
      word-wrap: break-word;
      font-size: 14px;
    }

    &.tombstone {
      p {
        width: 100%;
        height: 0.5em;
        background-color: #ccc;
        margin: 0.5em 0;
      }
    }

    .bubble {
      padding: 7px 10px;
      color: #333;
      background: #fff;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      max-width: 420px;
      min-width: 80px;
      margin: 0 20px 0 5px;
      font-size: 14px;

      &:before {
        content: '';
        border-style: solid;
        border-width: 0 10px 10px 0;
        border-color: transparent #fff transparent transparent;
        position: absolute;
        top: 0;
        left: -10px;
      }

      .content {
        position: absolute;
        bottom: 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        height:20px;
        width:95%;
        margin:0;
        background-color:rgba(250,250,250,0.8);
        font-size:16px;
        font-weight:700;
        line-height:20px;
      }
    }

    .meta {
      font-size: 0.8rem;
      color: #999;
      margin-top: 3px;
    }
  }
}
</style>
