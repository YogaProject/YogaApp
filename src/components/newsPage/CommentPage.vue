<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="评论" showBack>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-form
            :model="model"
            :field="fields"
            @submit="submitHandler"
          ></cube-form>
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
      model: {
        content: ""
      },
        fields: [
          {
            type: "textarea",
            modelKey: "content",
            placeholder: "输入内容...",
            // debounce:100,
            props: {
              maxlength: 280
            }
          },
          {
            type: "submit",
            label: "发布"
          }
        ]
      
    };
  },
  // mounted() {},
  methods: {
    submitHandler(e, model) {
      console.log(e);
      e.preventDefault();
      let mid = this.$route.params.id;
      let comment = {
        entityType: 2,
        commentDetail: model.content,
        entityId: mid
      }
      this.$post("/api/comment/addComment",comment).then(res => {
        const toast = this.$createToast({
          txt: res.message,
          type: "txt"
        });
        toast.show();
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
}
</style>
