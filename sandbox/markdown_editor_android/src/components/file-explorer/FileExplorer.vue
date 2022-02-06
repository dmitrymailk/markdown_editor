<template>
  <div class="file-explorer">
    <div class="file-explorer__tools">
      <div
        class="file-explorer__show-dirlist file-explorer__show-dirlist_closed"
        @click="openFileExplorer"
        ref="show_dirlist"
      >
        <img :src="OpenFileExplorerIcon" />
      </div>
    </div>
    <div class="directory-explorer" v-if="isEditorOpen">
      <div class="directory-explorer__head">
        <div class="directory-explorer__title">Files</div>
        <div class="directory-explorer__create-file" @click="createFile">
          <img :src="AddNewFileIcon" alt="" />
        </div>
      </div>
      <div class="directory-explorer__list">
        <template v-for="elem in dirlist">
          <FileExplorerFolder
            v-if="elem.type == 'folder'"
            :folderTitle="elem.name"
            :key="elem.name"
          />

          <FileExplorerMarkdown
            v-else-if="elem.type == 'md_file'"
            :markdownTitle="elem.name"
            :key="elem.name"
            @click="() => openMarkdown(elem)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// milkdown
import { editorViewCtx, parserCtx } from "@milkdown/core";
import { Slice } from "prosemirror-model";

// svg icons
import OpenFileExplorerIcon from "./assets/open_file_explorer.svg";
import AddNewFileIcon from "./assets/add_file.svg";

// fileeditor components
import FileExplorerFolder from "./FileExplorerFolder.vue";
import FileExplorerMarkdown from "./FileExplorerMarkdown.vue";

// file utils
import { getFileContent } from "./file-explorer-utils";

// это значит что папка создалась в /android/data/com.editor.markdown/
const APP_DIR = Directory.External;
const ENCODING = Encoding.UTF8;
const WORK_DIR = "/markdown-editor/";
export default {
  components: {
    FileExplorerFolder,
    FileExplorerMarkdown,
  },
  data() {
    return {
      // svg icons
      OpenFileExplorerIcon,
      AddNewFileIcon,
      isEditorOpen: false,
      dirlist: [],
    };
  },
  methods: {
    async openFileExplorer() {
      const appContainer = document.querySelector(".app-container");
      const disrList = this.$refs.show_dirlist;
      const folderItems = await this.getFolderItems(WORK_DIR);
      this.dirlist = this.splitFoldersMarkdown(folderItems.files);

      if (this.isEditorOpen) {
        // app containter
        appContainer.classList.remove("app-container_opened");
        appContainer.classList.add("app-container_closed");
        // dirlist
        disrList.classList.remove("file-explorer__show-dirlist_opened");
        disrList.classList.add("file-explorer__show-dirlist_closed");
      } else {
        // app containter
        appContainer.classList.remove("app-container_closed");
        appContainer.classList.add("app-container_opened");
        // dirlist
        disrList.classList.remove("file-explorer__show-dirlist_closed");
        disrList.classList.add("file-explorer__show-dirlist_opened");
      }
      this.isEditorOpen = !this.isEditorOpen;
    },
    async getFolderItems(path) {
      let permission = await Filesystem.checkPermissions();
      if (permission.publicStorage !== "granted") {
        permission = await Filesystem.requestPermissions();
        console.warn("request permission", permission);
      } else {
        console.log("permission ok");

        const dir = await Filesystem.readdir({
          path: path,
          directory: APP_DIR,
        });
        // console.log(`dirlist of ${path}`, dir);
        return dir;
      }
    },

    async createFile() {
      //   console.log("create file");
      try {
        const filename = "test.md";
        const file = await Filesystem.writeFile({
          path: `${WORK_DIR}${filename}`,
          data: "## Hellloooo world",
          directory: APP_DIR,
          encoding: ENCODING,
        });
        console.log(file);
      } catch (e) {
        console.error("err create file", e);
      }
    },

    splitFoldersMarkdown(folderItems) {
      let result = [];
      folderItems.forEach((element) => {
        if (element.includes(".")) {
          if (element.includes(".md"))
            result.push({
              type: "md_file",
              name: element,
            });
        } else {
          result.push({
            type: "folder",
            name: element,
          });
        }
      });
      return result;
    },

    async openMarkdown(elem) {
      //   console.log(elem);
      const filename = elem.name;
      console.log(filename);
      this.$store.commit("setCurrentFilename", filename);
      console.log(this.$store.state.filenameRef);
      this.$store.state.filenameRef.value = filename;
      const content = await getFileContent(filename);
      //   console.log("editor content", content);
      this.$store.commit("setEditorOpen", true);
      this.$store.commit("setEditorText", {
        editorText: content,
      });

      let editor = this.$store.state.editor.get();
      console.log("EDITOR", editor);
      editor.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);
        const doc = parser(content);
        if (!doc) return;
        const state = view.state;
        view.dispatch(
          state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc.content, 0, 0)
          )
        );
      });

      this.$store.commit("setCurrentFilename", filename);
    },
  },

  async mounted() {
    await Filesystem.requestPermissions();

    const openFolder = "/markdown-editor/";
    let errMessage = "";
    try {
      const getFolder = await Filesystem.readdir({
        path: openFolder,
        directory: APP_DIR,
      });
      console.log("getFolder", getFolder);
    } catch (e) {
      errMessage = e.message;
      console.error(e.message);
    }

    if (errMessage === "Directory does not exist") {
      try {
        await Filesystem.mkdir({
          path: openFolder,
          directory: APP_DIR,
        });
        // console.log(workdir);
      } catch (e) {
        errMessage = e.message;
        console.error(errMessage);
      }
    }

    await this.openFileExplorer();
  },
};
</script>
<style lang="sass">
.file-explorer
	grid-column: 1/2
	border-right: 1px solid #666
	display: flex
	width: 100%
	&__show-dirlist
		cursor: pointer
		margin-top: 32px
		width: 32px
		height: 32px
		transition: transform 80ms
		img
			height: 100%
			width: 100%
		&_opened
			transform: scaleX(-1)
		&_closed
			transform: scaleX(1)

	&__tools
		width: 32px
		border-right: 1px solid #666


.directory-explorer
	width: 100%
	display: flex
	flex-direction: column
	align-items: center
	height: 100vh
	&__title
		width: 100%
		margin: 16px 0 0 8px
		height: 32px
	&__list
		overflow-y: scroll
		height: 100vh
		width: 100%
		display: flex
		align-items: center
		flex-direction: column
	&__head
		width: 100%
		display: flex
		align-items: center
		border-bottom: 1px solid #000
	&__create-file
		height: 100%
		width: 48px
		display: flex
		align-items: center
		justify-content: center
		img
			height: 32px
			width: 32px
</style>
