import { CmdKey, Ctx } from '@milkdown/core';
import { EditorView } from '@milkdown/prose';
import { Utils } from '@milkdown/utils';
import type { CommonConfig } from './default-config';
declare type SelectOptions = {
    id: string;
    text: string;
};
export declare type SelectConfig<T = any> = {
    type: 'select';
    text: string;
    options: SelectOptions[];
    active?: (view: EditorView) => string;
    onSelect: (id: string, view: EditorView) => [key: CmdKey<T>, info?: T];
} & CommonConfig;
export declare const select: (utils: Utils, config: SelectConfig, ctx: Ctx, view: EditorView) => HTMLDivElement;
export {};
//# sourceMappingURL=select.d.ts.map