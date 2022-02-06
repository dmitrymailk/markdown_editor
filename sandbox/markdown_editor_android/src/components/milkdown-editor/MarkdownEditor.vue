<template>
  <div class="markdown-editor">
    <div class="markdown-editor__filename">
      <input
        type="text"
        class="markdown-editor__filename-input"
        @input="setFilename"
        v-model="filename"
      />
    </div>
    <MyEditor :markdown="markdown" />
  </div>
</template>

<script>
import { MyEditor } from "./VueEditor";
import "material-icons/iconfont/material-icons.css";
// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export default {
  data() {
    return {
      filename: "Untitled file",
      markdown: "",
    };
  },

  components: {
    MyEditor,
  },
  methods: {
    setFilename() {
      console.log(this.filename);
      const filename = this.filename;
      this.$store.commit("setCurrentFilename", {
        filename,
      });
    },
  },
  // async mounted() {},
};
</script>

<style lang="sass">
.markdown-editor
    grid-column: 2 / 3
    &__filename
        height: 32px
        width: 100%
        border-bottom: 1px solid #000
        &-input
            height: 100%
            width: 100%
            outline: none
            border: none
            padding: 8px
            font-weight: 500
            font-size: 20px

.drawing
    display: flex

.drawing canvas
   border: 1px solid black
   background: #ffffff
   margin: 0 auto


.milkdown-menu
    max-width: 965px
    margin: 0 auto
    &::-webkit-scrollbar
        display: none !important
    &::-webkitscrollbar-thumb
        display: none !important


.ProseMirror.editor
    // width: 100%
    max-width: 695px
    margin: 0 auto

.milkdown
    height: calc(100vh - 51px - 32px)
    width: 100%
    overflow-y: scroll
</style>
