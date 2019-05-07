<template>
  <div>
    <cube-page title="信息完善" showBack>
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
        UserPhone: "",
        UserIdcard: "",
        UserRealname: "",
        UserSex: "",
        UserNickname: "",
        uploadValue: []
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
            modelKey: "UserSex",
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
    submitHandler(e, model) {
      e.preventDefault();
      console.log("submit", e);
      let user = {
        userHeadimg: this.imgurl,
        idcard: model.UserIdcard,
        realName: model.UserRealname,
        sex: model.UserSex,
        userNickname: model.UserNickname
      };
      this.$post("/api/userApp/updateStudentInfo", user).then(res => {
        
           this.$createToast({
                type: "warn",
                time: 1000,
                txt: res.message
              }).show();
              if (res.code === 1) {
                this.$router.push('/main/mePage');
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
