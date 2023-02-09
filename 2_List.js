// 封装一个LNode类, 用于保存每个节点信息
class LNode {
    constructor(data) {
        this.data = data
        this.next = null
    }
}

// 封装链表类
class LinkList {
    constructor() {
        this.head = null;
        this.len = 0
    }
    //1.向列表尾部添加一个新的项
    append(ele) {
        // 创建新节点
        let newnode = new LNode(ele)
        if (this.head == null) {
            this.head = newnode
        } else {
            let current = this.head
            while (current.next) {
                current = current.next
            }
            current.next = newnode
        }
        this.len++
    }
    //2.向列表的特定位置插入一个新的项
    insert(position, ele) {
        if (position < 0 || position > this.len || !Number.isInteger(position)) return false
        // 创建新节点
        let newnode = new LNode(ele)
        let index = 0
        let current = this.head

        if (position == 0) {
            if (this.head == null) {
                this.head = newnode
            } else {
                newnode.next = this.head
                this.head = newnode
            }
            this.len++
        } else if (position == this.len) {
            this.append(ele)
        } else {
            while (index < position - 1) {
                current = current.next
                index++
            }
            newnode.next = current.next
            current.next = newnode
            this.len++
        }
        return true
    }

    // 3.移除指定位置的元素
    removeAt(position) {
        if (position < 0 || position > this.len || !Number.isInteger(position)) return false
        let index = 0
        let current = this.head
        if (position == 0) {
            this.head = this.head.next
        } else {
            while (index < position - 1) {
                current = current.next
                index++
            }
            current.next = current.next.next
        }
        this.len--
        return current.data
    }

    //4.查找元素的位置
    indexOf(ele) {
        let index = 0
        let current = this.head
        while (current) {
            if (current.data == ele) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }

    //5.remove(ele) 移除指定的元素
    remove(ele) {
        let index = this.indexOf(ele)
        this.removeAt(index)
    }

    // 6.toString()
    toString() {
        let current = this.head
        let res = '';
        while (current) {
            res += ',' + current.data
            current = current.next
        }
        return this.head ? res.slice(1) : ''
    }

    // 7.判断栈中的元素是否为空
    isEmpty() {
        return this.len == 0
    }

    // 8.获取栈中元素的个数
    size() {
        return this.len
    }

    // 9.获取第一个节点
    getFirst() {
        return this.head.data
    }
}

// 1.输入一个链表，按链表值从尾到头的顺序返回一个ArrayList
function printListFromTailToHead(head) {
    const array = [];
    while (head) {
        array.unshift(head.data)
        head = head.next
    }
    return array
}

// 2.输入一个链表，反转链表后，输出新链表的表头
function reverseList(head) {
    let currentNode = null
    var headNode = head
    while (head && head.next) {
        currentNode = head.next
        head.next = currentNode.next
        currentNode.next = headNode
        headNode = currentNode
    }
    return headNode
}


let list1 = new LinkList()
list1.append('A')
list1.append('B')
list1.append('C')
list1.append('D')
list1.append('E')
list1.append('F')
console.log(list1)
// console.log(list1.indexOf('C'))
// console.log(list1.toString())
// console.log(printListFromTailToHead(list1.head))
console.log(reverseList(list1.head))