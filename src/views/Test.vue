<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="test">test</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      data: {}
    };
  },
  methods: {
    test() {
      this.$fetch("/api/msg/1/2/detail").then(res => {
        console.log(res);
      });
    }
  }
};
</script>
