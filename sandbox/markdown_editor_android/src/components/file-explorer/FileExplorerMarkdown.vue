<template>
  <div class="file-explorer__markdown">
    <div class="file-explorer__markdown-img">
      <img :src="MarkdownIcon" alt="" srcset="" />
    </div>
    <div class="file-explorer__markdown-title">{{ markdownTitle }}</div>
  </div>
</template>

<script>
import MarkdownIcon from "./assets/markdown_icon.svg";
export default {
  props: ["markdownTitle"],
  data() {
    return {
      MarkdownIcon,
    };
  },
};
</script>

<style lang="sass">
.file-explorer__markdown
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
            height: 100%
            width: 100%
    &-title
       margin-left: 8px
       overflow: hidden
</style>
