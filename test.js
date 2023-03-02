Array.prototype.MyReaduce = function (fn, initialValue) {
    let arr = this
    if (arr.length < 1) {
        throw new Error('erro')
    }
    var value = initialValue ? initialValue : arr[0]
    for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
        value = fn(value, arr[i], i, arr)
    }
    return value
}
var arr = [2, 1, 4, 5, 6, 9]
// var arr = []

console.log(arr.reduce((pre, cur) => {
    return pre + cur
}, 0))

console.log(arr.MyReaduce((pre, cur) => {
    return pre + cur
}, 0))