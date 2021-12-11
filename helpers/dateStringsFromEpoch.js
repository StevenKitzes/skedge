import months from './months'

function dateStringsFromEpoch(dateEpoch) {
  const date = new Date(dateEpoch)
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const dateString = `${months[month]} ${day}, ${year}`
  const timeString = `${hours % 12 ? hours % 12 : '12'}:${minutes || '00'}${hours > 11 ? 'pm' : 'am'}`

  return {
    dateString,
    timeString
  }
}

export default dateStringsFromEpoch
