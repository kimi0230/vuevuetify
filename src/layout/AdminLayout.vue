<template>
  <v-app id="inspire">
    <!-- Header -->
    <Header @clicked="changeDrawer" :headerTitle="headerTitle"/>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <Sidebar v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp"/>
    </v-navigation-drawer>

    <!-- router view -->
    <v-content>
      <router-view/>
    </v-content>

    <Snackbar/>
  </v-app>
</template>
<script>
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Snackbar from "@/components/Snackbar";
export default {
  props: {
    source: String
  },
  data() {
    return {
      headerTitle: "Feeder Admin",
      dialog: false,
      drawer: true
    };
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
    }
  },
  components: {
    Header,
    Sidebar,
    Snackbar
  }
};
</script>

<style>
</style>