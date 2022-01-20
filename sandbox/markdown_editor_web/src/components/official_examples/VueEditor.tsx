/* Copyright 2021, Milkdown by Mirone. */
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { slash } from '@milkdown/plugin-slash';
import { blockquote, commonmarkNodes, commonmarkPlugins, heading, image, paragraph } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';
import { EditorRef, nodeMetadata, useEditor, VueEditor } from '@milkdown/vue';
import { DefineComponent, defineComponent,  inject, ref } from 'vue';

const MyParagraph: DefineComponent = defineComponent({
    name: 'my-paragraph',
    setup(_, { slots }) {
        return () => <div class="my-paragraph">{slots.default?.()}</div>;
    },
});
const MyHeading = defineComponent({
    name: 'my-heading',
    setup: (_, { slots }) => {
        const node = inject(nodeMetadata)?.node;
        return () => {
            return (
                <div class={`my-heading ${!node?.attrs.level ? '' : 'heading' + node?.attrs.level}`}>
                    {slots.default?.()}
                </div>
            );
        };
    },
});
// const MyImage: DefineComponent = defineComponent({
//     name: 'my-image',
//     setup() {
//         const node = inject(nodeMetadata)?.node;
//         return () => <img class="image" src="" alt={node?.attrs.alt} />;
//     },
// });

const MyCatImage: DefineComponent = defineComponent({
    name: 'my-cat-image',
    setup() {
        // const node = inject(nodeMetadata)?.node;
        const catUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1280px-Cat03.jpg"
        return () => <img class="image" src={catUrl} style={{width:"100%"}} />;
    },
});
const MyQuote: DefineComponent = defineComponent({
    name: 'my-quote',
    setup(_, { slots }) {
        return () => <section class="my-quote">{slots.default?.()}</section>;
    },
});

const MyEditor = defineComponent<{ markdown: string }>({
    name: 'my-editor',
    setup: (props) => {
        const editorRef = ref<EditorRef>({ get: () => undefined, dom: () => null });
        const editor = useEditor((root, renderVue) => {
            const nodes = commonmarkNodes
                .configure(heading, {
                    view: renderVue(MyHeading),
                })
                .configure(paragraph, {
                    view: renderVue(MyParagraph),
                })
                .configure(blockquote, {
                    view: renderVue(MyQuote),
                })
                .configure(image, {
                    view: renderVue(MyCatImage),
                });
                // .configure(image, {
                //     view: renderVue(MyImage),
                // });
            // setTimeout(() => {
            //     console.log(editorRef.value.get());
            // }, 100);
            return Editor.make()
                .config((ctx) => {
                    ctx.set(rootCtx, root);
                    ctx.set(defaultValueCtx, props.markdown);
                })
                .use(nord)
                .use(nodes)
                .use(commonmarkPlugins)
                .use(slash);
        });

        return () => <VueEditor editorRef={editorRef} editor={editor} />;
    },
});
MyEditor.props = ['markdown'];

export {MyEditor}