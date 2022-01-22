<template>
  <div>
    <!-- <ExampleEditor /> -->
    <MilkdownDefaultEditor />
  </div>
</template>

<script>
import ExampleEditor from "./components/official_examples/ExampleEditor.vue";
import MilkdownDefaultEditor from "./components/default_editor/MilkdownDefaultEditor.vue";
export default {
  name: "App",
  components: {
    ExampleEditor,
    MilkdownDefaultEditor,
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
}
</style>
