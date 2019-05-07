<template>
  <div class="box" ref="box">
    <cube-form
      v-model="model"
      :immediate-validate="false"
      @submit="submitHandler"
      @validate="validateHandler"
      class="loginForm"
    >
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]" class="phone"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>

      <cube-form-group>
        <cube-button class="btn" type="submit">获取验证码</cube-button>
        <cube-button type="submit" :primary="true" class="btn">登录</cube-button>
        <cube-button :light="true" class="btn" @click="goRegist">没有账号？去注册</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
export default {
  name: "PhoneBox",
  props: ["width"],
  data() {
    return {
      model: {
        userPhone: "",
        userVerifyCode: ""
      },
      validity: {},
      valid: undefined,
      fields: [
        {
          type: "input",
          modelKey: "userPhone",
          label: "手机号",
          props: {
            placeholder: "手机号",
            clearable: {
              visible: true,
              blurHidden: false
            },
            autocomplete: false,
            maxlength: 100
          },
          rules: {
            required: true,
            type: "number",
            pattern: /^(13|14|15|17|18|19)\d{9}$/
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
  mounted() {
    // 获取浏览器可视区域高度
    const boxWidth = this.width;
    console.log("loginwidth:" + boxWidth);

    // this.$refs.box.style.width = boxWidth + "px";
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
      if (model.userVerifyCode === undefined || model.userVerifyCode === "") {
        // 获取手机登陆验证码
        this.$post("/api/userApp/sendLoginPhonePwd", model).then(res => {
          console.log(res);
        });
      } else {
        // 通过手机登陆
        this.$post("/api/userApp/loginByPhoneAndCode", model).then(res => {
          console.log(res);
            if (res.code === 1) {
            // 注册成功，获取身份信息，将身份信息存到store里,封装？
            let user = res.data;
            sessionStorage.setItem("userId", user.userId);
            sessionStorage.setItem("roleId", user.roleId);

            console.log("roleId" + sessionStorage.getItem("roleId"));
            // 将用户名和token放入vuex
            this.$store.dispatch("setUser", res.data);
            const toast = this.$createToast({
              txt: res.message,
              type: "correct"
            });
            toast.show();
            if (user.userNickname==null) {
               this.toast = this.$createToast({
              txt: "请前往完善信息",
              type: "txt"
            });
              this.$router.push({ path: "/main/newspage" });
            } else {
              this.$router.push({ path: "/main/newspage" });
            }
          } else {
            this.toast = this.$createToast({
              txt: res.message,
              type: "txt"
            });
            this.toast.show();
          }
        });
      }
    },
    goRegist() {
      // 控制app的router跳转register组件
      this.$emit("goRegister");
    }
  }
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

.btn {
  margin-top: 20px;
  width: 300px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid #55efc4;
}
</style>
