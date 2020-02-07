<template>
  <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
    <v-app-bar-nav-icon @click.stop="onClickButton"/>

    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="hidden-sm-and-down">{{headerTitle}}</span>
    </v-toolbar-title>

    <v-spacer/>

    <v-menu bottom right offset-y>
      <template v-slot:activator="{ on }">
        <!-- <v-btn class="ma-2" v-on="on">A Menu</v-btn> -->
        <v-btn icon large v-on="on">
          <v-avatar size="32px">
            <v-img :src="userInfo.avatarPath" v-if="userInfo.avatarPath" alt="User"/>
            <v-icon dark v-else>mdi-account-circle</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" v-on:click="clickEvent(item.method)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  props: ["headerTitle"],
  data() {
    return {
      drawer: null,
      items: [
        {
          title: "Logout",
          method: "logoutEvent"
        }
      ]
    };
  },
  components: {},
  methods: {
    onClickButton(event) {
      this.$emit("clicked");
    },
    clickEvent(event) {
      switch (event) {
        case "logoutEvent":
          this.logout();
          break;
        default:
          break;
      }
    },
    logout() {
      this.$store.dispatch("logout");
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  }
};
</script>
