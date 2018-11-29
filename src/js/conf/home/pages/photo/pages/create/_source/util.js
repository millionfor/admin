
const itemAppendHtml = (i, v = {}) => {
  setTimeout(() => {
    let html = `<div class="el-upload-fromx"><label><input name="hot" type="radio" class="el-radio__input"/><span>设为封面</span></label><label><input name="sort" type="text" value="${v.sort || ''}" class="el-input__inner" /></label></div>`
    $('.el-upload-list__item').eq(i).append(html)
  }, 100)
}

const getSort = (i) => {
  return parseInt($('.el-upload-list__item').eq(i).find('input[type="text"]').val())
}


export {
  itemAppendHtml,
  getSort
}
