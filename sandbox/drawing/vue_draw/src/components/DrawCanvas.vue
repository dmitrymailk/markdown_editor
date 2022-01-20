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
import { initDrawingApp } from "../components/DrawCanvas/js/main";
export default {
  mounted() {
    console.log("hello world", initDrawingApp);
  },
};
</script>
