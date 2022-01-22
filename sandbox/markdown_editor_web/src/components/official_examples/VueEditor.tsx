/* Copyright 2021, Milkdown by Mirone. */
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { slash } from "@milkdown/plugin-slash";

import {
  commonmarkNodes,
  //   commonmarkPlugins,
  image,
} from "@milkdown/preset-commonmark";
import { nord } from "@milkdown/theme-nord";
import { EditorRef, useEditor, VueEditor } from "@milkdown/vue";
import { DefineComponent, defineComponent, ref } from "vue";

// import  ImageCat from "./CatImage.vue"
import ImageDrawComponent from "./ImageDrawComponent.vue";

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
import { diagram } from "@milkdown/plugin-diagram";
import "katex/dist/katex.min.css";
// https://www.npmjs.com/package/material-icons
import "material-icons/iconfont/material-icons.css";

const ImageDraw: DefineComponent = defineComponent({
  name: "image-draw",
  setup() {
    return () => <ImageDrawComponent />;
  },
  components: {
    ImageDrawComponent,
  },
});

// import { createNode } from '@milkdown/utils';
import { listener, listenerCtx } from "@milkdown/plugin-listener";
// let output = '';

const MyEditor = defineComponent<{ markdown: string }>({
  name: "my-editor",
  setup: (props) => {
    const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null });
    const editor = useEditor((root, renderVue) => {
      const nodes = commonmarkNodes.configure(image, {
        view: renderVue(ImageDraw),
      });

      return (
        Editor.make()
          .config((ctx) => {
            ctx.set(rootCtx, root);
            ctx.set(defaultValueCtx, props.markdown);
            ctx
              .get(listenerCtx)
              .markdownUpdated((ctx, markdown, prevMarkdown) => {
                // @ts-ignore
                let output = markdown;
                // console.log(prevMarkdown, output);
              });
          })
          .use(nord)
          .use(nodes)
          .use(slash)

          .use(listener)
          .use(history)
          .use(cursor)
          // .use(table)
          .use(math)
          .use(tooltip)
          .use(indent)
          .use(menu())
          .use(upload)
          .use(prism)
          .use(diagram)
      );
    });

    return () => <VueEditor editorRef={editorRef} editor={editor} />;
  },
});
MyEditor.props = ["markdown"];

export { MyEditor };
