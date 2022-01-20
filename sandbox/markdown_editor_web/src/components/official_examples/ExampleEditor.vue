<template>
  <div>
    <MyEditor :markdown="markdown" />
  </div>
</template>

<script>
import { MyEditor } from "./VueEditor";
const markdown = `
# Milkdown Test
## Blockquote
> Milkdown is an editor.
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
