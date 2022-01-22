/* Copyright 2021, Milkdown by Mirone. */

import { AtomList } from "@milkdown/utils";

import { drawingNode } from "./node";

export * from "./remark-mermaid";

export const drawing = AtomList.create([drawingNode()]);

export type { Options } from "./node";
export { TurnIntoDiagram } from "./node";
