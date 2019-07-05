<template>
  <article class="code-pen">
    <p class="label">JavaScript</p>
    <codemirror
      ref="jspen"
      v-model="js"
      :options="{ mode: 'text/javascript'}"
      @input="onCmCodeChange"
    ></codemirror>
  </article>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
import Bus from "../../utils/bus.js";
export default {
  name: "jsPen",
  data() {
    return {
      js: "",
      timer: null,
      interval: 3000
    };
  },
  methods: {
    onCmCodeChange(newCode) {
      // console.log("codeUpdate--js", newCode);
      let self = this;
      if (self.timer) clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        self.$store.commit("updateCode", {
          js: newCode
        });
      }, self.interval);
    }
  },
  mounted() {
    Bus.$on("update-code", () => {
      this.js = this.$store.state.caseInfo.code.js;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"></style>
