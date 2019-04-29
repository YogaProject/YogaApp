<template>
  <div>
    <cube-page title="绑定手机号" showBack="true">
      <span slot="rightbtn" @submit="submitHandler" class="rightbtn">提交</span>
      <div slot="content">
        <!-- :style="{height:clientHeight-100+'px'}" -->
        <div class="view-wrapper">
          <cube-form
            :model="model"
            :immediate-validate="false"
            :options="options"
            @validate="validateHandler"
          >
            <cube-form-group>
              <cube-form-item :field="fields[0]"></cube-form-item>
              <cube-form-item :field="fields[1]"></cube-form-item>
            </cube-form-group>
            <cube-form-group>
              <cube-button class="btn" @click="getCode">获取验证码</cube-button>
            </cube-form-group>
          </cube-form>
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
        //   请求
        userPhone: "",
        code: ""
      },
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
            maxlength: 11
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
            type: "number"
          }
        }
      ]
    };
  },
  mounted() {
    //   请求数据，若已绑定手机号则disable
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
    },
    getCode() {}
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
