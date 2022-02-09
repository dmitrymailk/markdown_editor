<template>
  <div class="markdown-editor">
    <div class="markdown-editor__filename">
      <input
        type="text"
        class="markdown-editor__filename-input"
        @input="setFilename"
        ref="filenameRef"
      />
    </div>
    <div class="markdown-editor__editor">
      <MyEditor :markdown="markdown" />
    </div>
  </div>
</template>

<script>
import { MyEditor } from "./VueEditor";
import "material-icons/iconfont/material-icons.css";
// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { renameFile } from "../file-explorer/file-explorer-utils";
export default {
  data() {
    return {
      markdown: "\n\n\n\n\n\n\n\n",
    };
  },
  components: {
    MyEditor,
  },
  methods: {
    async setFilename() {
      console.log("setFilename", this.$refs.filenameRef.value);
      const filename = this.$refs.filenameRef.value;
      let currentFilename = this.$store.state.currentFilename;
      console.log("setFilename prev", currentFilename);
      this.$store.commit("setPrevFilename", currentFilename);
      this.$store.commit("setCurrentFilename", filename);
      const prevFilename = this.$store.state.prevFilename;
      currentFilename = this.$store.state.currentFilename;
      await renameFile(prevFilename, currentFilename);
    },
  },
  mounted() {
    const filenameRef = this.$refs.filenameRef;
    filenameRef.value = "Untitled file";
    this.$store.commit("setFileNameRef", filenameRef);
  },
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
    &::-webkit-scrollbar
        display: none !important
    &::-webkitscrollbar-thumb
        display: none !important


.ProseMirror.editor
    touch-action: pan-y

.milkdown
    height: calc(100vh - 51px - 32px)
    width: 100%
    overflow-y: scroll
    -webkit-overflow-scrolling: touch


.menu-selector-list
    left: initial !important
    margin-top: 34px
</style>
