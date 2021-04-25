const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 节流
 * @param {*} func 
 * @param {*} wait 
 */
function throttle(func, wait) {
  var previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

/**
 * 防抖
 * @param {}} func 
 * @param {*} wait 
 */
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = [...arguments];
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}



/*导出*/
module.exports = {
  throttle,
  debounce,
  formatTime,
  sleep
};