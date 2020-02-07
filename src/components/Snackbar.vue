<template>
  <v-card>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn dark text @click="closeSnackbar">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  // props: ["showSnackBarObj"],
  data() {
    return {
      // color: "",
      mode: "",
      // snackbar: false,
      // text: "123",
      timeout: 6000,
      x: "right",
      y: "top"
    };
  },
  mounted() {},
  methods: {
    closeSnackbar() {
      this.$store.dispatch("closeSnackBar");
    }
  },
  computed: {
    snackbar: {
      get: function() {
        return this.$store.getters.showSnackBarObj.snackbar;
      },
      set: function(params) {
        this.$store.dispatch("closeSnackBar");
      }
    },
    text() {
      return this.$store.getters.showSnackBarObj.text;
    },
    color() {
      return this.$store.getters.showSnackBarObj.color;
    }
  }
};
</script>