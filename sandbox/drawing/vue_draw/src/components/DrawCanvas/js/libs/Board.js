class Board {
  constructor() {
    this.resolution = 1;
    this.dom = null;
    this.ctx = null;
    this.domMem = null;
    this.ctxMem = null;
    this.bgColor = "#ffffff";
    this.pos = {
      x: 0,
      y: 0,
    };
  }

  loadToMemory(event) {
    var imageObj = event.target;
    this.domMem.width = imageObj.width;
    this.domMem.height = imageObj.height;
    this.ctxMem.drawImage(imageObj, 0, 0);
    this.ctx.drawImage(imageObj, 0, 0);
  }
  init(canvasId) {
    this.dom = document.getElementById(canvasId);
    this.ctx = this.dom.getContext("2d", { desynchronized: true });

    // Additional Configuration
    this.ctx.imageSmoothingEnabled = true;

    // Create buffer
    this.domMem = document.createElement("canvas");
    this.ctxMem = this.domMem.getContext("2d");
    this.ctxMem.fillStyle = this.bgColor;
    this.ctxMem.fillRect(0, 0, this.domMem.width, this.domMem.height);

    // Set up sizing
    // window.addEventListener("resize", this.fitToWindow.bind(this));

    // Load canvas from local storage
    // if (localStorage.dataURL) {
    //   var img = new window.Image();
    //   img.addEventListener("load", this.loadToMemory.bind(this));
    //   img.setAttribute("src", localStorage.dataURL);
    // }
  }
  getPointerPos(event) {
    return {
      x: event.offsetX,
      y: event.offsetY,
    };
  }
  storeMemory() {
    this.ctxMem.drawImage(this.dom, 0, 0);
    // localStorage.setItem("dataURL", this.domMem.toDataURL());
  }
  clearMemory() {
    localStorage.clear();
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.dom.width, this.dom.height);
    this.domMem.width = this.dom.width;
    this.domMem.height = this.dom.height;
    this.ctxMem.fillStyle = this.bgColor;
    this.ctxMem.fillRect(0, 0, this.dom.width, this.dom.height);
  }
}

export { Board };
