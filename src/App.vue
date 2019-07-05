<template>
  <div id="app">
    <Headbar/>
    <Codepen/>
    <Output/>
  </div>
</template>

<script>
import Headbar from "./components/headbar";
import Codepen from "./components/codePen/codePen";
import Output from "./components/outPut";
export default {
  name: "app",
  components: {
    Headbar,
    Codepen,
    Output
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  min-width: 1080px;
}
*,
*:before,
*.after {
  box-sizing: border-box;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #aaa;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
