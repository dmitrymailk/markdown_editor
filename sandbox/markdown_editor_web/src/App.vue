<template>
  <div>
    <ExampleEditor />
  </div>
</template>

<script>
import ExampleEditor from "./components/official_examples/ExampleEditor.vue";
export default {
  name: "App",
  components: {
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
