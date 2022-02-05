<template>
  <HomePage />
</template>

<script lang="ts">
// import { IonApp } from "@ionic/vue";
import { defineComponent } from "vue";
import HomePage from "./views/HomePage.vue";
export default defineComponent({
  name: "App",
  components: {
    // IonApp,
    HomePage,
  },
});
</script>
