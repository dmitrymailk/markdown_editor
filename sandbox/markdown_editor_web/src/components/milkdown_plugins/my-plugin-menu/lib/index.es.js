var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (let prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (let prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { createCmdKey, commandsCtx, createCmd } from "@milkdown/core";
import {
  TextSelection,
  setBlockType,
  undo,
  redo,
  wrapIn,
  liftListItem,
  sinkListItem,
  PluginKey,
  selectParentNode,
  Plugin,
} from "@milkdown/prose";
import { createPlugin } from "@milkdown/utils";
import { Undo, Redo } from "@milkdown/plugin-history";
import {
  TurnIntoHeading,
  ToggleBold,
  ToggleItalic,
  ToggleStrikeThrough,
  WrapInBulletList,
  WrapInOrderedList,
  TurnIntoTaskList,
  LiftListItem,
  SinkListItem,
  ToggleLink,
  InsertImage,
  InsertTable,
  TurnIntoCodeFence,
  WrapInBlockquote,
  InsertHr,
} from "@milkdown/preset-gfm";
const hasMark = (state, type) => {
  if (!type) return false;
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    return !!type.isInSet(state.storedMarks || $from.marks());
  }
  return state.doc.rangeHasMark(from, to, type);
};
const SelectParent = createCmdKey();
const defaultConfig = [
  [
    {
      type: "select",
      text: "Heading",
      options: [
        { id: "1", text: "Large Heading" },
        { id: "2", text: "Medium Heading" },
        { id: "3", text: "Small Heading" },
      ],
      disabled: (view) => {
        const { state } = view;
        const setToHeading = (level) =>
          setBlockType(state.schema.nodes.heading, { level })(state);
        return (
          !(view.state.selection instanceof TextSelection) ||
          !(setToHeading(1) || setToHeading(2) || setToHeading(3))
        );
      },
      onSelect: (id) => [TurnIntoHeading, Number(id)],
    },
  ],
  [
    {
      type: "button",
      icon: "undo",
      key: Undo,
      disabled: (view) => {
        return !undo(view.state);
      },
    },
    {
      type: "button",
      icon: "redo",
      key: Redo,
      disabled: (view) => {
        return !redo(view.state);
      },
    },
  ],
  [
    {
      type: "button",
      icon: "bold",
      key: ToggleBold,
      active: (view) => hasMark(view.state, view.state.schema.marks.strong),
      disabled: (view) => !view.state.schema.marks.strong,
    },
    {
      type: "button",
      icon: "italic",
      key: ToggleItalic,
      active: (view) => hasMark(view.state, view.state.schema.marks.em),
      disabled: (view) => !view.state.schema.marks.em,
    },
    {
      type: "button",
      icon: "strikeThrough",
      key: ToggleStrikeThrough,
      active: (view) =>
        hasMark(view.state, view.state.schema.marks.strike_through),
      disabled: (view) => !view.state.schema.marks.strike_through,
    },
  ],
  [
    {
      type: "button",
      icon: "bulletList",
      key: WrapInBulletList,
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.bullet_list)(state);
      },
    },
    {
      type: "button",
      icon: "orderedList",
      key: WrapInOrderedList,
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.ordered_list)(state);
      },
    },
    {
      type: "button",
      icon: "taskList",
      key: TurnIntoTaskList,
      disabled: (view) => {
        const { state } = view;
        return !wrapIn(state.schema.nodes.task_list_item)(state);
      },
    },
    {
      type: "button",
      icon: "liftList",
      key: LiftListItem,
      disabled: (view) => {
        const { state } = view;
        return !liftListItem(state.schema.nodes.list_item)(state);
      },
    },
    {
      type: "button",
      icon: "sinkList",
      key: SinkListItem,
      disabled: (view) => {
        const { state } = view;
        return !sinkListItem(state.schema.nodes.list_item)(state);
      },
    },
  ],
  [
    {
      type: "button",
      icon: "link",
      key: ToggleLink,
      active: (view) => hasMark(view.state, view.state.schema.marks.link),
    },
    {
      type: "button",
      icon: "image",
      key: InsertImage,
    },
    {
      type: "button",
      icon: "table",
      key: InsertTable,
    },
    {
      type: "button",
      icon: "code",
      key: TurnIntoCodeFence,
    },
  ],
  [
    {
      type: "button",
      icon: "quote",
      key: WrapInBlockquote,
    },
    {
      type: "button",
      icon: "divider",
      key: InsertHr,
    },
    {
      type: "button",
      icon: "select",
      key: SelectParent,
    },
  ],
];
const button = (utils, config, ctx) => {
  const buttonStyle = utils.getStyle((themeTool, { css }) => {
    return css`
      border: 0;
      box-sizing: unset;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.25rem;
      margin: 0.5rem;
      flex-shrink: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: ${themeTool.palette("surface")};
      color: ${themeTool.palette("solid")};
      transition: all 0.4s ease-in-out;

      cursor: pointer;

      &.active,
      &:hover {
        background-color: ${themeTool.palette("secondary", 0.12)};
        color: ${themeTool.palette("primary")};
      }

      &:disabled {
        display: none;
      }
    `;
  });
  const $button = document.createElement("button");
  $button.setAttribute("type", "button");
  $button.classList.add("button");
  if (buttonStyle) {
    $button.classList.add(buttonStyle);
  }
  const $label = utils.themeTool.slots.label(config.icon);
  if ($label) {
    $button.setAttribute("aria-label", $label);
    $button.setAttribute("title", $label);
  }
  const $icon = utils.themeTool.slots.icon(config.icon);
  $button.appendChild($icon);
  $button.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    ctx.get(commandsCtx).call(config.key, config.options);
  });
  return $button;
};
const divider = (utils) => {
  const dividerStyle = utils.getStyle((themeTool, { css }) => {
    return css`
      flex-shrink: 0;
      width: ${themeTool.size.lineWidth};
      background-color: ${themeTool.palette("line")};
      margin: 0.75rem 1rem;
    `;
  });
  const $divider = document.createElement("div");
  $divider.classList.add("divider");
  if (dividerStyle) {
    $divider.classList.add(dividerStyle);
  }
  return $divider;
};
const select = (utils, config, ctx, view) => {
  const selectStyle = utils.getStyle((themeTool, { css }) => {
    return css`
      flex-shrink: 0;
      font-weight: 500;
      font-size: 0.875rem;

      ${themeTool.mixin.border("right")};
      ${themeTool.mixin.border("left")};

      .menu-selector {
        border: 0;
        box-sizing: unset;
        cursor: pointer;
        font: inherit;
        text-align: left;
        justify-content: space-between;
        align-items: center;
        color: ${themeTool.palette("neutral", 0.87)};
        display: flex;
        padding: 0.25rem 0.5rem;
        margin: 0.5rem;
        background: ${themeTool.palette("secondary", 0.12)};
        width: 10.375rem;

        &:disabled {
          display: none;
        }
      }

      .menu-selector-value {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .menu-selector-list {
        width: calc(12.375rem);
        position: absolute;
        top: 3rem;
        background: ${themeTool.palette("surface")};
        ${themeTool.mixin.border()};
        ${themeTool.mixin.shadow()};
        border-bottom-left-radius: ${themeTool.size.radius};
        border-bottom-right-radius: ${themeTool.size.radius};
        z-index: 3;
      }

      .menu-selector-list-item {
        background-color: transparent;
        border: 0;
        cursor: pointer;
        display: block;
        font: inherit;
        text-align: left;
        padding: 0.75rem 1rem;
        line-height: 1.5rem;
        width: 100%;
        color: ${themeTool.palette("neutral", 0.87)};

        &:hover {
          background: ${themeTool.palette("secondary", 0.12)};
          color: ${themeTool.palette("primary")};
        }
      }

      &.fold {
        border-color: transparent;

        .menu-selector {
          background: unset;
        }

        .menu-selector-list {
          display: none;
        }
      }
    `;
  });
  const selectorWrapper = document.createElement("div");
  selectorWrapper.classList.add("menu-selector-wrapper", "fold");
  const selector = document.createElement("button");
  selector.setAttribute("type", "button");
  selector.classList.add("menu-selector", "fold");
  selector.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    selectorWrapper.classList.toggle("fold");
    selectorList.style.left = `${
      selectorWrapper.getBoundingClientRect().left -
      view.dom.getBoundingClientRect().left
    }px`;
  });
  view.dom.addEventListener("click", () => {
    selectorWrapper.classList.add("fold");
  });
  const selectorValue = document.createElement("span");
  selectorValue.classList.add("menu-selector-value");
  selectorValue.textContent = config.text;
  const selectorButton = utils.themeTool.slots.icon("downArrow");
  selectorButton.setAttribute("aria-hidden", "true");
  selectorWrapper.appendChild(selector);
  selector.appendChild(selectorValue);
  selector.appendChild(selectorButton);
  const selectorList = document.createElement("div");
  selectorList.classList.add("menu-selector-list");
  config.options.forEach((option) => {
    const selectorListItem = document.createElement("button");
    selectorListItem.setAttribute("type", "button");
    selectorListItem.dataset.id = option.id;
    selectorListItem.textContent = option.text;
    selectorListItem.classList.add("menu-selector-list-item");
    selectorList.appendChild(selectorListItem);
  });
  selectorList.addEventListener("mousedown", (e) => {
    const { target } = e;
    if (target instanceof HTMLButtonElement && target.dataset.id) {
      ctx.get(commandsCtx).call(...config.onSelect(target.dataset.id, view));
      selectorWrapper.classList.add("fold");
    }
  });
  selectorWrapper.appendChild(selectorList);
  if (selectStyle) {
    selectorWrapper.classList.add(selectStyle);
  }
  return selectorWrapper;
};
class Manager {
  constructor(originalConfig, utils, ctx, menu2, view) {
    this.utils = utils;
    this.ctx = ctx;
    this.config = originalConfig
      .map((xs) =>
        xs.map((x) =>
          __spreadProps(__spreadValues({}, x), {
            $: this.$create(x, view),
          })
        )
      )
      .map((xs, i) => {
        if (i === originalConfig.length - 1) {
          return xs;
        }
        const dividerConfig = {
          type: "divider",
          group: xs.map((x) => x.$),
        };
        return [
          ...xs,
          __spreadProps(__spreadValues({}, dividerConfig), {
            $: this.$create(dividerConfig, view),
          }),
        ];
      })
      .flat();
    this.config.forEach((x) => menu2.appendChild(x.$));
  }
  update(view) {
    this.config.forEach((config) => {
      if (config.type === "button") {
        if (config.active) {
          const active = config.active(view);
          if (active) {
            config.$.classList.add("active");
          } else {
            config.$.classList.remove("active");
          }
        }
        if (config.disabled) {
          const disabled = config.disabled(view);
          if (disabled) {
            config.$.setAttribute("disabled", "true");
          } else {
            config.$.removeAttribute("disabled");
          }
        }
        return;
      }
      if (config.type === "select") {
        if (config.disabled) {
          const disabled = config.disabled(view);
          if (disabled) {
            config.$.classList.add("disabled");
            config.$.children[0].setAttribute("disabled", "true");
          } else {
            config.$.classList.remove("disabled");
            config.$.children[0].removeAttribute("disabled");
          }
        }
      }
      if (config.type === "divider") {
        const disabled = config.group.every(
          (x) => x.getAttribute("disabled") || x.classList.contains("disabled")
        );
        if (disabled) {
          config.$.classList.add("disabled");
        } else {
          config.$.classList.remove("disabled");
        }
      }
    });
  }
  $create(item, view) {
    const { utils, ctx } = this;
    switch (item.type) {
      case "button": {
        const $ = button(utils, item, ctx);
        return $;
      }
      case "select": {
        const $ = select(utils, item, ctx, view);
        return $;
      }
      case "divider": {
        const $ = divider(utils);
        return $;
      }
      default:
        throw new Error();
    }
  }
}
const menubar = (utils, view) => {
  const editorWrapperStyle = utils.getStyle((themeTool) => {
    return themeTool.mixin.scrollbar("y");
  });
  const menuStyle = utils.getStyle((themeTool, { css }) => {
    const border = themeTool.mixin.border();
    const scrollbar = themeTool.mixin.scrollbar("x");
    const style = css`
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      ${border};
      ${scrollbar};
      background: ${themeTool.palette("surface")};

      -webkit-overflow-scrolling: auto;

      .disabled {
        display: none;
      }
    `;
    return style;
  });
  const menuWrapper = document.createElement("div");
  const menu2 = document.createElement("div");
  menu2.classList.add("milkdown-menu");
  menuWrapper.appendChild(menu2);
  menuWrapper.classList.add("milkdown-menu-wrapper");
  if (menuStyle) {
    menuStyle.split(" ").forEach((x) => menu2.classList.add(x));
  }
  const editorDom = view.dom;
  if (editorWrapperStyle) {
    editorDom.classList.add(editorWrapperStyle);
  }
  const milkdown = editorDom.parentElement;
  if (!milkdown) {
    throw new Error("No parent node found");
  }
  const root = milkdown.parentElement;
  if (!root) {
    throw new Error("No root node found");
  }
  root.replaceChild(menuWrapper, milkdown);
  menuWrapper.appendChild(milkdown);
  return menu2;
};
const menuKey = new PluginKey("milkdown-menu");
const menu = createPlugin((utils, options) => {
  var _a;
  const config =
    (_a = options == null ? void 0 : options.config) != null
      ? _a
      : defaultConfig;
  return {
    commands: () => [createCmd(SelectParent, () => selectParentNode)],
    prosePlugins: (_, ctx) => {
      const plugin = new Plugin({
        key: menuKey,
        view: (editorView) => {
          const menu2 = menubar(utils, editorView);
          const manager = new Manager(config, utils, ctx, menu2, editorView);
          return {
            update: (view) => {
              manager.update(view);
            },
          };
        },
      });
      return [plugin];
    },
  };
});
export { menu, menuKey };
//# sourceMappingURL=index.es.js.map
