class Pen {
  constructor() {
    this.colors = {
      fg: "#555",
      bg: "#FFF",
    };
    this.lineWidth = 4;
    this.type = "mouse";
    this.lineJoin = "round";
    this.funcType = null;
    this.funcTypes = {
      draw: "draw",
      erase: "draw erase",
      menu: "menu",
    };
  }
  init(context) {
    context.lineJoin = this.lineJoin;
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
  }
  set(context, config) {
    context.lineWidth = config.lineWidth;
    context.strokeStyle = config.color;
    context.lineJoin = this.lineJoin;
  }
  setFuncType(pointerEvent) {
    if (this.checkMenuKey(pointerEvent)) this.funcType = this.funcTypes.menu;
    else if (this.checkEraseKeys(pointerEvent))
      this.funcType = this.funcTypes.erase;
    else this.funcType = this.funcTypes.draw;
    return this.funcType;
  }
  setPen(context, pointerEvent) {
    switch (this.funcType) {
      case this.funcTypes.erase: {
        this.set(context, {
          color: this.colors.bg,
          lineWidth: 25,
        });
        break;
      }
      case this.funcTypes.draw: {
        this.set(context, {
          color: this.colors.fg,
          lineWidth: this.getLineWidth(pointerEvent),
        });
        break;
      }
    }
  }
  release() {
    this.funcType = null;
  }

  getLineWidth(e) {
    switch (e.pointerType) {
      case "touch": {
        if (e.width < 10 && e.height < 10) {
          return (e.width + e.height) * 2 + 10;
        } else {
          return (e.width + e.height - 40) / 2;
        }
      }
      case "pen":
        return e.pressure * 8;
      default:
        return e.pressure ? e.pressure * 8 : 4;
    }
  }

  checkEraseKeys(e) {
    if (e.buttons === 32) return true;
    else if (e.buttons === 1 && e.shiftKey) return true;
    return false;
  }
  checkMenuKey(e) {
    return e.buttons === 1 && e.ctrlKey;
  }

  openMenu(e) {
    console.log("Menu", e.pageX, e.pageY);
  }
}

export { Pen };
