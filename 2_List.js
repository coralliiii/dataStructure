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

// 复制一个普通链表
function CopyList(List) {
    let newList = new LinkList()
    let currentNode = List.head
    while (currentNode) {
        newList.append(currentNode.data)
        currentNode = currentNode.next
    }
    return newList
}

let list1 = new LinkList()
list1.append('A')
list1.append('B')
list1.append('C')
list1.append('D')
list1.append('E')
list1.append('F')
// console.log(list1)
// console.log(list1.indexOf('C'))
// console.log(list1.toString())
// console.log(printListFromTailToHead(list1.head))
// console.log(reverseList(list1.head))
// console.log('CopyList', CopyList(list1).toString())

// 3. 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，
// 另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。
// 思路
// 拆分成三步
// 1.复制一份链表放在前一个节点后面，即根据原始链表的每个节点N创建N,把N直接放在N的next位置，让复制后的链表和原始链表组成新的链表。
// 2.给复制的链表random赋值，即N.random=N.random.next。
// 3.拆分链表，将N`和N进行拆分，保证原始链表不受影响。
function Clone(pHead) {
    if (pHead === null) {
        return null;
    }
    cloneNodes(pHead);
    cloneRandom(pHead);
    return reconnetNodes(pHead);
}

function cloneNodes(pHead) {
    var current = pHead;
    while (current) {
        var cloneNode = {
            label: current.label,
            next: current.next
        };
        current.next = cloneNode;
        current = cloneNode.next;
    }
}

function cloneRandom(pHead) {
    var current = pHead;
    while (current) {
        var cloneNode = current.next;
        if (current.random) {
            cloneNode.random = current.random.next;
        } else {
            cloneNode.random = null;
        }
        current = cloneNode.next;
    }
}

function reconnetNodes(pHead) {
    var cloneHead = pHead.next;
    var cloneNode = pHead.next;
    var current = pHead;
    while (current) {
        current.next = cloneNode.next;
        current = cloneNode.next;
        if (current) {
            cloneNode.next = current.next;
            cloneNode = current.next;
        } else {
            cloneNode.next = null;
        }
    }
    return cloneHead;
}

// 4. 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。
// 链表头部节点比较，取较小节点。
// 小节点的next等于小节点的next和大节点的较小值。
// 如此递归。
// 返回小节点。
// 考虑代码的鲁棒性，也是递归的终止条件，两个head为null的情况，取对方节点返回。
function Merge(pHead1, pHead2) {
    if (!pHead1) {
        return pHead2
    }
    if (!pHead2) {
        return pHead1
    }
    let head
    if (pHead1.data < pHead2.data) {
        head = pHead1
        head.next = Merge(pHead1.next, pHead2)
    } else {
        head = pHead2
        head.next = Merge(pHead1, pHead2.next)
    }
    return head
}
let listA = new LinkList()
listA.append('1')
listA.append('3')
listA.append('6')
listA.append('9')
listA.append('10')
let listB = new LinkList()
listB.append('2')
listB.append('4')
listB.append('5')
listB.append('7')
listB.append('8')
// console.log('listA',listA,'listB',listB)
// console.log((Merge(listA.head,listB.head)))
console.log(JSON.stringify(Merge(listA.head,listB.head), null, 4));