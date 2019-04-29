
/* eslint-disable */
<template>
  <!--图文页面组件  -->
  <!-- 无限滚动 -->
  <div class="box" :style="{height:clientHeight-50+'px'}">
    <cube-page type="recycle-list" title="动态">
      <div slot="content">
        <div class="view-wrapper" >
          <!-- 筛选条件 -->
          <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler" id="tab">
            <cube-tab v-for="item in tabs" :label="item.label" :key="item.label">{{item.name}}</cube-tab>
          </cube-tab-bar>
          <add-btn></add-btn>

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
              <div :id="data.id" class="item" @click="handleClick(data)">
                <div class="bubble">
                  <div class="info">
                    <!-- 头像 -->
                    <div
                      class="avatar"
                      :style="{backgroundImage: 'url(' + (data.avatar || '') + ')'}"
                    ></div>
                    <!-- 用户名 -->
                    <span class="name">
                      {{data.username}}
                      [{{data.role}}]
                      <!-- vip -->
                      <i class="cubeic-vip">{{data.userlevel}}</i>
                    </span>

                    <!-- 发布时间 -->
                    <span class="time">{{data.time}}</span>
                  </div>
                  <!-- 背景图片 -->
                  <div class="bkimage" :style="{backgroundImage: 'url(' + (data.img || '') + ')'}"></div>
                  <div class="content">
                  <span >{{ data.msg }}</span>
                  <span class="location"><i class="cubeic-location"/>{{data.location}}</span>
                  </div>
                </div>
              </div>
            </template>
            <!-- <div slot="spinner">Loading Data</div> -->
            <div slot="noMore">没有更多数据了</div>
          </cube-recycle-list>
        </div>
      </div>
    </cube-page>
    <!-- 发布动态按钮 -->
  </div>
</template>
<script>
import Mock from "@/components/newsPage/message.js";
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
      
      clientHeight: "",
      selectedLabel: "all",
      initTime: new Date().getTime(),
      id: 0,
      size: 50,
      infinite: true,

      tabs: [
        {
          label: 'all',
          name: "全部"
        },
        {
          label: 'coach',
          name: "教练"
        },
        {
          label: 'venue',
          name: "场馆"
        },
        {
          label: 'follow',
          name: "关注"
        }
      ]
    };
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
  },
  methods: {
    getItem(id) {
      const msg =
        Mock.messages[Math.floor(Math.random() * Mock.messages.length)];
      return {
        id,
        username: "mr.lee",
        msg: msg,
        img: "",
        userlevel: "vip2",
        role:'教练',
        location:"gotham",
        avatar: ".\newsPageTulips.jpg",
        time: new Date(
          Math.floor(
            this.initTime +
              id * this.size * 1000 +
              Math.random() * this.size * 1000
          )
        ).toLocaleTimeString()
      };
    },
    onFetch() {
      let items = [];
      return new Promise(resolve => {
        setTimeout(() => {
          for (let i = 0; i < this.size; i++) {
            items.push(this.getItem(this.id++));
          }
          resolve(items);
        }, 1000);
      });
    },
    handleClick(data) {
      // 传入id  并根据router跳转
      this.$router.push("/newsDetail")
      console.log(data);
    },
    clickHandler() {
      // 点击tab，改变数据
    }
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
  background-color:#fff;
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
      display:flex;
      flex-direction row
      align-items center
      // background-color #eeeeee
      .name {
        font-size:16px;
        font-weight:500;
      }
      .cubeic-vip{
        font-size:12px;
        border:1px solid purple
        border-radius:10px;
        padding-left:2px;
        padding-right:3px;
        background-color yellow
      }
      .time{
        margin-left:100px;
      }
      .avatar {
        border-radius: 50%;
        margin:6px 6px 6px 6px;
        
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

      .content{
        position:absolute;
        bottom:30px;
        display:flex;
        flex-direction:row;
        justify-content:space-between;
          flex-wrap: nowrap;
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
