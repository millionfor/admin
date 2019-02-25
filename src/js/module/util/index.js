import moment from 'moment'

const rtDate = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}

const getBase64Image = (img, width, height) => {
  let canvas = document.createElement('canvas')
  canvas.width = width || img.width
  canvas.height = height || img.height

  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  let dataURL = canvas.toDataURL()
  return dataURL
}

const getBase64 = (img) => {
  let image = new Image()
  image.crossOrigin = ''
  image.src = img
  let deferred = $.Deferred()
  if (img) {
    image.onload = function () {
      deferred.resolve(getBase64Image(image))// 将base64传给done上传处理
    }
    return deferred.promise()// 问题要让onload完成后再return sessionStorage['imgTest']
  }
}

const uuid = (prefix) => {
  let id = Math.floor(Math.random() * 10000).toString(36)
  return prefix ? (
    ~prefix.indexOf('%{s}') ? (
      prefix.replace(/%\{s\}/g, id)
    ) : (prefix + id)
  ) : id
}


export {
  rtDate,
  getBase64,
  uuid
}
