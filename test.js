function combinationSum(arr, target) {
    let ret = []
    // 先排序， 有利于去掉重复的
    arr.sort((a, b) => a - b)
    dfs(arr, [], ret, target, 0)
    return ret
}
// tmp 代表可成功的排列
// ret 代表最终的结果
// target 代表剩余的需要和
// start 代表开始遍历的index

function dfs(arr, tmp, ret, target, start) {
    console.log(target)
    if (target === 0) {
        ret.push(tmp.slice())// slice至关重要，不会改变原始数组，返回一个新的arr
        return
    }
    if (start > arr.length) return
    for (let i = start; i < arr.length; i++) {
        if (i > start && arr[i] == arr[i - 1]) continue// 减枝，剪掉重复的
        if (arr[i] <= target) { // 遍历的数组比目标和小 我们就放进去
            tmp.push(arr[i])
            dfs(arr, tmp, ret, target - arr[i], i + 1)
            tmp.pop()
        }
    }
}
let arr = [1, 2, 3, 4, 5, 5, 4, 3, 2, -5, -7]
console.log(combinationSum(arr, 5))