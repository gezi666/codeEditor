<template>
  <section class="output-wrap">
    <iframe
      class="scan"
      id="scan"
      name="scan"
      src
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="no"
    ></iframe>
  </section>
</template>

<script>
export default {
  name: "outPut",
  data() {
    return {};
  },
  computed: {
    sourceCode() {
      return this.$store.state.caseInfo.code;
    },
    finalJS() {
      let JS = this.$store.state.caseInfo.code.js;
      let dataSource = this.$store.state.caseInfo.code.dataSource;
      return dataSource ? JS.replace("MY_DATA", dataSource) : JS;
    },
    vendors() {
      return this.$store.state.caseInfo.vendors;
    }
  },
  methods: {
    updateDom(code) {
      const iframe = document.getElementById("scan");

      let style = this.sourceCode.css
        ? `<style> ${this.sourceCode.css} </style>`
        : "";

      let body = this.sourceCode.html;

      let vds = this.vendors
        .map(item => {
          return `<script src='${item}'><\/script>`;
        })
        .join("\n");
      let js = this.finalJS ? `<script> ${this.finalJS} <\/script>` : "";
      let script = `${vds} \n ${js}`;

      let vDom = `<!DOCTYPE html><html><head>${style}</head><body>${body} \n ${script}</body></html>`;

      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(vDom);
      iframe.contentWindow.document.close();
    }
  },
  mounted() {
    // document.addEventListener("mouseup", () => {
    //   document.removeEventListener("mousemove", this.resize);
    // });
    // window.frames["scan"].document.addEventListener("mouseup", () => {
    //   document.removeEventListener("mousemove", this.resize);
    // });
  },
  watch: {
    sourceCode: {
      deep: true,
      handler(val) {
        this.updateDom(val);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.output-wrap
  width 50%
  flex auto
  padding 10px
  background #fff
  display flex
  overflow hidden
.scan
  overflow hidden
</style>
