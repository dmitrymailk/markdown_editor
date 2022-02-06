/* Copyright 2021, Milkdown by Mirone. */
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { slash } from "@milkdown/plugin-slash";

import {
  //   commonmarkPlugins,
  commonmark,
  //   image,
} from "@milkdown/preset-commonmark";
// import { nord } from "@milkdown/theme-nord";
import { EditorRef, useEditor, VueEditor } from "@milkdown/vue";
import { defineComponent, ref } from "vue";

// import  ImageCat from "./CatImage.vue"
// import ImageDrawComponent from "./ImageDrawComponent.vue";

// plugins
import { history } from "@milkdown/plugin-history";
import { cursor } from "@milkdown/plugin-cursor";
// import { table } from "@milkdown/plugin-table";
import { math } from "@milkdown/plugin-math";
import { tooltip } from "@milkdown/plugin-tooltip";
import { indent } from "@milkdown/plugin-indent";
// https://www.npmjs.com/package/@milkdown/plugin-menu
import { menu } from "@milkdown/plugin-menu";
import { upload } from "@milkdown/plugin-upload";
import { prism } from "@milkdown/plugin-prism";
// import { diagram } from "../milkdown_plugins/plugin-diagram/src";
import { drawing } from "./milkdown-plugins/plugin-drawing";
import "katex/dist/katex.min.css";

import { nord } from "./milkdown-plugins/plugin-theme-nord";

import { listener, listenerCtx } from "@milkdown/plugin-listener";

// vuex
import { store } from "@/store";
import { saveTextFile } from "../file-explorer/file-explorer-utils";

const MyEditor = defineComponent<{ markdown: string }>({
  name: "my-editor",
  setup: (props) => {
    const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null });
    const editor = useEditor((root, renderVue) => {
      `${renderVue}`;
      return (
        Editor.make()
          .config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, props.markdown);
            ctx
              .get(listenerCtx)
              .markdownUpdated(async (ctx, markdown, prevMarkdown) => {
                const output = markdown;
                `${prevMarkdown} ${output}`;
                // console.log(output);
                store.commit("setEditorText", {
                  editorText: output,
                });
                const currentFilename = localStorage.currentFilename;

                await saveTextFile(currentFilename, output);
              });
            store.commit("setEditorContext", {
              editorContext: ctx,
            });
          })
          .use(nord)
          // .use(nodes)
          .use(commonmark)
          .use(slash)
          .use(listener)
          .use(history)
          .use(cursor)
          .use(math)
          .use(tooltip)
          .use(indent)
          .use(menu())
          .use(upload)
          .use(prism)
          .use(drawing)
      );
    });
    store.commit("setEditor", editorRef);
    const vueComponent = <VueEditor editorRef={editorRef} editor={editor} />;
    // @ts-ignore
    return () => vueComponent;
  },
});
MyEditor.props = ["markdown"];
MyEditor.computed = {};

export { MyEditor };
