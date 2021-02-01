class _Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(first = null, last = null) {
    this.first = first;
    this.last = last;
  }
  enqueue(data) {
    const node = new _Node(data);

    if (this.first === null) {
      this.first = node;
    }

    if (this.last) {
      this.last.next = node;
    }
    this.last = node;
  }
  dequeue() {
    if (this.first === null) {
      return;
    }
    const node = this.first;
    this.first = this.first.next;
    if (node === this.last) {
      this.last = null;
    }
    return node.value;
  }
  requeue() {
    if (this.first === null) {
      return;
    }
    let temp = this.dequeue();
    this.enqueue(temp);
    return temp;
  }
}
export default Queue;
