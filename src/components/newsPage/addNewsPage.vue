<template>
  <div>
    <!-- 表单
        1.内容textarea限800字
        2. 照片
    -->
    <!-- cube-page  -->
    <cube-page title="发动态" showBack>
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
  name: "addnews",
  components: {
    CubePage
  },
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        title: "",
        content: "",
        uploadValue: []
      },
      schema: {
        fields: [
          {
            type: "input",
            modelKey: "title",
            props: { placeholder: "请输入标题" }
          },
          {
            type: "textarea",
            modelKey: "content",
            // debounce:100,
            props: {
              maxlength: 280
            },
            rules: {
              required: true
            }
          },
          {
            type: "upload",
            modelKey: "uploadValue",

            // label: "Upload",
            events: {
              "file-removed": (...args) => {
                console.log("file removed", args);
              }
            },
            rules: {
              // required: true,
              uploaded: (val, config) => {
                return Promise.all(
                  val.map((file, i) => {
                    return new Promise((resolve, reject) => {
                      if (file.uploadedUrl) {
                        return resolve();
                      }
                      //   fake request
                      setTimeout(() => {
                        if (i % 2) {
                          reject(new Error());
                        } else {
                          file.uploadedUrl = "uploaded/url";
                          resolve();
                        }
                      }, 1000);
                    });
                  })
                ).then(() => {
                  return true;
                });
              }
            },
            messages: {
              uploaded: "上传失败"
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
      this.$post("/api/homepage/pushHomepage", model).then(res => {
        console.log(res);
        const toast = this.$createToast({
          txt: res.message,
          type: "correct"
        });
        toast.show();
        this.$router.push('/main/newsPage')
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
