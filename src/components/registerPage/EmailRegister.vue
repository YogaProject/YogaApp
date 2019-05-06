<template>
  <div class="box" ref="box">
    <cube-form
      v-model="model"
      @submit="submitHandler"
      @validate="validateHandler"
      class="registerForm"
    >
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <span class="info">*教练必须使用手机注册</span>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit" class="btn">获取邮箱验证码</cube-button>
        <cube-button type="submit" :primary="true" class="btn">注册</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
export default {
  name: "EmailBox",
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        userEmail: "",
        userVerifyCode: "",
        userPwd: "",
        roleName: "学员"
      },
      fields: [
        {
          type: "input",
          modelKey: "userEmail",
          props: {
            placeholder: "邮箱",
            clearable: {
              visible: true,
              blurHidden: false
            },
            autocomplete: false,
            maxlength: 30
          },
          rules: {
            required: true,
            type: "email",
          }
        },
        {
          type: "input",
          modelKey: "userPwd",
          props: {
            type: "password",
            placeholder: "请输入密码",
            clearable: {
              visible: true,
              blurHidden: false
            },
            eye: {
              open: true,
              reverse: false
            },
            autocomplete: false,
            maxlength: 18
          },
          rules: {
            required: true,
            notWhitespace: true,
          }
        },
        {
          type: "input",
          modelKey: "userVerifyCode",
          label: "验证码",
          props: {
            placeholder: "请输入验证码",
            clearable: {
              visible: true,
              blurHidden: false
            },
            autocomplete: false,
            maxlength: 6
          },
          rules: {
            // required: true,
            type: "number"
          }
        }
      ]
    };
  },

  methods: {
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
    },
    submitHandler(e, model) {
      e.preventDefault();
      console.log(model);
      if (model.userVerifyCode === undefined ||model.userVerifyCode=="") {
        // 获取验证码
        this.$post("/api/userApp/sendRegEmailCode", model).then(res => {
          console.log(res);
        });
      } else {
        // 通过邮箱注册
        this.$post("/api/userApp/regByEmail", model).then(res => {
          console.log(res);
         if (res.code === 1) {
          // 注册成功，获取身份信息，将身份信息存到store里,封装？
          let user = res.data;
          sessionStorage.setItem("userId", user.userId);
          sessionStorage.setItem("roleId", user.roleId);
          sessionStorage.setItem("nickName", user.userNickname);
          sessionStorage.setItem("userLevel", user.userLevel);
          sessionStorage.setItem("userimg", user.userHeadImg);

          console.log("roleId" + sessionStorage.getItem("roleId"));
          // 将用户名和token放入vuex
          this.$store.dispatch("setUser", res.data);
          const toast = this.$createToast({
            txt: res.message,
            type: "correct"
          });
          toast.show();
          this.$router.push({ path: "/main/newspage" });
        } else {
          this.toast = this.$createToast({
            txt: res.message,
            type: "txt"
          });
          this.toast.show();
        }
        });
      }
    }
  },

  watch: {}
};
</script>
<style scoped>
/* form */

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.inputBox {
  /* border:1px solid #aaaaaa; */
  width: 300px;
  border: 1px solid #55efc4;
  border-radius: 16px;
}
.info {
  float: left;
  font-size: 12px;
  margin-top: 10px;
}
.btn {
  margin-top: 30px;
  width: 300px;
  height: 40px;
  border-radius: 16px;
}
</style>
