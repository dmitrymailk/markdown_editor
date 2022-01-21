/* Copyright 2021, Milkdown by Mirone. */
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { slash } from '@milkdown/plugin-slash';

import { 
    commonmarkNodes, 
    commonmarkPlugins, 
    
    image, 
     
} from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { EditorRef, useEditor, VueEditor } from '@milkdown/vue';
import { 
    DefineComponent, 
    defineComponent,   ref } from 'vue';




    
import  ImageCat from "./CatImage.vue"

const MyCatImage: DefineComponent = defineComponent({
    name: 'my-cat-image',
    setup() {
        return () => <ImageCat />;
    },
    components: {
        ImageCat
    }
});


// import { createNode } from '@milkdown/utils';




const MyEditor = defineComponent<{ markdown: string }>({
    name: 'my-editor',
    setup: (props) => {
        const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null });
        const editor = useEditor((root, renderVue) => {
            const nodes = commonmarkNodes
                .configure(image, {
                    view: renderVue(MyCatImage),
                });
               
            return Editor.make()
                .config((ctx) => {
                    ctx.set(rootCtx, root);
                    ctx.set(defaultValueCtx, props.markdown);
                })
                .use(nord)
                .use(nodes)
                .use(commonmarkPlugins)
                .use(slash)
        });

        return () => <VueEditor editorRef={editorRef} editor={editor} />;
    },
});
MyEditor.props = ['markdown'];

export {MyEditor}