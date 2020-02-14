// 防抖
const debounce = (fn, wait) => {
  let timer = null
  return function() {
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, wait)
  }
}

// 锚点滚动
export const scrollSmoothTo = position => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      return setTimeout(callback, 17)
    }
  }
  // 当前滚动高度
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  // 滚动step方法
  var step = function() {
    // 距离目标滚动距离
    var distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      window.scrollTo(0, position)
    } else {
      window.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}

// 滚动方向
export const scrollDirection = callback => {
  let rePoint = null
  const direction = debounce(function() {
    let status = 0
    const pageYOffset = window.pageYOffset
    if (rePoint === null) {
      rePoint = pageYOffset
    }
    const diff = rePoint - pageYOffset
    rePoint = pageYOffset
    // -1 up, 1 down, 0 nothing
    if (Math.abs(diff) < 10) {
      status = 0
    } else if (diff > 0) {
      status = -1
    } else if (diff < 0) {
      status = 1
    } else {
      status = 0
    }
    callback(status)
  }, 14)
  window.onscroll = e => {
    direction()
  }
}
