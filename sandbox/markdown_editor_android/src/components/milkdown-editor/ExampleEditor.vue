<template>
  <MyEditor :markdown="markdown" />
</template>

<script>
import { MyEditor } from "./VueEditor";
import "material-icons/iconfont/material-icons.css";
const markdown = ``;
export default {
  data() {
    return {
      markdown,
    };
  },
  components: {
    MyEditor,
  },
};
</script>

<style lang="sass">
// body, #app, html, #app-container
//     height: 300px
//     width: 100%
//     margin: 0
//     overflow: hidden
//     touch-action: none

.drawing
    display: flex

.drawing canvas
   border: 1px solid black
   background: #ffffff
   margin: 0 auto


.milkdown-menu
    max-width: 965px
    margin: 0 auto

.ProseMirror.editor
    // width: 100%
    max-width: 695px
    margin: 0 auto

.milkdown
    height: 100vh
    width: 100%
</style>
