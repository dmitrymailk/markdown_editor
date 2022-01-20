import { Board } from "./libs/Board";
import { Pen } from "./libs/Pen";
import { Pointer, PointerStore } from "./libs/Pointer";

class DrawApp {
  constructor() {}
  // Attach event listener
  pointerDown(e) {
    // Initialise pointer
    var pointer = new Pointer(e.pointerId);
    pointer.set(Board.getPointerPos(e));

    // Get function type
    Pen.setFuncType(e);
    if (Pen.funcType === Pen.funcTypes.menu) Board.clearMemory();
    else drawOnCanvas(e, pointer, Pen);
  }

  pointerMove(e) {
    if (Pen.funcType && Pen.funcType.indexOf(Pen.funcTypes.draw) !== -1) {
      var pointer = Pointer.get(e.pointerId);
      drawOnCanvas(e, pointer, Pen);
    }
  }

  pointerLeave(e) {
    Pointer.destruct(e.pointerId);
  }

  // Draw method
  drawOnCanvas(e, pointerObj, Pen) {
    if (pointerObj) {
      pointerObj.set(Board.getPointerPos(e));
      Pen.setPen(Board.ctx, e);

      if (pointerObj.pos0.x < 0) {
        pointerObj.pos0.x = pointerObj.pos1.x - 1;
        pointerObj.pos0.y = pointerObj.pos1.y - 1;
      }
      Board.ctx.beginPath();
      Board.ctx.moveTo(pointerObj.pos0.x, pointerObj.pos0.y);
      Board.ctx.lineTo(pointerObj.pos1.x, pointerObj.pos1.y);
      Board.ctx.closePath();
      Board.ctx.stroke();

      pointerObj.pos0.x = pointerObj.pos1.x;
      pointerObj.pos0.y = pointerObj.pos1.y;
    }
  }

  initDrawingApp(canvasId = "board") {
    // Initialise application
    Board.init(canvasId);
    Pen.init(Board.ctx);
    FloatingButton.init();
    FloatingButton.onClick = Board.clearMemory.bind(Board);
    Pointer.onEmpty = _.debounce(Board.storeMemory.bind(Board), 1500);

    Board.dom.addEventListener("pointerdown", pointerDown);
    Board.dom.addEventListener("pointermove", pointerMove);
    Board.dom.addEventListener("pointerup", pointerCancel);
    Board.dom.addEventListener("pointerleave", pointerCancel);
  }
}

export { DrawApp };
