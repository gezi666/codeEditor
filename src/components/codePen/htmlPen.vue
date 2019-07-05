<template>
  <article class="code-pen">
    <p class="label">HTML</p>
    <codemirror
      ref="htmlpen"
      v-model="html"
      :options="{ mode: 'text/html'}"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    ></codemirror>
  </article>
</template>

<script>
import Bus from "../../utils/bus.js";
import { setTimeout, clearTimeout } from "timers";
export default {
  name: "htmlPen",
  data() {
    return {
      html: "",
      timer: null,
      interval: 3000
    };
  },
  computed: {
    codemirror() {
      return this.$refs.htmlpen.codemirror;
    }
  },
  methods: {
    onCmReady(cm) {
      // console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      // console.log("the editor is focus!", cm);
    },
    onCmCodeChange(newCode) {
      // console.log("codeUpdate--html", newCode);
      let self = this;
      if (self.timer) clearTimeout(self.timer);
      self.timer = setTimeout(() => {
        self.$store.commit("updateCode", {
          html: newCode
        });
      }, self.interval);
    }
  },
  mounted() {
    // console.log("this is current codemirror object", this.codemirror);
    Bus.$on("update-code", () => {
      this.html = this.$store.state.caseInfo.code.html;
    });
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"></style>
