const top = 0;
const parent = i =>((i+1)>>> 1)-1;
const left = i => (i<<1)+1;
const right = i => (i+1)<<1;
class LinkedList{
    constructor(val){
        this.val = val;
        this.next = null;
    }
}
class PriorityQueueLinear{
    constructor(getValue = a => a){
        this._head = null;
        this.size = 0;
        // this._curr = this._head;
        this._getValue = getValue;
    }
    push(value){
        this.size +=1;
        if(this._head==null){
            this._head = new LinkedList(value);
        }
        else{
            let v = this._getValue(value);
            let temp = this._head;
            let prev = null;
            while(temp!=null && this._getValue(temp.val)<v){
                prev = temp;
                temp = temp.next;
            }
            if(prev==null){
                this._head = new LinkedList(value);;
                this._head.next = temp;
                return 
            }
            prev.next = new LinkedList(value);
            prev.next.next = temp;
         
        }
    }
    isEmpty(){
        return this.size == 0;
    }
    print(){
        let temp = this._head;
        while(temp){
            console.log(temp.val)
            temp = temp.next;
        }
    }
    pop(){
        this.size -=1;
        let tem = this._head
        this._head = this._head.next;
       return tem.val
    }

}


class DoubleLinkedList{
    constructor(val){
        this.val = val;
        this.next = null;
        this.prev = null;
    }

}

class Queue{
    constructor(){
        this._head = null;
        this._tail = this._head;
    }
    push(value){
        if(this._head==null){
            this._head = new DoubleLinkedList(value);
            this._tail = this._head;
            return value;
        }
        this._head.prev = new DoubleLinkedList(value);
        this._head.prev.next = this._head;
        this._head = this._head.prev;
        return value;
    }
    isEmpty(){
        return this._tail==null;
    }
    pop(){
        if(this._tail==null){
            console.log("queue is Emtpy")
            return;
            // throw new Error("Queue is empty");
        }
        else if(this._tail==this._head){
            this._head = null;
            let val = this._tail;
            this._tail = null;
            return val.val
        }
            let val = this._tail;
            this._tail = val.prev;
            if(this._tail!=null)this._tail.next = null;

            return val.val;
    }
    print(){
        console.log('queue print ins called ')
        let temp = this._head;
        while(temp){
            console.log(temp.val)
            temp = temp.next;
        }
    }
}






































const qu = new Queue();
qu.push(1);
console.log('the poped value is',qu.pop())
qu.push(-1);
qu.push(1);
qu.print()
console.log('the poped value is',qu.pop())
qu.push(2);
// console.log('the poped value is',qu.pop())
qu.push(4);
console.log('the poped value is',qu.pop())
qu.push(5);
qu.push(1);
qu.push(-1);
console.log(qu.isEmpty())

console.log('the poped value is',qu.pop())
qu.push(1);
qu.push(2);
console.log('the poped value is',qu.pop())
qu.push(4);
console.log('the poped value is',qu.pop())
qu.push(5);
qu.print()
console.log(qu.isEmpty())
console.log('the poped value is',qu.pop())
console.log('the poped value is',qu.pop())
console.log('the poped value is',qu.pop())
console.log(qu.isEmpty())

console.log('the poped value is',qu.pop())
console.log('the poped value is',qu.pop())
console.log('the poped value is',qu.pop())

// console.log('the poped value is',qu.pop())






