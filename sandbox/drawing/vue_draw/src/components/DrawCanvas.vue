<template>
  <div>
    <canvas
      touch-action="none"
      id="board"
      width="640"
      height="640"
      style="width: 320px; height: 320px"
    >
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
