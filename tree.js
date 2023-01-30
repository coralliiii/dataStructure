function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

Node.prototype = {
    show: function () {
        console.log(this.data);
    }
}

function Tree() {
    this.root = null;
}

Tree.prototype = {
    insert: function (data) {
        var node = new Node(data, null, null);
        if (!this.root) {
            this.root = node;
            return;
        }
        var current = this.root;
        var parent = null;
        while (current) {
            parent = current;
            if (data < parent.data) {
                current = current.left;
                if (!current) {
                    parent.left = node;
                    return;
                }
            } else {
                current = current.right;
                if (!current) {
                    parent.right = node;
                    return;
                }
            }

        }
    },
}



//迭代中序遍历
var inorderTraversal = function (root) {
    const result = [];
    const stack = [];
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop()
        result.push(current.data);
        current = current.right;
    }
    return result
}

// 迭代前序遍历
var preorderTraversal = function (root) {
    const result = []
    const stack = []
    let current = root
    while (current || stack.length > 0) {
        while (current) {
            result.push(current.data)
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        current = current.right
    }
    return result
}

// 迭代后序遍历 最复杂的一个
// 取根节点为目标节点，开始遍历
// 1.左孩子入栈 -> 直至左孩子为空的节点
// 2.栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问
// 3.栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3
var postorderTraversal = function (root) {
    const result = []
    const stack = []
    let last = null
    let current = root
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }
        current = stack[stack.length - 1]
        if (!current.right || last == current.right) {
            current = stack.pop()
            result.push(current.data)
            last = current
            current = null // 继续弹栈
        } else {
            current = current.right
        }
    }
    return result
}

var t = new Tree()
t.insert(2)
t.insert(4)
t.insert(3)
t.insert(8)
t.insert(0)
// console.log(JSON.stringify(t,null,2))
// console.log(inorderTraversal(t.root))
// console.log(preorderTraversal(t.root))
console.log(postorderTraversal(t.root))