import { PluginKey } from '@milkdown/prose';
import { Config } from './default-config';
export declare const menuKey: PluginKey<any, any>;
export declare type Options = {
    config: Config;
};
export declare const menu: import("@milkdown/utils/lib/src/types").WithExtend<string, Options, {
    [x: string]: import("prosemirror-model").NodeType<any>;
} & {
    [x: string]: import("prosemirror-model").MarkType<any>;
}, {
    schema?: ((ctx: import("@milkdown/core").Ctx) => {
        node?: Record<string, import("@milkdown/core").NodeSchema> | undefined;
        mark?: Record<string, import("@milkdown/core").MarkSchema> | undefined;
    }) | undefined;
    view?: ((ctx: import("@milkdown/core").Ctx) => Partial<{
        [x: string]: import("@milkdown/prose").NodeViewFactory;
    } & {
        [x: string]: import("@milkdown/prose").MarkViewFactory;
    }>) | undefined;
}>;
//# sourceMappingURL=index.d.ts.map