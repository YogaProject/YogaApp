<template>
  <div>
    <cube-page title="信息完善(教练)" showBack="true">
      <span slot="rightbtn" class="rightbtn">提交</span>

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
      imgurl: "",
      model: {
        UserEmail: "",
        UserIdcard: "",
        UserRealname: "",
        UserGender: "",
        UserNickname: "",
        coachStyle: "",
        UserQq: "",
        wechat: "",
        uploadValue: [],
        content: ""
      },
      schema: {
        fields: [
          {
            type: "upload",
            modelKey: "uploadValue",
            label: "头像",
            props: {
              action: {
                target: "/api/upload/newFile",
                fileName: "file",
                data: {
                  // token: 'token'
                },
                checkSuccess: (res, file) => {
                  if (res.code === 1) {
                    this.imgurl = res.data;
                    console.log("res", this.imgurl);

                    return true;
                  }
                  return true;
                }
              },
              max: 1
            },
            events: {
              "file-removed": (...args) => {
                console.log("file removed", args);
              },
              "files-added": (...args) => {
                console.log("add", args);
              },
              "file-submitted": file => {
                console.log("file-submitted-file", file);
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
            modelKey: "UserQq",
            label: "QQ",
            props: {
              placeholder: "请输入",
              type: "number"
            },
            // validating when blur
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "wechat",
            label: "微信",
            props: {
              placeholder: "请输入"
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
            modelKey: "coachStyle",
            label: "流派",
            props: {
              horizontal: true,
              options: [
                {
                  label: "流瑜伽",
                  value: 1
                },
                {
                  label: "力量瑜伽",
                  value: 2
                },
                {
                  label: "空中瑜伽",
                  value: 3
                }
              ]
            }
          },
          {
            type: "radio-group",
            modelKey: "UserGender",
            label: "性别",
            rules: {
              required: true
            },
            props: {
              horizontal: true,
              options: ["男", "女"]
            }
          },
          {
            type: "textarea",
            modelKey: "content",
            placeholder: "输入内容...",
            // debounce:100,
            props: {
              maxlength: 60
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
    submitHandler(e, model) {
      e.preventDefault();
      console.log("submit", e);
      let user = {
        userHeadimg: this.imgurl,
        idcard: model.UserIdcard,
        realName: model.UserRealname,
        sex: model.UserGender,
        userNickname: model.UserNickname,
        coachStyle: model.coachStyle,
        coachDetail: model.content,
        userQq: model.UserQq,
        userWechat: model.wechat
      };
      this.$post("/api/userApp/updateCoachInfo", user).then(res => {
        if (res.code === 1) {
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: res.message
          }).show();
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
