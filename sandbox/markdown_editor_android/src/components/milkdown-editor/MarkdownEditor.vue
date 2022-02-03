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

const markdown = ``;
export default {
  data() {
    return {
      markdown,
      filename: "Untitled file",
    };
  },
  computed: {
    editorText() {
      return this.$store.editorText;
    },
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
  async mounted() {
    // let permission = await Filesystem.checkPermissions();
    // if (permission.publicStorage !== "granted") {
    //   permission = await Filesystem.requestPermissions();
    //   console.log("request permission", permission);
    // } else {
    //   console.log("permission ok");
    //   const APP_DIR = Directory.ExternalStorage;
    //   console.log(APP_DIR);
    //   try {
    //     const dir = await Filesystem.readdir({
    //       path: "/",
    //       directory: APP_DIR,
    //     });
    //     console.log(dir);
    //   } catch (error) {
    //     console.log("mounted", error);
    //   }
    // }
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
