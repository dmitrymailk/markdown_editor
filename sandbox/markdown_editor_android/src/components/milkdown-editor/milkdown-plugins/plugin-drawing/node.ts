/* Copyright 2021, Milkdown by Mirone. */
/*DRAWING*/
import { createCmd, createCmdKey } from "@milkdown/core";
import { setBlockType, textblockTypeInputRule } from "@milkdown/prose";
import { createNode } from "@milkdown/utils";
import { customAlphabet } from "nanoid";
export const nanoid = customAlphabet("abcedfghicklmn", 10);

// @ts-ignore
import { DrawApp } from "../../../../libs/DrawCanvas/main.js";
const getId = (node?: any) => node?.attrs?.identity || nanoid();
const inputRegex = /^`draw$/;

export type Options = {
  placeholder: {
    empty: string;
    error: string;
  };
};

export const TurnIntoDiagram = createCmdKey();

export const drawingNode = createNode<string, Options>((utils, options) => {
  const id = "drawing";
  //   console.log(options);
  `${options}`;
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
      selectable: false,
      draggable: false,
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
            // console.log("parseDOM");
            return {
              value: dom.dataset.value,
              identity: dom.id,
            };
          },
        },
      ],
      toDOM: (node) => {
        const identity = getId(node);
        // console.log("toDOM");
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
          console.log("parseMarkdown");
        },
      },
      toMarkdown: {
        match: (node) => node.type.name === id,
        runner: (state, node) => {
          const url = node.attrs.value;
          //   console.log("toMarkdown", node);
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
      canvas.width = 600;
      canvas.height = 400;
      const setValue = (value: string) => {
        //   tr это transition который управляет состоянием редактора.
        // через него происходят все разметки в редакторе
        const { tr } = view.state;
        view.dispatch(
          tr.setNodeMarkup(getPos(), node.type, {
            value,
          })
        );
      };
      new DrawApp(canvas, setValue);

      dom.classList.add("drawing");

      dom.append(canvas);

      return {
        dom,
        update: (updatedNode) => {
          //   console.log("updatedNode", updatedNode);
          if (updatedNode.type.name !== id) return false;
          return true;
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
