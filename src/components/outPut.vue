<template>
  <section class="output-wrap">
    <div class="resizer" @mousedown="mouseDown"></div>
    <iframe class="scan" id="scan" name="scan" src frameborder="0" width="100%" height="100%"></iframe>
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
    mouseDown() {
      document.addEventListener("mousemove", this.resize);
    },
    resize() {
      if (event.y < 200 || event.y > 800) return;
      var foot = document.querySelector(".output-wrap");
      var top = Number(foot.getBoundingClientRect().top);
      var height = Number(foot.getBoundingClientRect().height);
      foot.style.height = height + top - event.y + "px";
    },
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
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.resize);
    });
    window.frames["scan"].document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", this.resize);
    });
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
  flex none
  height 400px
  background #fff
  display flex
  flex-direction column
  overflow hidden
.resizer
  flex none
  height 17px
  background #333641
  cursor row-resize
.scan
  flex auto
</style>
