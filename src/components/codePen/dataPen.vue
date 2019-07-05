<template>
  <article class="code-pen">
    <p class="label">Data</p>
    <codemirror
      ref="datapen"
      v-model="dataSource"
      :options="{ mode: 'application/json'}"
      @input="onCmCodeChange"
    >></codemirror>
  </article>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
import Bus from "../../utils/bus.js";
export default {
  name: "dataPen",
  data() {
    return {
      dataSource: "",
      timer: null,
      interval: 3000
    };
  },
  methods: {
    onCmCodeChange(newCode) {
      // console.log("codeUpdate--data", newCode);
      let self = this;
      if (self.timer) clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        self.$store.commit("updateCode", {
          dataSource: newCode
        });
      }, self.interval);
    }
  },
  mounted() {
    Bus.$on("update-code", () => {
      this.dataSource = this.$store.state.caseInfo.code.dataSource;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"></style>
