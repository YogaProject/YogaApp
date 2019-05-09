<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="课程评论" showBack>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
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
  name: "coursecomment",
  components: {
    CubePage
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        content: "",
        rateValue: 0
      },
      schema: {
        fields: [
          {
            type: "rate",
            modelKey: "rateValue",
            label: "Rate",
            rules: {
              required: true
            }
          },
          {
            type: "textarea",
            modelKey: "content",
            placeholder: "输入内容...",
            // debounce:100,
            props: {
              maxlength: 280
            },
            rules: {
              required: true
            }
          },
          {
            type: "submit",
            label: "发布"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      let orderId = this.$route.query.id;
      let coachId = this.$route.query.coachId;
console.log(coachId);

      let commentVO = {
        orderId: orderId,
        rate: model.rateValue,
        comment: model.content
      };
      this.$post("/api/student/saveComment", commentVO).then(res => {
        if (res.code === 1) {
          const toast = this.$createToast({
            time: 1000,
            txt: res.message
          });
          toast.show();
          this.$router.push({ path: "/comments", query: {coachId:coachId } });
        }
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
