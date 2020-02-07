<template>
  <span>{{timeFormat}}</span>
</template>

<script>
import moment from "moment";

export default {
  props: ["timeValue"],
  data() {
    return {};
  },
  computed: {
    utc8() {
      let UTCTimeObj = new Date(this.timeValue);
      return UTCTimeObj.toLocaleString("en");
    },
    timeFormat() {
      return moment(this.timeValue).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {}
};
</script>
