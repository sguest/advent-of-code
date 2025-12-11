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

interface LinkedListNode<T> {
    next: LinkedListNode<T>;
    prev: LinkedListNode<T>;
    value: T;
}

export class LinkedList<T> {
    private head: LinkedListNode<T>;
    private tail: LinkedListNode<T>;
    private length: number;

    constructor() {
        this.head = {} as LinkedListNode<T>;
        this.tail = {prev: this.head} as LinkedListNode<T>;
        this.head.next = this.tail;
        this.head.prev = this.head;
        this.tail.next = this.tail;
        this.length = 0;
    }

    push(value: T) {
        let newNode = {value, next: this.tail, prev: this.tail.prev};
        this.tail.prev.next = newNode;
        this.tail.prev = newNode;
        this.length++;
        return newNode;
    }

    unshift(value: T) {
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

    nextNode(node: LinkedListNode<T>, wrap: boolean) {
        let next = node.next;
        if(next === this.tail) {
            return wrap ? this.head.next : null;
        }
        return next;
    }

    prevNode(node: LinkedListNode<T>, wrap: boolean) {
        let prev = node.prev;
        if(prev === this.head) {
            return wrap ? this.tail.prev : null;
        }
        return prev;
    }

    removeNode(node: LinkedListNode<T>) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        this.length--;
    }

    insertAfter(node: LinkedListNode<T>, value: T) {
        let newNode = {value};
        this.insertNodeAfter(node, newNode as LinkedListNode<T>);
        return newNode;
    }

    insertNodeAfter(node: LinkedListNode<T>, newNode: LinkedListNode<T>) {
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