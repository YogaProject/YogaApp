<template>
  <div>
    <cube-page title="隐私" showBack="true">
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
      model: {
        //   请求
        userPrivacy: "公开"
      },
      schema: {
        fields: [
          {
            type: "radio-group",
            modelKey: "userPrivacy",
            label: "信息权限",
            rules: {
              required: true
            },
            props: {
              options: [
                {
                  label: "公开",
                  value: 2
                },
                {
                  label: "好友可见",
                  value: 1
                },
                {
                  label: "仅自己可见",
                  value: 0
                } ]
            }
          },
          {
            type:'submit',
            label:'提交'
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(e,model) {
      e.preventDefault();
      console.log("submit", e);
      let num = model.userPrivacy;
      this.$post('/api/userApp/updatePrivacy',num).then(res=>{
        const toast = this.$createToast({
            txt: res.message,
            type: "correct"
          });
          toast.show();
          if(res.code===1){
            this.$router.push('/main/mePage');
          }
      })
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
