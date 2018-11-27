import moment from 'moment'


const rtDate = (time) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}


export {
  rtDate
}
