<template>
  <v-radio-group row v-model="value" @change="updateItem" :label="title">
    <v-radio v-for="item in items" :key="item.value" :label="item.lable" :value="item.value"></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  props: ["prospTitle", "prospKey", "prospValue", "prospItems"],
  data() {
    return {
      title: "",
      key: "",
      value: "",
      items: []
    };
  },
  mounted() {
    this.key = this.prospKey;
    this.title = this.prospTitle;
    this.value = this.prospValue;
    this.items = this.prospItems;
  },
  watch: {
    prospValue: function(val) {
      this.value = val;
    }
  },
  methods: {
    updateItem(val) {
      this.$emit("updateEditedItem", {
        key: this.key,
        val: val
      });
    }
  }
};
</script>