<template>
  <div>
    <canvas touch-action="none" id="board" width="640" height="240">
      Opps, you cannot play draw N guess with this browser!
    </canvas>
  </div>
</template>

<script>
import { DrawApp } from "../components/DrawCanvas/js/main";
export default {
  mounted() {
    let drawApp = new DrawApp("board");
    console.log("hello world", drawApp);
  },
};
</script>
<style>
#board {
  height: 400px;
  width: 500px;
  border: 1px solid #000;
}
</style>
