function push(value) {
    var newTail = {value, prev: this.tail};
    if(this.any()) {
        this.tail.next = newTail;
    }
    else {
        this.head = newTail;
    }
    this.tail = newTail;
}

function shift() {
    var head = this.head;
    if(!head) {
        return undefined;
    }
    this.head = this.head.next;
    return head.value;
}

function any() {
    return !!this.head;
}

function iterate() {
    let pointer = this.head;

    return {
        next: () => {
            if(pointer) {
                let ret = {
                    value: pointer.value,
                    done: false,
                }
                pointer = pointer.next;
                return ret;
            }
            else {
                return { done: true };
            }
        }
    }
}

module.exports = class LinkedList {
    constructor() {
        this.head = {};
        this.tail = {prev: this.head};
        this.head.next = this.tail;
        this.head.prev = this.head;
        this.tail.next = this.tail;
        this.length = 0;
    }

    push(value) {
        let newNode = {value, next: this.tail, prev: this.tail.prev};
        this.tail.prev.next = newNode;
        this.tail.prev = newNode;
        this.length++;
        return newNode;
    }

    unshift(value) {
        let newNode = {value, prev: this.head, next: this.head.next};
        this.head.next.prev = newNode;
        this.head.next = newNode;
        this.length++;
        return newNode;
    }

    shift() {
        let headNode = this.head.next;
        let value = headNode.value;
        this.head.next = headNode.next;
        headNode.next.prev = this.head;
        this.length--;
        return value;
    }

    pop() {
        let tailNode = this.tail.prev;
        let value = tailNode.value;
        this.tail.prev = tailNode.prev;
        tailNode.prev.next = this.tail;
        this.length--;
        return value;
    }

    any() {
        return this.head.next !== this.tail;
    }

    nextNode(node, wrap) {
        let next = node.next;
        if(next === this.tail) {
            return wrap ? this.head.next : null;
        }
        return next;
    }

    prevNode(node, wrap) {
        let prev = node.prev;
        if(prev === this.head) {
            return wrap ? this.tail.prev : null;
        }
        return prev;
    }

    removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.length--;
    }

    insertAfter(node, value) {
        let newNode = {value};
        this.insertNodeAfter(node, newNode);
        return newNode;
    }

    insertNodeAfter(node, newNode) {
        newNode.prev = node;
        newNode.next = node.next;
        node.next.prev = newNode;
        node.next = newNode;
        this.length++;
    }

    [Symbol.iterator]() {
        let pointer = this.head.next;

        return {
            next: () => {
                if(pointer.value !== undefined) {
                    let ret = {
                        value: pointer.value,
                        done: false,
                    }
                    pointer = pointer.next;
                    return ret;
                }
                else {
                    return { done: true };
                }
            }
        }
    }

    getNodes() {
        let list = this;
        return {
            [Symbol.iterator]() {
                let pointer = list.head.next;

                return {
                    next: () => {
                        if(pointer.value) {
                            let ret = {
                                value: pointer,
                                done: false,
                            }
                            pointer = pointer.next;
                            return ret;
                        }
                        else {
                            return { done: true };
                        }
                    }
                }
            }
        }
    }
}