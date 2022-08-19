import { Toast } from 'vant'
import { translate } from '@/language'
// 列表加载实例函数
function load_list(obj) {
  this.obj = obj
  this.page = 1
  this.limit = obj.limit || (obj.data ? obj.data.limit : false) || 15
  this.api = obj.api
  this.data = obj.data || {}
  this.also = true
  this.stop = false
  this.list = []
  this.resData = 0
  this.load()
  this.success = obj.success
  this.before = obj.before
}
// 加载数据
load_list.prototype.load = function () {
  if (this.stop) {
    // console.log('正在加载上次数据')
    return
  }
  this.stop = true
  if (this.also) {
    this.before && this.before(this.obj)
    this.api({
      page: this.page,
      ...this.data,
      limit: this.limit,
    })
      .then((res) => {
        this.list = this.list.concat(res.list)
        // console.log('this.list', this.list)
        // console.log(res.list)
        this.resData = res
        this.page += 1
        if (this.page == res.total + 1 || !res.list.length || res.list.length < this.limit) {
          this.also = false
        }
        this.success && this.success(this.list, this.resData)
      })
      .finally(() => {
        this.stop = false
      })
  } else {
    this.stop = false
    Toast('数据加载完毕')
    // common.msg();
    return true
  }
}
// 重置数据
load_list.prototype.reset = function () {
  this.page = 1
  this.also = true
  this.list = []
}

export default load_list
