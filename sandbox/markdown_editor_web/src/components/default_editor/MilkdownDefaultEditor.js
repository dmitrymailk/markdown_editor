// https://milkdown.dev/vue
import { defineComponent } from "vue";
import { Editor, rootCtx } from "@milkdown/core";
import { VueEditor, useEditor } from "@milkdown/vue";

// plugins
import { nord } from "@milkdown/theme-nord";
import { commonmark } from "@milkdown/preset-commonmark";
import { diagram } from "@milkdown/plugin-diagram";

const MilkdownDefaultEditor = defineComponent(() => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(nord)
      .use(commonmark)
      .use(diagram)
  );

  return () => <VueEditor editor={editor} />;
});

export { MilkdownDefaultEditor };
