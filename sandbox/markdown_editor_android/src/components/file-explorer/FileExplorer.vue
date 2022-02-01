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
export default {
  components: {
    FileExplorerFolder,
  },
  data() {
    return {
      OpenFileExplorerIcon,
      isEditorOpen: false,
      dirlist: ["Folder 1", "Folder 2"],
    };
  },
  methods: {
    async openFileExplorer() {
      console.log("clik");
      const appContainer = document.querySelector(".app-container");
      const disrList = this.$refs.show_dirlist;
      const folderItems = await this.getFolderItems();
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
    async getFolderItems() {
      let permission = await Filesystem.checkPermissions();
      if (permission.publicStorage !== "granted") {
        permission = await Filesystem.requestPermissions();
        console.log("request permission", permission);
      } else {
        console.log("permission ok");
        const APP_DIR = Directory.ExternalStorage;
        console.log(APP_DIR);
        const dir = await Filesystem.readdir({
          path: "/",
          directory: APP_DIR,
        });
        console.log(dir);
        return dir;
      }
    },
  },
  //   async mounted() {
  //     const folderItems = await this.getFolderItems();
  //     console.log(folderItems);
  //   },
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
