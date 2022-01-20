import { CmdKey, Ctx } from '@milkdown/core';
import type { Icon } from '@milkdown/design-system';
import type { EditorView } from '@milkdown/prose';
import type { Utils } from '@milkdown/utils';
import type { CommonConfig } from './default-config';
export declare type ButtonConfig<T = any> = {
    type: 'button';
    icon: Icon;
    active?: (view: EditorView) => boolean;
    key: CmdKey<T>;
    options?: T;
} & CommonConfig;
export declare const button: (utils: Utils, config: ButtonConfig, ctx: Ctx) => HTMLButtonElement;
//# sourceMappingURL=button.d.ts.map