class PointerStore {
  constructor() {
    this.size = 0;
    this.hashMap = {};
    this.onEmpty = null;
  }

  get(pointerId) {
    return this.hashMap[pointerId];
  }
  destruct(pointerId) {
    this.removePointer(pointerId);
  }
  addPointer(pointer) {
    hashMap[pointer.pointerId] = pointer;
    size += 1;
  }
  removePointer(pointerId) {
    if (this.hashMap[pointerId]) {
      delete hashMap[pointerId];
      this.size -= 1;
      //   if (size == 0 && Pointer.onEmpty) {
      //     Pointer.onEmpty();
      //   }
    }
  }
}

class Pointer {
  constructor(pointerId, pointerStore) {
    this.pointerId = pointerId;
    this.pos1 = {
      x: -1,
      y: -1,
    };
    this.pos0 = {
      x: -1,
      y: -1,
    };
    this.isClicked = false;
    this.pointerStore = pointerStore;
    this.pointerStore.addPointer(this);
  }

  release() {
    this.isClicked = false;
    this.pos0.y = -1;
    this.pos0.x = -1;
  }
  set(pos) {
    this.pos1.x = pos.x;
    this.pos1.y = pos.y;
  }
}

export { Pointer, PointerStore };
