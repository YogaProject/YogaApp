<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="我的优惠券" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-scroll
            ref="scroll"
            :data="coupons"
            :options="options"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp"
          >
            <ul v-for="item in coupons" :key="item.id">
              <li v-if="item.couponstatus===0?color='#55efc4':color='#ccc'" :style="{'background-color':color}">
                <div class="all" >
                  <div class="info">
                    <span class="title">{{item.title}}</span>
                    <span class="discount">{{item.faceValue}}元</span>
                  </div>
                  <div class="content">
                    <p>有效日期：{{item.effectiveDate}}至{{item.expirationDate}}</p>
                    <p><i class="cubeic-warn">最终解释权归商家所有</i></p>
                  </div>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "coupons",
  components: {
    CubePage
  },
  data() {
    return {
      color:'',
      options: {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      },
      coupons: [
        {
          id: "1",
          title: "优惠券",
          faceValue: "9.8",
          effectiveDate: "2018-08-09",
          expirationDate: "2019-08-09",
          couponstatus: 1
        }
      ]
    };
  },
  mounted(){

  },
  methods: {
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

li {
  min-height: 150px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: 15px;
  background-color: #55efc4;
  box-shadow: 0 0 5px #aaa;
}

.all {
  background-color: #fff;
  margin-left: 20px;
  min-height: 150px;
}
.info {
  height: 70px;
  display: flex;
  flex-direction: row;
  text-align: justify;
  padding: 10px 0 0 15px;
  line-height: 22px;
  border-bottom: 1px solid #ccc;
  margin: 0 10px;
  align-items: center;
}

.title {
  font-size: 30px;
  line-height: 30px;
  font-weight: bold;
  flex: 1;
}
.discount {
  flex: 1;
  text-align: right;
  font-size: 20px;
  margin-right: 10px;
  font-weight: bold;
}
.content {
  text-align: left;
  padding: 5px;
  line-height: 20px;
  margin: 0 10px;
  background-color: #fff;
}

.content p {
  word-wrap: break-word;
}

.cubeic-warn{
  color:#bbb;
  font-size:14px;
}
</style>
