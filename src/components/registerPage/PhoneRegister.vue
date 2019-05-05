<template>
  <div class="box" ref="box">
    <cube-form v-model="model" @submit="submitHandler" class="registerForm">
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]" class="phone"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit" class="btn">获取验证码</cube-button>
        <cube-button type="submit" :primary="true" class="btn">注册</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
export default {
  name: "PhoneBox",
  data() {
    return {
      model: {
        userPhone: "",
        userVerifyCode: "",
        roleName: ""
      },
      fields: [
        {
          type: "radio-group",
          modelKey: "roleName",
          label: "身份",
          rules: {
            required: true
          },
          props: {
            options: ["教练", "学员"]
          }
        },
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
            required: true,
            type: "number"
          }
        }
      ]
    };
  },
  methods: {
    submitHandler(e, model) {
      e.preventDefault();
      console.log(model);
      if (model.userVerifyCode === undefined) {
        // 获取手机验证码
        this.$post("/api/userApp/sendRegPhonePwd", {
          user: model
        }).then(res => {
          console.log(res);
        });
      } else {
        // 通过手机注册
        this.$post("/api/userApp/regByPhone", {
          user: {
            userPhone: model.userPhone,
            userVerifyCode: model.userVerifyCode
          },
          roleName: model.roleName
        }).then(res => {
          console.log(res);
          if (res.code === 1) {
            // 注册成功，获取身份信息，将身份信息存到store里,封装？
            sessionStorage.setItem("userName", res.data.userId);
            // 将用户名和token放入vuex
            this.$store.dispatch("setUser", res.data);
            const toast = this.$createToast({
              txt: "Correct",
              type: "correct"
            });
            toast.show();
            this.$router.push({ path: "/main/newspage" });
          }
        });
      }
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
</style>
