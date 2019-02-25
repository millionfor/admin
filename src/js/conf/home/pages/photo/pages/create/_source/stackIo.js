let num = 1
let ioArr = [] // 数组栈 []
let loading = false
let pFactor = function (b, d) {
  return () => {
    return new Promise((resolve, reject) => {
      let io = b()
      io.then(() => {
        resolve()
        d(io)
      }).catch(() => {
        resolve()
        d(io)
      })
    })
  }
}

let req = function () {
  if (loading) {
    return
  }
  if (ioArr.length > 0) {
    loading = true
    let arr = ioArr.splice(0, num)
    arr.forEach((p, i) => {
      arr[i] = p()
    })
    Promise.all(arr).then(() => {
      loading = false
      req()
    })
  }
}

let clearIO = function () {
  ioArr = []
  loading = false
}

export { clearIO }

/**
 * @params b {function(){}}  void Promise
 * @params d {function( promise}{}}
 * */
export default function (b, d) {
  // 添加到栈中
  ioArr.push(pFactor(b, d))
  req()
}

