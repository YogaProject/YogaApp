<template>
  <div>
    <!-- 评论发布页面  -->
    <cube-page title="评论" showBack="true">
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
  name: "comment",
  components: {
    CubePage
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        content: "",
      },
      schema: {
        fields: [
    
          {
            type: "textarea",
            modelKey: "content",
            placeholder:'输入内容...',
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
    submitHandler() {}
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
