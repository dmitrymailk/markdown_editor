/* Copyright 2021, Milkdown by Mirone. */
/*DRAWING*/
import { createCmd, createCmdKey } from "@milkdown/core";
import { setBlockType, textblockTypeInputRule } from "@milkdown/prose";
import { createNode } from "@milkdown/utils";
import mermaid from "mermaid";

import { remarkMermaid } from ".";
import { createInnerEditor } from "./inner-editor";
import { getStyle } from "./style";
import { getId } from "./utility";

import { DrawApp } from "../../../draw/DrawCanvas/js/main.js";

// const inputRegex = /^```mermaid$/;
const inputRegex = /^```test$/;
/**
graph TD;
    EditorState-->EditorView;
    EditorView-->DOMEvent;
    DOMEvent-->Transaction;
    Transaction-->EditorState; 
 */
export type Options = {
  placeholder: {
    empty: string;
    error: string;
  };
};

export const TurnIntoDiagram = createCmdKey();

export const drawingNode = createNode<string, Options>((utils, options) => {
  const { mermaidVariables, codeStyle, hideCodeStyle, previewPanelStyle } =
    getStyle(utils);
  const header = `%%{init: {'theme': 'base', 'themeVariables': { ${mermaidVariables()} }}}%%\n`;

  const id = "drawing";
  mermaid.startOnLoad = false;
  mermaid.initialize({ startOnLoad: false });

  const placeholder = {
    empty: "Empty",
    error: "Syntax Error",
    ...(options?.placeholder ?? {}),
  };

  return {
    id,
    schema: () => ({
      content: "text*",
      group: "block",
      marks: "",
      defining: true,
      atom: true,
      code: true,
      isolating: true,
      attrs: {
        value: {
          default: "",
        },
        identity: {
          default: "",
        },
      },
      parseDOM: [
        {
          tag: `div[data-type="${id}"]`,
          preserveWhitespace: "full",
          getAttrs: (dom) => {
            if (!(dom instanceof HTMLElement)) {
              throw new Error();
            }
            return {
              value: dom.dataset.value,
              identity: dom.id,
            };
          },
        },
      ],
      toDOM: (node) => {
        const identity = getId(node);
        return [
          "div",
          {
            id: identity,
            class: utils.getClassName(node.attrs, "mermaid"),
            "data-type": id,
            "data-value": node.attrs.value,
          },
          0,
        ];
      },
      parseMarkdown: {
        match: ({ type }) => type === id,
        runner: (state, node, type) => {
          const value = node.value as string;
          state.openNode(type, { value });
          if (value) {
            state.addText(value);
          }
          state.closeNode();
        },
      },
      toMarkdown: {
        match: (node) => node.type.name === id,
        runner: (state, node) => {
          //   state.addNode(
          //     "code",
          //     undefined,
          //     node.content.firstChild?.text || "",
          //     { lang: "mermaid" }
          //   );
          console.log(node);
          state.addNode("image", undefined, undefined, {
            title: "test_image",
            url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
            alt: "test_alt",
          });
        },
      },
    }),
    commands: (nodeType) => [
      createCmd(TurnIntoDiagram, () => setBlockType(nodeType, { id: getId() })),
    ],
    view: () => (node, view, getPos) => {
      const innerEditor = createInnerEditor(view, getPos);

      const currentId = getId(node);
      let currentNode = node;
      const dom = document.createElement("div");

      // create drawing canvas
      const canvas = document.createElement("canvas");
      canvas.id = `drawing-${currentId}`;
      canvas.width = 400;
      const drawApp = new DrawApp(canvas);

      dom.classList.add("mermaid", "diagram", "drawing");

      //   const rendered = document.createElement("div");
      //   rendered.id = currentId;
      //   if (previewPanelStyle) {
      //     rendered.classList.add(previewPanelStyle);
      //   }

      //   hello world element
      const helloWorld = document.createElement("h1");
      helloWorld.textContent = "helo world";
      dom.append(helloWorld);
      dom.append(canvas);
      //   dom.appendChild(rendered);

      return {
        dom,
        update: (updatedNode) => {
          //   debugger;
          if (!updatedNode.sameMarkup(currentNode)) return false;
          currentNode = updatedNode;

          const innerView = innerEditor.innerView();
          if (innerView) {
            const state = innerView.state;
            const start = updatedNode.content.findDiffStart(state.doc.content);
            if (start !== null && start !== undefined) {
              const diff = updatedNode.content.findDiffEnd(state.doc.content);
              if (diff) {
                let { a: endA, b: endB } = diff;
                const overlap = start - Math.min(endA, endB);
                if (overlap > 0) {
                  endA += overlap;
                  endB += overlap;
                }
                innerView.dispatch(
                  state.tr
                    .replace(start, endB, node.slice(start, endA))
                    .setMeta("fromOutside", true)
                );
              }
            }
          }
          //   place where I update
          //   const newVal = updatedNode.content.firstChild?.text || "";
          helloWorld.textContent = "newVal";
          dom.appendChild(helloWorld);

          return true;
        },
        selectNode: () => {
          if (!view.editable) return;
          dom.classList.add("ProseMirror-selectednode");
        },
        deselectNode: () => {
          innerEditor.closeEditor();
          dom.classList.remove("ProseMirror-selectednode");
        },
        stopEvent: (event) => {
          const innerView = innerEditor.innerView();
          const { target } = event;
          const isChild = target && innerView?.dom.contains(target as Element);
          return !!(innerView && isChild);
        },
        ignoreMutation: () => true,
        destroy() {
          //   rendered.remove();
          helloWorld.remove();
          dom.remove();
        },
      };
    },
    inputRules: (nodeType) => [
      textblockTypeInputRule(inputRegex, nodeType, () => ({ id: getId() })),
    ],
    // remarkPlugins: () => [remarkMermaid],
  };
});
