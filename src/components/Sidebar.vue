<template>
  <v-list dense>
    <template v-for="item in items">
      <v-row v-if="item.heading" :key="item.heading" align="center">
        <v-col cols="6">
          <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
        </v-col>
        <v-col cols="6" class="text-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-col>
      </v-row>
      <!-- 有子menu -->
      <v-list-group
        v-else-if="item.children"
        :key="item.text"
        v-model="item.model"
        :prepend-icon="item.model ? item.icon : item['icon-alt']"
        append-icon
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title :to="item.path">{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <!-- 子menu -->
        <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.path">
          <v-list-item-action v-if="child.icon">
            <v-icon>{{ child.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ child.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <!-- 無子menu -->
      <v-list-item v-else :key="item.text" link :to="item.path">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      drawer: null,
      items: [
        {
          icon: "mdi-desktop-mac-dashboard",
          text: "Home",
          path: "/admin/home"
        },
        {
          icon: "mdi-account",
          text: "User",
          path: "/admin/user"
        },
        {
          icon: "mdi-desktop-tower-monitor",
          text: "Device",
          path: "/admin/table"
        },
        {
          icon: "mdi-paw",
          text: "Pet",
          path: "/admin/pet"
        },
        {
          icon: "mdi-account-tie",
          text: "Admin User",
          path: "/admin/table4"
        }
        // {
        //   icon: "mdi-file-table-box-multiple",
        //   text: "Table",
        //   path: ""
        // },
        // {
        //   icon: "mdi-chevron-up",
        //   "icon-alt": "mdi-chevron-down",
        //   text: "Settings",
        //   model: false,
        //   children: [{ text: "Import", icon: "mdi-settings", path: "" }]
        // },
        // { icon: "mdi-content-copy", text: "Duplicates", path: "" },
        // { icon: "mdi-message", text: "Send feedback", path: "" },
        // { icon: "mdi-help-circle", text: "Help", path: "" },
        // {
        //   icon: "mdi-cellphone-link",
        //   text: "App downloads",
        //   path: ""
        // },
        // {
        //   icon: "mdi-keyboard",
        //   text: "Go to the old version",
        //   path: ""
        // }
      ]
    };
  }
};
</script>
