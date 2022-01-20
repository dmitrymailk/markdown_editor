<template>
  <div>
    <!-- <MilkdownEditor /> -->
    <ExampleEditor />
  </div>
</template>

<script>
// import { MilkdownEditor } from "./components/MilkdownEditor";
import ExampleEditor from "./components/official_examples/ExampleEditor.vue";
export default {
  name: "App",
  components: {
    // MilkdownEditor,
    ExampleEditor,
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
}
</style>
