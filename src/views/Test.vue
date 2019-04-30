<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="test">test</button>
  </div>
</template>

<script>
// @ is an alias to /src
import * as homeApi from "@/api/home-api";
export default {
  name: "home",
  data() {
    return {
      data: {}
    };
  },
  methods: {
    test() {
      homeApi
        .test()
        .then(res => {
          let { data } = res;
          console.log(res);
        })
        .catch(() => {});
    }
  }
};
</script>
