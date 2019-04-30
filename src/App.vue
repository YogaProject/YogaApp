<template>
  <div id="app">
    <router-link to="/test">aaa</router-link>
    <!-- <router-link to="/about">About</router-link> -->
    <router-view @goRegister="goRegister" @goLogin="goLogin"/>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    goRegister() {
      this.$router.push({
        path: '/register'
      });
    },
    goLogin(){
      this.$router.push({
        path:'/login'
      });
    }
  }
};
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}

</style>
