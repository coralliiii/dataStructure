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

function reConstructBinaryTree(pre, vin) {
    if (pre.length == 0) {
        return null
    }
    if (pre.length == 1) {
        return new Node(pre[0])
    }
    const value = pre[0]
    console.log(value)
    const index = vin.indexOf(value)
    console.log('index', index)
    const preLeft = pre.slice(1, index + 1)
    console.log('preLeft', preLeft)
    const preRight = pre.slice(index + 1)
    const vinLeft = vin.slice(0, index)
    const vinRight = vin.slice(index + 1)
    const node = new Node(value)
    console.log('node', node)
    node.left = reConstructBinaryTree(preLeft, vinLeft)
    node.right = reConstructBinaryTree(preRight, vinRight)
    return node
}

// 1.给定一棵二叉树的前序遍历和中序遍历，求其后序遍历
function figurePost(...readline) {
    let pre
    let vin
    let i = 0
    while ((pre = readline[i]) != null) {
        vin = readline[++i]
        console.log('pre,vin:', pre, vin)
        console.log(getPostOrder(pre, vin))
        i++;
    }
    function getPostOrder(pre, vin) {
        if (pre.length == 0) {
            return ''
        }
        if (pre.length == 1) {
            return pre
        }
        let value = pre[0]
        let index = vin.indexOf(value)
        let preLeft = pre.slice(1, index + 1)
        let preRight = pre.slice(index + 1)
        let vinLeft = vin.slice(0, index)
        let vinRight = vin.slice(index + 1)
        return getPostOrder(preLeft, vinLeft) + getPostOrder(preRight, vinRight) + value
    }
}

// 2.请实现一个函数，用来判断一颗二叉树是不是对称的。注意，如果一个二叉树同此二叉树的镜像是同样的，定义其为对称的。
// 两个根结点相等
// 左子树的右节点和右子树的左节点相同。
// 右子树的左节点和左子树的右节点相同。
// 递归所有节点满足以上条件即二叉树对称。
function isSymmetrical(pRoot) {
    return isSymmetricalTree(pRoot, pRoot)
}

function isSymmetricalTree(node1, node2) {
    console.log(0)
    if (!node1 && !node2) {
        console.log(1)
        return true
    }

    if (!node1 || !node2) {
        console.log('node1, node2', node1, node2)
        console.log(2)
        return false
    }

    if (node1.data != node2.data) {
        console.log(3)
        return false
    }

    return isSymmetricalTree(node1.left, node2.right) && isSymmetricalTree(node1.right, node2.left)
}

// 3.操作给定的二叉树，将其变换为源二叉树的镜像。
function mirror(root) {
    if (root) {
        const temp = root.left;
        root.left = root.right;
        root.right = temp;
        mirror(root.left)
        mirror(root.right)
    }
}

// 4.给定一棵二叉搜索树，请找出其中的第k小的结点
// 二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。
// 递归实现
function ktnNode(pRoot, k) {
    const arr = []
    loopThrough(pRoot, arr)
    if (k > 0 && k < arr.length) {
        return arr[k - 1]
    }
    return null
}
function loopThrough(node, arr) {
    if (node) {
        loopThrough(node.left, arr)
        arr.push(node)
        loopThrough(node.right, arr)
    }
}
// 非递归实现
function KthNode(pRoot, k) {
    const arr = []
    const stack = []
    let current = pRoot
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current)
            current = current.left
        }
        current = stack.pop()
        arr.push(current)
        current = current.right
    }
    if (k > 0 && k < arr.length) {
        return arr[k - 1]
    }
    return null
}

// 5.输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
// 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。
function VerifySequenceOfBst(sequence) {
    if (sequence && sequence.length > 0) {
        var root = sequence[sequence.length - 1]
        for (var i = 0; i < sequence.length - 1; i++) {
            if (sequence[i] > root) {
                break
            }
        }
        for (let j = i; j < sequence.length - 1; j++) {
            if (sequence[j] < root) {
                return false
            }
        }
        var left = true
        if (i > 0) {
            left = VerifySequenceOfBst(sequence.slice(0, i))
        }
        var right = true
        if (i < sequence.length - 1) {
            right = VerifySequenceOfBst(sequence.slice(i, sequence.length - 1))
        }
        return left && right
    }
    // else{
    //     return false
    // }
}

// var t = new Tree()
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
// figurePost('ABC','BAC','FDXEAG','XDEFAG')

// var tNode = {
//     data: 8,
//     left: {
//         data: 6,
//         left: {
//             data: 5,
//             left: null,
//             right: null
//         },
//         right: {
//             data: 7,
//             left: null,
//             right: null
//         }
//     },
//     right: {
//         data: 6,
//         left: {
//             data: 7,
//             left: null,
//             right: null
//         },
//         right: {
//             data: 5,
//             left: null,
//             right: null
//         }
//     }
// }
// console.log(isSymmetrical(tNode))

// var sNode = {
//     data: 4,
//     left: {
//         data: 2,
//         left: {
//             data: 1,
//             left: null,
//             right: null
//         },
//         right: {
//             data: 3,
//             left: null,
//             right: null
//         }
//     },
//     right: {
//         data: 6,
//         left: {
//             data: 5,
//             left: null,
//             right: null
//         },
//         right: {
//             data: 7,
//             left: null,
//             right: null
//         }
//     }
// }
// console.log(ktnNode(sNode, 3))
// console.log(KthNode(sNode, 3))

var data1 = [4, 8, 6, 12, 16, 14, 10]
var data2 = []
var data3 = [7, 6, 4, 5]
console.log(VerifySequenceOfBst(data1))
console.log(VerifySequenceOfBst(data2))
console.log(VerifySequenceOfBst(data3))