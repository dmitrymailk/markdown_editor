<template>
  <div>
    <MilkdownEditor />
  </div>
</template>

<script>
import { MilkdownEditor } from "./components/MilkdownEditor";
export default {
  name: "App",
  components: {
    MilkdownEditor,
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100%;
}
</style>
