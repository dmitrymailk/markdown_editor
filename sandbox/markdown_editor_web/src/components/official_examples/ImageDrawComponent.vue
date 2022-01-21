<template>
  <div>
    <h1>Image draw</h1>
    <canvas touch-action="none" id="board" width="640" height="640">
      Opps, you cannot play draw N guess with this browser!
    </canvas>
  </div>
</template>
<script>
import { DrawApp } from "../draw/DrawCanvas/js/main";
export default {
  mounted() {
    let drawApp = new DrawApp("board");
    console.log("hello world", drawApp);
  },
};
</script>

<style lang="css">
canvas {
  background: white;
}
.ProseMirror-selectednode {
  -webkit-user-drag: false;
}
</style>
