<template>
  <div class="file-explorer__markdown">
    <div class="file-explorer__markdown-img">
      <img :src="MarkdownIcon" alt="" srcset="" />
    </div>
    <div class="file-explorer__markdown-title">{{ markdownTitle }}</div>
    <div class="file-explorer__markdown-delete" @click="onDeleteEvent">
      <img :src="DeleteIcon" alt="" />
    </div>
  </div>
</template>

<script>
import MarkdownIcon from "./assets/markdown_icon.svg";
import DeleteIcon from "./assets/delete.svg";
export default {
  props: ["markdownTitle", "onDeleteEvent"],
  data() {
    return {
      MarkdownIcon,
      DeleteIcon,
    };
  },
};
</script>

<style lang="sass">
.file-explorer__markdown
    max-width: calc(100% - 4px)
    width: calc(100% - 4px)
    height: 40px
    align-items: center
    border-radius: 8px
    display: flex
    border: 2px solid #ccc
    margin-top: 4px
    &-img
        height: 32px
        width: 32px
        margin-left: 4px
        img
            height: 30px
            // width: 100%
    &-title
       margin-left: 8px
       overflow: hidden
       width: 175px
       white-space: nowrap
       color: #222
    &-delete
        height: 100%
        width: 40px
        display: flex
        align-items: center
        justify-content: center
        margin-left: auto
        img
            width: 22px
</style>
