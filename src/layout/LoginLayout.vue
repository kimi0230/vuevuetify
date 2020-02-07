<template>
  <v-app id="inspire">
    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<script>
import Login from "@/views/Login";

export default {
  components: {
    Login
  }
};
</script>