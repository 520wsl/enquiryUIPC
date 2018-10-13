let util = {};

/**
 * 获取指定数组指定key对应的值比较，若相等则返回该value值
 * @param arr Array       需要遍历的数组
 * @param id string       需要对比值的
 * @param find String     等待对比的值,默认对比id
 * @param result String   等待对比成功后返回的值,默认value
 */

util.getResult = function(arr = [], id = "", find = "id", result = "value") {
  let value = "";
  if (id === undefined || id === null || !find || !result) {
    return "";
  }
  arr.map(function(e) {
    if (e[find] === id) {
      value = e[result];
    }
  });
  return value;
};

/**
 * 字符串 去 前后空格
 * @param {*} str 字符串
 */
util.trim = function(str = "") {
  console.log("字符串 去 前后空格:==>", str);
  if (!str || str === undefined || str === null || typeof str !== "string") {
    return "";
  }
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 为数字加上单位：万
 *
 * 例如：
 *      1000.01 => 1000.01
 *      10000 => 1万
 *      99000 => 9.9万
 *      566000 => 56.6万
 *      5660000 => 566万
 *      44440000 => 4444万
 *      11111000 => 1111.1万
 *
 * @param {number} input 输入数字.
 */
util.NumberUpperFormat = function(input) {
  // const units = [
  //     {num: 4, unit: '万'},
  //     {num: 6, unit: '百万'},
  //     {num: 7, unit: '千万'},
  //     {num: 8, unit: '亿'}
  //   ];
  // 精确到整数，直接用js自带方法input.toFixed(0)也可以
  // console.log('精确到整数，直接用js自带方法input.toFixed(0)也可以')
  if (input >= 10000) {
    const num = input / 10000;
    return `${num.toFixed(2)}万`;
  } else {
    let v = input;
    if (v == "" || v == null || v == undefined) {
      return v;
    }
    return v.toFixed(2);
  }
};

export default util;
