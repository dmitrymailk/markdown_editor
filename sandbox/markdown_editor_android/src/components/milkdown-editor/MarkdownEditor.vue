<template>
  <div class="markdown-editor">
    <MyEditor :markdown="markdown" />
  </div>
</template>

<script>
import { MyEditor } from "./VueEditor";
import "material-icons/iconfont/material-icons.css";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

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
  methods: {
    async writeSecretFile() {
      await Filesystem.writeFile({
        path: "secrets/text.txt",
        data: "This is a test",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
    },
    async readSecretFile() {
      const contents = await Filesystem.readFile({
        path: "secrets/text.txt",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });

      console.log("secrets:", contents);
    },
    async deleteSecretFile() {
      await Filesystem.deleteFile({
        path: "secrets/text.txt",
        directory: Directory.Documents,
      });
    },
    async readFilePath() {
      // Here's an example of reading a file with a full file path. Use this to
      // read binary data (base64 encoded) from plugins that return File URIs, such as
      // the Camera.
      const contents = await Filesystem.readFile({
        path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
      });

      console.log("data:", contents);
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
    height: calc(100vh - 51px)
    width: 100%
    overflow-y: scroll
</style>
