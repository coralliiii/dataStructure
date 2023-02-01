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

function reConstructBinaryTree(pre,vin){
    if(pre.length == 0){
        return null
    }
    if(pre.length == 1){
        return new Node(pre[0])
    }
    const value = pre[0]
    console.log(value)
    const index = vin.indexOf(value)
    console.log('index',index)
    const preLeft = pre.slice(1,index+1)
    console.log('preLeft',preLeft)
    const preRight = pre.slice(index+1)
    const vinLeft = vin.slice(0,index)
    const vinRight = vin.slice(index+1)
    const node = new Node(value)
    console.log('node',node)
    node.left = reConstructBinaryTree(preLeft,vinLeft)
    node.right = reConstructBinaryTree(preRight,vinRight)
    return node
}

// 给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
function figurePost(...readline){
    let pre
    let vin 
    let i = 0
    while((pre = readline[i])!= null){
        vin = readline[++i]
        console.log('pre,vin:',pre,vin)
        console.log(getPostOrder(pre,vin))
        i++;
    }
    function getPostOrder(pre,vin){
        if(pre.length == 0){
            return ''
        }
        if(pre.length == 1){
            return pre
        }
        let value = pre[0]
        let index = vin.indexOf(value)
        let preLeft = pre.slice(1,index+1)
        let preRight = pre.slice(index+1)
        let vinLeft = vin.slice(0,index)
        let vinRight = vin.slice(index+1)
        return getPostOrder(preLeft,vinLeft) + getPostOrder(preRight,vinRight) + value
    }
}

var t = new Tree()
// t.insert(2)
// t.insert(4)
// t.insert(3)
// t.insert(8)
// t.insert(0)
// console.log(JSON.stringify(t,null,2))
// console.log(inorderTraversal(t.root))
// console.log(preorderTraversal(t.root))
// console.log(postorderTraversal(t.root))
// console.log(JSON.stringify(reConstructBinaryTree([1,2,4,7,3,5,6,8],[4,7,2,1,5,3,8,6]),null,2))
figurePost('ABC','BAC','FDXEAG','XDEFAG')