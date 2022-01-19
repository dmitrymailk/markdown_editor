import { defineComponent } from "vue";
import { Editor, rootCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { VueEditor, useEditor } from "@milkdown/vue";

// plugins
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { cursor } from "@milkdown/plugin-cursor";
import { table } from "@milkdown/plugin-table";
import { math } from "@milkdown/plugin-math";
import { tooltip } from "@milkdown/plugin-tooltip";
import { slash } from "@milkdown/plugin-slash";
import { indent } from "@milkdown/plugin-indent";
// https://www.npmjs.com/package/@milkdown/plugin-menu
import { menu } from "@milkdown/plugin-menu";
import { upload } from "@milkdown/plugin-upload";
import { prism } from "@milkdown/plugin-prism";
import "katex/dist/katex.min.css";
// https://www.npmjs.com/package/material-icons
import "material-icons/iconfont/material-icons.css";

export const MilkdownEditor = defineComponent(() => {
  const editor = useEditor((root) =>
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
      })
      .use(nord)
      .use(commonmark)
      .use(history)
      .use(cursor)
      .use(table)
      .use(math)
      .use(tooltip)
      .use(slash)
      .use(indent)
      .use(menu())
      .use(upload)
      .use(prism)
  );

  return () => <VueEditor editor={editor} />;
});
