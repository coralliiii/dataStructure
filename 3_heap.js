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