import { Board } from "./components/Board";
import { Pen } from "./components/Pen";
import { Pointer, PointerStore } from "./components/Pointer";

class DrawApp {
  constructor(canvasElem, setValueImage) {
    this.board = new Board();
    this.pen = new Pen();
    this.pointerStore = new PointerStore();
    this.appDiv = window.document.querySelector(".milkdown");
    console.log(window);
    this.setValueImage = setValueImage;
    this.initDrawingApp(canvasElem);
  }
  get base64() {
    return this.board.dom.toDataURL();
  }
  // Attach event listener
  pointerDown(e) {
    this.appDiv.style.touchAction = "none";

    // Initialise pointer
    var pointer = new Pointer(e.pointerId, this.pointerStore);
    pointer.set(this.board.getPointerPos(e));

    // Get function type
    this.pen.setFuncType(e);
    if (this.pen.funcType === this.pen.funcTypes.menu) this.board.clearMemory();
    else this.drawOnCanvas(e, pointer, this.pen);
  }

  pointerMove(e) {
    // console.log("pointerMove", e);
    this.appDiv.style.touchAction = "none";
    if (
      this.pen.funcType &&
      this.pen.funcType.indexOf(this.pen.funcTypes.draw) !== -1
    ) {
      var pointer = this.pointerStore.get(e.pointerId);
      this.drawOnCanvas(e, pointer, this.pen);
    }
  }

  pointerLeave(e) {
    // this.appDiv.touchAction = "";
    this.appDiv.style.touchAction = "none";
    this.setValueImage(this.base64);
    this.pointerStore.destruct(e.pointerId);
  }

  // Draw method
  drawOnCanvas(e, pointerObj, Pen) {
    if (pointerObj) {
      pointerObj.set(this.board.getPointerPos(e));
      Pen.setPen(this.board.ctx, e);

      if (pointerObj.pos0.x < 0) {
        pointerObj.pos0.x = pointerObj.pos1.x - 1;
        pointerObj.pos0.y = pointerObj.pos1.y - 1;
      }
      this.board.ctx.beginPath();
      this.board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y);
      this.board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
      this.board.ctx.closePath();
      this.board.ctx.stroke();

      pointerObj.pos0.x = pointerObj.pos1.x;
      pointerObj.pos0.y = pointerObj.pos1.y;
    }
  }

  initDrawingApp(canvasElem) {
    // Initialise application
    this.board.init(canvasElem);
    this.pen.init(this.board.ctx);

    this.board.dom.addEventListener("pointerdown", this.pointerDown.bind(this));
    this.board.dom.addEventListener("pointermove", this.pointerMove.bind(this));
    this.board.dom.addEventListener("pointerup", this.pointerLeave.bind(this));
    this.board.dom.addEventListener(
      "pointerleave",
      this.pointerLeave.bind(this)
    );
  }
}

export { DrawApp };
