class DoubleLinkedList {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
export default class Queue {
  constructor() {
    this._head = null;
    this._tail = this._head;
  }
  push(value) {
    if (this._head == null) {
      this._head = new DoubleLinkedList(value);
      this._tail = this._head;
      return value;
    }
    this._head.prev = new DoubleLinkedList(value);
    this._head.prev.next = this._head;
    this._head = this._head.prev;
    return value;
  }
  isEmpty() {
    // console.log('isEmpty is called ')
    // this.print()
    return this._tail == null;
  }
  pop() {
    if (this._tail == null) {
      console.log("queue is Emtpy");
      // throw new Error("Queue is empty");
    }

    //I forget this side case toke me 2 hours to solve and depresstion to, So, know your side cases
    else if (this._tail == this._head) {
      this._head = null;
      let val = this._tail;
      this._tail = null;
      return val.val;
    }
    let val = this._tail;
    this._tail = this._tail.prev;
    if (this._tail != null) this._tail.next = null;
    return val.val;
  }
  print() {
    let temp = this._head;
    while (temp) {
      console.log(temp.val);
      temp = temp.next;
    }
  }
}
