<template>
  <v-app id="inspire">
    <slot></slot>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$router.push("/home");
  },
};
</script>