<template>
  <div class="file-explorer__folder">
    <div class="file-explorer__folder-img">
      <img :src="FolderIcon" alt="" srcset="" />
    </div>
    <div class="file-explorer__folder-title">{{ folderTitle }}</div>
  </div>
</template>

<script>
import FolderIcon from "./assets/folder_icon_2.svg";
export default {
  props: ["folderTitle"],
  data() {
    return {
      FolderIcon,
    };
  },
};
</script>

<style lang="sass">
.file-explorer__folder
    width: calc(100% - 4px)
    height: 40px
    align-items: center
    border-radius: 8px
    display: flex
    border: 2px solid #ccc
    margin-top: 4px
    &-img
        height: 26px
        width: 32px
        margin-left: 4px
        img
            height: 100%
            width: 100%
    &-title
       margin-left: 8px
       overflow: hidden
</style>
