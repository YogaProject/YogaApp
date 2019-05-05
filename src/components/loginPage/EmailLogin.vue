<template>
  <div class="box" ref="box">
    <cube-form v-model="user" @submit="submitHandler" @validate="validateHandler" class="loginForm">
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <span class="forgetpwd" @click="showPrompt">忘记密码？</span>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit" :primary="true" class="btn">登录</cube-button>
        <cube-button :light="true" class="btn" @click="goRegister">没有账号？去注册</cube-button>
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
      user: {
        userEmail: "",
        userPwd: ""
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
            notWhitespace: true,
            type: "email"
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
              open: false,
              reverse: false
            },
            autocomplete: false,
            maxlength: 100
          },
          rules: {
            required: true,
            notWhitespace: true
          }
        }
      ]
    };
  },

  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      console.log(model);
      // 邮箱登陆
      this.$post("/api/userApp/loginByEmailAndPwd", {
        user: model
      }).then(res => {
        console.log(res);
      });
    },
    goRegister() {
      this.$emit("goRegister");
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
    },
    showPrompt() {
      this.dialog = this.$createDialog({
        type: "prompt",
        title: "找回密码",
        prompt: {
          value: "",
          placeholder: "请输入手机号或邮箱"
        },
        onConfirm: (e, promptValue) => {
          // value传回后台查找密码
          this.$createToast({
            type: "warn",
            time: 1000,
            txt: `密码已发送至： ${promptValue || ""}`
          }).show();
        }
      }).show();
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
  margin-top: 30px;
  width: 300px;
  height: 40px;
  border-radius: 16px;
  border: 1px solid #55efc4;
}

.forgetpwd {
  font-size: 12px;
  color: #aaaaaa;
  margin-top: 10px;
  float: right;
}
</style>
