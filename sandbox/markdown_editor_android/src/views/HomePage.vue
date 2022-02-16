<template>
  <div class="app-container app-container_closed">
    <FileExplorer />
    <MarkdownEditor v-show="isEditorOpen" />
    <EmptyPage v-if="!isEditorOpen" />
  </div>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import { IonContent, IonPage, IonRouterOutlet, IonTabs } from "@ionic/vue";
import { defineComponent } from "vue";

// custom components
import FileExplorer from "../components/file-explorer/FileExplorer.vue";
import MarkdownEditor from "../components/milkdown-editor/MarkdownEditor.vue";
import EmptyPage from "../views/EmptyPage.vue";

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    FileExplorer,
    IonRouterOutlet,
    IonTabs,
    MarkdownEditor,
    EmptyPage,
  },
  computed: {
    isEditorOpen() {
      return this.$store.state.isEditorOpen;
    },
  },
});
</script>

, MarkdownEditor
<style lang="sass">
.app-container
    display: grid
    height: 100%
    width: 100%
    overflow: scroll
    &_opened
        grid-template-columns: 300px calc( 100% - 300px )
    &_closed
        grid-template-columns: 32px calc( 100% - 32px )

#app, body, html
    width: 100%
    height: 100%
    background: #ffffff
</style>
