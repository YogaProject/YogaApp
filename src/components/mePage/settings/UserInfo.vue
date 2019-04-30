<template>
  <div>
    <cube-page title="信息完善" showBack="true">
      <span slot="rightbtn" @click="submitHandler" class="rightbtn">提交</span>

      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-form
            :model="model"
            :schema="schema"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
          ></cube-form>
        </div>
      </div>
    </cube-page>
  </div>
</template>
<script>
import CubePage from "@/components/common/cube-page.vue";

export default {
  name: "settings",
  components: {
    "cube-page": CubePage
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
        imgurl: "",
        UserEmail: "",
        UserPhone: "",
        UserIdcard: "",
        UserRealname: "",
        UserGender: "",
        UserNickname: "",
        uploadValue: []
      },
      schema: {
        fields: [
          {
            type: "upload",
            modelKey: "uploadValue",
            label: "头像",
            events: {
              "file-removed": (...args) => {
                console.log("file removed", args);
              }
            },
            rules: {
              required: true,
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
            type: "input",
            modelKey: "UserNickname",
            label: "昵称",
            props: {
              placeholder: "请输入",
              maxlength: 20
            },
            rules: {
              required: true
            },
            // validating when blur
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "UserEmail",
            label: "邮箱",
            props: {
              placeholder: "请输入",
              type: "email"
            },
            rules: {
              required: true
            },
            // validating when blur
            trigger: "blur"
          },
         
          {
            type: "input",
            modelKey: "UserIdcard",
            label: "身份证号",
            props: {
              placeholder: "身份证号",
              clearable: {
                visible: true,
                blurHidden: false
              },
              autocomplete: false,
              maxlength: 18
            },
            rules: {
              required: true,
              type: "number"
              //   pattern: /^(13|14|15|17|18|19)\d{9}$/
            }
          },
          {
            type: "input",
            modelKey: "UserRealname",
            label: "真实姓名",
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
            type: "radio-group",
            modelKey: "UserGender",
            label: "性别",
            rules: {
              required: true
            },
            props: {
              options: ["男", "女"]
            }
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
    submitHandler(e) {
      e.preventDefault();
      console.log("submit", e);
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
  font-size: 16px;
}
.rightbtn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0px 15px;
  color: #fff;
  font-size: 16px;
}
</style>
