const testStrategy = {
  a: function (inputValue, errMsg) {
    // 验证是否为空
    if (inputValue == '') {
      return errMsg
    }
  },
  b: function (inputValue, errMsg) {
    // 验证是否为0
    if (Number(inputValue) === 0) {
      return errMsg
    }
  },
  c: function (inputValue, amount, errMsg) {
    // 验证金额
    if (Number(inputValue) > amount) {
      return errMsg
    }
  },
  d: function (inputValue, minLimit, errMsg) {
    // 验证低于最小值
    if (Number(inputValue) < minLimit) {
      return errMsg
    }
  },
  e: function (inputValue, maxLimit, errMsg) {
    // 验证高于最大值
    if (Number(inputValue) > maxLimit) {
      return errMsg
    }
  },
  f: function (_, inputStatus, errMsg) {
    console.log(Boolean(inputStatus))
    // 验证高于最大值
    if (inputStatus) {
      return errMsg
    }
  }
}

class Validator {
  constructor() {
    this.cache = [] // 保存校验规则
  }
  add(dom, rule, errorMsg) {
    const ary = rule.split(':') // 把 strategy 和参数分开
    console.log(ary)
    this.cache.push(function () {
      // 把校验的步骤用空函数包装起来，并且放入 cache
      const strategy = ary.shift() // 用户挑选的 strategy
      ary.unshift(dom.value) // 把 input 的 value 添加进参数列表
      ary.push(errorMsg) // 把 errorMsg 添加进参数列表
      return testStrategy[strategy].apply(dom, ary)
    })
  }
  start() {
    /* prettier-ignore */
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
      const msg = validatorFunc() // 开始校验，并取得校验后的返回信息
      if (msg) {
        // 如果有确切的返回值，说明校验没有通过
        return msg
      }
    }
  }
}
