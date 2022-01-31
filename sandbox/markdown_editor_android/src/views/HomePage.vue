<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="app-container app-container_closed">
        <FileExplorer />
        <MarkdownEditor />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import MarkdownEditor from "../components/milkdown-editor/MarkdownEditor.vue";
import FileExplorer from "../components/file-explorer/FileExplorer.vue";
export default defineComponent({
  components: {
    IonContent,
    IonPage,
    MarkdownEditor,
    FileExplorer,
  },
});
</script>

<style lang="sass">
.app-container
    display: grid
    height: 100%
    width: 100%
    &_opened
        grid-template-columns: 300px auto
    &_closed
        grid-template-columns: 32px auto
</style>
