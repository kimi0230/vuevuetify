<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer/>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="email"
          name="Email"
          prepend-icon="person"
          type="text"
          :rules="emailRule"
          v-model="email"
        >{{email}}</v-text-field>
        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
          :rules="passwordRule"
          v-model="password"
        >{{password}}</v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" @click.stop="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Ajax } from "@/utils/ajax/index";
import Rules from "@/config/verifyRule";

export default {
  data() {
    return {
      valid: false,
      emailRule: Rules.emailRule,
      passwordRule: Rules.passwordRule,
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        const vm = this;
        //參數驗證ok
        let obj = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("login", obj);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
