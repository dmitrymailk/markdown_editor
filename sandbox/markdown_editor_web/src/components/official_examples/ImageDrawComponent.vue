<template>
  <div>
    <canvas ref="drawCanvas" width="640" height="440" />
  </div>
</template>
<script>
import { DrawApp } from "../draw/DrawCanvas/js/main";
export default {
  mounted() {
    let drawApp = new DrawApp(this.$refs.drawCanvas);
    console.log("hello world", drawApp);
    console.log();
    this.$refs.drawCanvas.parentElement.parentElement.draggable = false;
  },
};
</script>

<style lang="css">
canvas {
  background: white;
  border: 1px solid #000;
}
</style>
