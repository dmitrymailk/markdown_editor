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
const inputRegex = /^`q$/;
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
          tag: `canvas[data-type="${id}"]`,
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
          "canvas",
          {
            id: identity,
            class: utils.getClassName(node.attrs, "drawing"),
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
          const url = node.attrs.value;
          console.log("toMarkdown", node);
          state.addNode("image", undefined, undefined, {
            title: "",
            url: url,
            alt: "",
          });
        },
      },
    }),
    commands: (nodeType) => [
      createCmd(TurnIntoDiagram, () => setBlockType(nodeType, { id: getId() })),
    ],
    view: () => (node, view, getPos) => {
      const currentId = getId(node);
      const dom = document.createElement("div");

      // create drawing canvas
      const canvas = document.createElement("canvas");
      canvas.id = `drawing-${currentId}`;
      canvas.width = 400;
      const setValue = (value: string) => {
        const { tr } = view.state;
        view.dispatch(
          tr.setNodeMarkup(getPos(), node.type, {
            value,
          })
        );
      };
      const drawApp = new DrawApp(canvas, setValue);

      dom.classList.add("drawing");

      dom.append(canvas);

      return {
        dom,
        update: (updatedNode) => {
          console.log("updatedNode", updatedNode);
          return true;
        },
        selectNode: () => {
          if (!view.editable) return;
        },
        deselectNode: () => {},
        stopEvent: (event) => {
          return false;
        },
        ignoreMutation: () => true,
        destroy() {
          canvas.remove();
          dom.remove();
        },
      };
    },
    inputRules: (nodeType) => [
      textblockTypeInputRule(inputRegex, nodeType, () => ({ id: getId() })),
    ],
  };
});
