<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  // eslint-disable-next-line
  mounted () {
    this.$get("designerworksresplist/get?pageNumber=1&pageSize=6").then(res => {
      console.log(res);
    });
  }
};
</script>
