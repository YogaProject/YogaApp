<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="评论" showBack>
      <div slot="content">
        <div class="view-wrapper">
          <!-- :style="{height:clientHeight-100+'px'}" -->
          <cube-textarea v-model="value"></cube-textarea>
          <cube-button @click="submit">发布</cube-button>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "comment",
  components: {
    CubePage
  },
  data() {
    return {
      value: ""
    };
  },
  // mounted() {},
  methods: {
    submit() {
      let id = this.$route.params.id;
      let data={
        entityId:id,
        entityType:1,
        commentDetail:this.value
      }
      this.$post('/api/comment/addComment',data).then(res=>{
         const toast = this.$createToast({
          txt: res.message,
          type: "correct"
        });
        toast.show();
        if(res.code===1){
          this.$router.go(-1);
        }
      })
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
}
</style>
