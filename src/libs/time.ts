namespace Time {
  export const getCurrentTime = (): string => {
    const timeNow = new Date()
    const hour = timeNow.getHours()
    const minutes = timeNow.getMinutes()
    const seconds = timeNow.getSeconds()
    const formattedHour = hour < 10 ? `0${hour}` : hour
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedHour}:${formattedMinutes}:${formattedSeconds}`
  }
}

export default Time
