<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <Login></Login>
      </v-col>
    </v-row>
    <Snackbar/>
  </v-container>
</template>


<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";
import Snackbar from "@/components/Snackbar";

export default {
  name: "login",
  data() {
    return {
      text: ""
    };
  },
  components: {
    Login,
    Snackbar
  }
};
</script>
