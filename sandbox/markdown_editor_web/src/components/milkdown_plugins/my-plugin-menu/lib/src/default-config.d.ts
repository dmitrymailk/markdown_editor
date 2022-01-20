import { EditorView } from '@milkdown/prose';
import { ButtonConfig } from './button';
import { SelectConfig } from './select';
export declare type CommonConfig = {
    disabled?: (view: EditorView) => boolean;
};
export declare type ConfigItem = SelectConfig | ButtonConfig;
export declare type Config = Array<Array<ConfigItem>>;
export declare const SelectParent: import("@milkdown/core").CmdKey<undefined>;
export declare const defaultConfig: Config;
//# sourceMappingURL=default-config.d.ts.map