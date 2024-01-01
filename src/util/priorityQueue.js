const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;
class LinkedList {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
export default class PriorityQueueLinear {
  constructor(getValue = (a) => a) {
    this._head = null;
    this.size = 0;
    // this._curr = this._head;
    this._getValue = getValue;
  }
  push(value) {
    this.size += 1;
    if (this._head == null) {
      this._head = new LinkedList(value);
    } else {
      let v = this._getValue(value);
      let temp = this._head;
      let prev = null;
      while (temp != null && this._getValue(temp.val) < v) {
        prev = temp;
        temp = temp.next;
      }
      if (prev == null) {
        this._head = new LinkedList(value);
        this._head.next = temp;
        return;
      }
      prev.next = new LinkedList(value);
      prev.next.next = temp;
    }
  }
  isEmpty() {
    return this.size == 0;
  }
  print() {
    let temp = this._head;
    while (temp) {
      console.log(temp.val);
      temp = temp.next;
    }
  }
  pop() {
    this.size -= 1;
    let tem = this._head;
    this._head = this._head.next;
    return tem.val;
  }
}

export class PriorityQueueHeap {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);

      this._siftUp();
    });
    console.log([...this._heap]);
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
    }
  }
}
