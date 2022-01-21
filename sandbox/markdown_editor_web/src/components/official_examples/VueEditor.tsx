/* Copyright 2021, Milkdown by Mirone. */
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { slash } from '@milkdown/plugin-slash';

import { blockquote, 
    commonmarkNodes, 
    commonmarkPlugins, 
    heading, 
    // image, 
    paragraph 
} from '@milkdown/preset-commonmark';
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

import { createNode } from '@milkdown/utils';



const id = 'cat-image';
const my_cat_node = createNode(() => ({
    id,
    schema: {
        /* @ts-ignore */
        content: 'inline',
        group: 'block',
        parseDOM: [{ tag: 'image' }],
        toDOM: () => ['img', { class: 'cat-image-class' }, 0],
        parseMarkdown: {
            match: (node) => node.type === id,
            runner: (state, node, type) => {
                state.openNode(type).next(node.children).closeNode();
            },
        },
        toMarkdown: {
            match: (node) => node.type.name === id,
            runner: (state, node) => {
                state.openNode('cat-image').next(node.content).closeNode();
            },
        },
    },
}));


import { slashPlugin, createDropdownItem, defaultActions } from '@milkdown/plugin-slash';
import { themeToolCtx, commandsCtx } from '@milkdown/core';

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
                // .configure(image, {
                //     view: renderVue(MyCatImage),
                // });
                .configure(my_cat_node, {
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
                .use(slash.configure(slashPlugin, {
                    config: (ctx) => {
                        // Get default slash plugin items
                        const actions = defaultActions(ctx);
            
                        // Define a status builder
                        return ({ isTopLevel, content, parentNode }) => {
                            // You can only show something at root level
                            if (!isTopLevel) return null;
            
                            // Empty content ? Set your custom empty placeholder !
                            if (!content) {
                                return { placeholder: 'Type / to use the slash commands...' };
                            }
            
                            // Define the placeholder & actions (dropdown items) you want to display depending on content
                            if (content.startsWith('/')) {
                                // Add some actions depending on your content's parent node
                                if (parentNode.type.name === 'cat-image') {
                                    actions.push({
                                        id: 'cat-image',
                                        dom: createDropdownItem(ctx.get(themeToolCtx), 'cat-image', 'h1'),
                                        /* @ts-ignore */
                                        command: () => ctx.get(commandsCtx).call("cat-image"),
                                        /* @ts-ignore */
                                        keyword: ['cat-image'],
                                        enable: () => true,
                                    });
                                }
                                
                                return content === '/'
                                ? {
                                    placeholder: 'Type to filter...',
                                    actions,
                                }
                                : {
                                    /* @ts-ignore */
                                    actions: actions.filter((objectSome) =>{
                                        console.log(objectSome);
                                        // let keywo = keyword.some((key) => key.includes(content.slice(1).toLocaleLowerCase()));

                                        // return keywo;
                                    }
                                          ),
                                      };
                            }
                        };
                    },
                }))
        });

        return () => <VueEditor editorRef={editorRef} editor={editor} />;
    },
});
MyEditor.props = ['markdown'];

export {MyEditor}