<template>
  <div class="box" ref="box">
    <cube-form v-model="model" @submit="submitHandler" class="registerForm">
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]" class="phone"></cube-form-item>
        <cube-form-item :field="fields[2]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit" class="btn">获取密码</cube-button>
        <cube-button type="submit" :primary="true" class="btn">注册</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>
<script>
import { isNull } from 'util';
export default {
  name: "PhoneBox",
  data() {
    return {
      model: {
        userPhone: "",
        userPwd: "",
        roleId: ""
      },
      fields: [
        {
          type: "radio-group",
          modelKey: "roleId",
          label: "身份",
          rules: {
            required: true
          },
          props: {
            options: [
              {
                label: "教练",
                value: 2
              },
              {
                label: "学员",
                value: 1
              }
            ]
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
          modelKey: "userPwd",
          label: "密码",
          props: {
            placeholder: "请输入密码",
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
    submitHandler(e, model) {
      e.preventDefault();
      console.log(model);
      if (model.userPwd === undefined || model.userPwd === "") {
        // 获取手机验证码
        this.$post("/api/userApp/sendRegPhonePwd", model).then(res => {
          console.log(res);
        });
      } else {
        // 通过手机注册
        this.$post("/api/userApp/regByPhone", model).then(res => {
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
