// 交换两个节点
function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

// 1. 大顶堆的构建
// arr 待构建数组
// index 检查的起始下标
// size 堆大小
function maxHeapify(arr, index, size) {
    for (let i = index * 2 + 1; i < size; i = i * 2 + 1) {
        if (i + 1 < size && arr[i] < arr[i + 1]) {
            i++
        }
        if (arr[index] > arr[i]) {
            break;
        } else {
            swap(arr, index, i)
            index = i
        }
    }
}

function buildMaxHeap(arr) {
    let len = arr.length
    // 从第一个非叶子节点开始自下而上构建大顶堆
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        maxHeapify(arr, i, len)
    }
    return arr
}
console.log(buildMaxHeap([1, 2, 0, 9, 8, 3, 4, 5, 6, 7]))

// 题目1：
// 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
// 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。
// 我们使用Insert()方法读取数据流，使用GetMedian()方法获取当前读取数据的中位数。
// 思路
// 1.维护一个大顶堆，一个小顶堆，数据总数：
//      小顶堆里的值全大于大顶堆里的；
//      2个堆个数的差值小于等于1
// 2.当插入数字后数据总数为奇数时：使小顶堆个数比大顶堆多1；当插入数字后数据总数为偶数时，使大顶堆个数跟小顶堆个数一样。
// 3.当总数字个数为奇数时，中位数就是小顶堆堆头；当总数字个数为偶数时，中位数数就是2个堆堆顶平均数。
function Heap(type = 'min') {
    this.type = type
    this.value = []
}
Heap.prototype.create = function () {
    const arr = this.value
    const length = this.value.length
    for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
        this.heapify(arr, i, length)
    }
}
Heap.prototype.heapify = function (arr, index, length) {
    for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
        if (i + 1 < length) {
            if ((this.type == 'min' && arr[i] > arr[i + 1]) || (this.type == 'max' && arr[i] < arr[i + 1])) {
                i++
            }
            if ((this.type == 'min' && arr[index] > arr[i]) || (this.type == 'max' && arr[index] < arr[i])) {
                swap(arr, index, i)
                index = i
            } else {
                break
            }
        }
    }
}
Heap.prototype.add = function (element) {
    const arr = this.value
    arr.push(element)
    if (arr.length > 1) {
        let index = arr.length - 1
        let target = Math.floor((index - 1) / 2)
        while (target >= 0) {
            if ((this.type == 'min' && arr[index] < arr[target] ||
                (this.type == 'max' && arr[index] > arr[target]))) {
                swap(arr, index, target)
                index = target
                target = Math.floor((index - 1) / 2)
            } else {
                break
            }
        }
    }
}
Heap.prototype.pop = function () {
    const arr = this.value
    let result = null
    if (arr.length > 1) {
        result = arr[0]
        arr[0] = arr.pop()
        this.heapify(arr, 0, arr.length)
    } else if (arr.length == 1) {
        return result = arr.pop()
    }
    return result
}

const minHeap = new Heap('min')
const maxHeap = new Heap('max')
let count = 0
function Insert(num) {
    count++
    if (count % 2 == 1) {
        maxHeap.add(num)
        minHeap.add(maxHeap.pop())
    } else {
        minHeap.add(num)
        maxHeap.add(minHeap.pop())
    }
}
function GetMedian() {
    if (count % 2 == 1) {
        return minHeap.value[0]
    } else {
        return (minHeap.value[0] + maxHeap.value[0]) / 2
    }
}
let arr = [2, 3, 4, 1, 5, 6, 7, 10]
for (let i in arr) {
    Insert(arr[i])
}
console.log(minHeap)
console.log(maxHeap)
console.log(GetMedian())

// 题目
// 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。
// 思路
// 思路1:
// 先排序，再取前k个数，最小时间复杂度nlogn。
// 思路2:
// 1.把前k个数构建一个大顶堆
// 2.从第k个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建大顶堆
// 3.一次遍历之后大顶堆里的数就是整个数据里最小的k个数。
// 时间复杂度nlogk，优于思路1。
function GetLeastNumbers(arr, k) {
    if (arr.length < k) {
        return []
    }
    createMaxHeap(arr, k)
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < arr[0]) {
            swap(arr, i, 0)
            maxHeapify(arr, 0, k)
        }
    }
    return arr.slice(0, k)

}
function createMaxHeap(arr, k) {
    for (let i = Math.floor(k / 2 - 1); i >= 0; i--) {
        MaxHeapify(arr, i, k)
    }
}
function MaxHeapify(arr, index, length) {
    for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
        if (i + 1 < length && arr[i] < arr[i + 1]) {
            i++
        }
        if (arr[index] < arr[i]) {
            swap(arr, index, i)
            index = i
        } else {
            break
        }
    }
}
console.log(GetLeastNumbers(arr, 4))

/**
 * 
 堆排序
  堆排序基本介绍
1.堆排序是利用堆这种数据结构而设计的一种排序算法，堆排序是一种选择排序，它的最坏，最好，平均时间复杂度均为O(nlogn)，它也是不稳定排序。
2.堆是具有以下性质的完全二叉树：每个结点的值都大于或等于其左右孩子结点的值，称为大顶堆, 注意 : 没有要求结点的左孩子的值和右孩子的值的大小关系。
3.每个结点的值都小于或等于其左右孩子结点的值，称为小顶堆

堆排序的基本思想是：
1.将待排序序列构造成一个大顶堆
2.此时，整个序列的最大值就是堆顶的根节点。
3.将其与末尾元素进行交换，此时末尾就为最大值。
4.然后将剩余n-1个元素重新构造成一个堆，这样会得到n个元素的次小值。如此反复执行，便能得到一个有序序列了。

可以看到在构建大顶堆的过程中，元素的个数逐渐减少，最后就得到一个有序序列了.


 * 
 */
function heapSort(arr) {
    let len = arr.length
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        adjustHeap(arr, i, len)
    }
    for (let j = len - 1; j >= 0; j--) {
        swap(arr, j, 0)
        adjustHeap(arr, 0, j)
    }
    return arr
}
function adjustHeap(arr, index, length) {
    for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
        if (i + 1 < length && arr[i] < arr[i + 1]) {
            i++
        }
        if (arr[index] < arr[i]) {
            swap(arr, i, index)
            index = i
        } else {
            break
        }
    }
}

console.log(heapSort(arr))