<template>
  <section class="code-pen-wrap">
    <ht-pen />
    <js-pen />
    <css-pen />
    <data-pen />
  </section>
</template>

<script>
import HtmlPen from "./htmlPen";
import JsPen from "./jsPen";
import CssPen from "./cssPen";
import DataPen from "./dataPen";
export default {
  name: "codePen",
  components: {
    "ht-pen": HtmlPen,
    JsPen,
    CssPen,
    DataPen
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.code-pen-wrap
  width 50%
  flex auto
  display flex
  flex-direction column
  align-items stretch
  background gray
  overflow hidden
  .code-pen
    flex 1 0
    height 25%
    padding-bottom 50px
    border-bottom 1px solid black
    background #272822
.vue-codemirror, .CodeMirror
  height 100%
.label
  cursor pointer
  height 40px
  line-height 40px
  padding-left 10px
  font-size 10px
  color #fff
  border-bottom 1px solid #333
</style>
