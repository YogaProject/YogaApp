<template>
  <div class="box" ref="box">
    <cube-form v-model="user" @submit="submitHandler" class="registerForm">
      <cube-form-group class="inputBox">
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
                <cube-form-item :field="fields[2]"></cube-form-item>

      </cube-form-group>
    <cube-form-group>
        <span class="info">*教练必须使用手机注册</span>
      </cube-form-group>
      <cube-form-group>
           <cube-button class="btn" @click="getCode">获取邮箱验证码</cube-button>
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
      user: {
        username: "",
        password: ""
      },
      fields: [
        {
          type: "input",
          modelKey: "username",
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
            type: 'email',
          }
        },
        {
          type: "input",
          modelKey: "password",
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
            pattern:/^[a-zA-Z]\\w{5,17}$/
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
    getCode(){

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
