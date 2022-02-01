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
      <div class="directory-explorer__title">Files</div>
      <div class="directory-explorer__list">
        <FileExplorerFolder
          :folderTitle="folderName"
          :key="folderName"
          v-for="folderName in dirlist"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Filesystem, Directory } from "@capacitor/filesystem";
import OpenFileExplorerIcon from "./assets/open-file-explorer.svg";
import FileExplorerFolder from "./FileExplorerFolder.vue";

// это значит что папка создалась в /android/data/com.editor.markdown/
const APP_DIR = Directory.External;

export default {
  components: {
    FileExplorerFolder,
  },
  data() {
    return {
      OpenFileExplorerIcon,
      isEditorOpen: false,
      dirlist: [],
      workdir: "/markdown-editor/",
    };
  },
  methods: {
    async openFileExplorer() {
      console.log("clik");
      const appContainer = document.querySelector(".app-container");
      const disrList = this.$refs.show_dirlist;
      const workdir = this.workdir;
      const folderItems = await this.getFolderItems(workdir);
      this.dirlist = folderItems.files;

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
        console.log("request permission", permission);
      } else {
        console.log("permission ok");

        const dir = await Filesystem.readdir({
          path: path,
          directory: APP_DIR,
        });
        console.log(`dirlist of ${path}`, dir);
        return dir;
      }
    },
  },
  async mounted() {
    await Filesystem.requestPermissions();

    const openFolder = "/test1";
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
        const workdir = await Filesystem.mkdir({
          path: openFolder,
          directory: APP_DIR,
        });
        console.log(workdir);
      } catch (e) {
        errMessage = e.message;
        console.error(errMessage);
      }
    }
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
		margin-top: 16px
		height: 32px
	&__list
		overflow-y: scroll
		height: 100vh
		width: 100%
</style>
