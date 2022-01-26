<template>
  <div>
    <MyEditor :markdown="markdown" />
  </div>
</template>

<script>
import { MyEditor } from "./VueEditor";
const markdown = `
`;
export default {
  data() {
    return {
      markdown,
    };
  },
  components: {
    MyEditor,
  },
};
</script>

<style>
.drawing canvas {
  border: 1px solid black;
}
</style>
