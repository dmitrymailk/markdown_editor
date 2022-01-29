<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="app-container">
        <ExampleEditor />
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  //   IonHeader,
  IonPage,
  //   IonTitle,
  //   IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
// import { MilkdownEditor } from "../components/MilkdownEditor";
import ExampleEditor from "../components/milkdown-editor/ExampleEditor.vue";

export default defineComponent({
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonTitle,
    // IonToolbar,
    ExampleEditor,
  },
});
</script>
