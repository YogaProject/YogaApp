<template>
  <div>
    <!-- cube-page  -->
    <cube-page title="添加课程" showBack="true">
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
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
      options: {
        scrollToInvalidField: true,
        layout: "standard" // classic fresh
      },
      model: {
        courseName: "",
        coursetime: 1,
        time: 3,
        courseDetail: "",
        coursePrice: 0.0
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "courseName",
            label: "课程名称",
            props: {
              placeholder: "请输入"
            },
            rules: {
              required: true
            },
            // validating when blur
            trigger: "blur"
          },

          {
            type: "select",
            modelKey: "time",
            label: "每课时长",
            props: {
              options: [1, 2, 3, 4]
            },
            rules: {
              required: true
            }
          },
          {
            type: "input",
            modelKey: "coursePrice",
            label: "课时价格/元",
            props: {
              type: "nubmer",
              placeholder: "请输入"
            },
            rules: {
              required: true
            },
            // validating when blur
            trigger: "blur"
          },
          {
            type: "textarea",
            modelKey: "courseDetail",
            label: "描述",
            rules: {
              required: true
            },
            props: {
              maxlength: 100
            },
            // debounce validate
            // if set to true, the default debounce time will be 200(ms)
            debounce: 100
          },
          {
            type: "submit",
            label: "确定添加"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      console.log("submit", e);
      this.$post("/api/coach/insertCourse",model).then(res => {
        if (res.code === 1) {
          const toast = this.$createToast({
            txt: res.message,
            type: "correct"
          });
          toast.show();
          this.$router.push('/course')
        }
      });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
      console.log(
        "validity",
        result.validity,
        result.valid,
        result.dirty,
        result.firstInvalidFieldIndex
      );
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
