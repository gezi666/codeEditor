<template>
  <article class="code-pen">
    <p class="label">CSS</p>
    <codemirror ref="csspen" v-model="css" :options="{ mode: 'text/css'}" @input="onCmCodeChange"></codemirror>
  </article>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
import Bus from "../../utils/bus.js";
export default {
  name: "cssPen",
  data() {
    return {
      css: "",
      timer: null,
      interval: 3000
    };
  },
  methods: {
    onCmCodeChange(newCode) {
      // console.log("codeUpdate--css", newCode);
      let self = this;
      if (self.timer) clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        self.$store.commit("updateCode", {
          css: newCode
        });
      }, self.interval);
    }
  },
  mounted() {
    Bus.$on("update-code", () => {
      this.css = this.$store.state.caseInfo.code.css;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"></style>
