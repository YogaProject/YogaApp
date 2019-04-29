<template>
  <div class="box" ref="box">
    <cube-form v-model="user" @submit="submitHandler" class="registerForm">
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]" class="phone"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button class="btn" @click="getCode">获取验证码</cube-button>
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
      user: {
        username: "",
        code: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "username",
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
          modelKey: "code",
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
            type: "number",
          }
        }
      ]
    };
  },

  methods: {
    submitHandler(e) {},
    getCode(user) {}
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
    border:1px solid #55efc4;

}


</style>
