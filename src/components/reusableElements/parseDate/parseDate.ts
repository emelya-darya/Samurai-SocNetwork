const correctHourMinuteValue = (v: number) => {
   const strV = String(v)
   return strV.length === 1 ? '0' + strV : strV
}

const ms_in_sec = 1000
const ms_in_min = 60 * ms_in_sec
const ms_in_hour = 60 * ms_in_min
const ms_in_day = ms_in_hour * 24

const todayDate = new Date(Date.now())

export const todayDateObj = {
   currentYear: todayDate.getFullYear(),
   currentMonth: todayDate.getMonth(),
   currentDay: todayDate.getDate(),
   currentHour: todayDate.getHours(),
   currentMinutes: todayDate.getMinutes(),
   currentSeconds: todayDate.getSeconds(),
   currentMilliseconds: todayDate.getMilliseconds(),
}
const yesterdayDay = new Date(+todayDate - ms_in_day)

export const yesterdayDateObj = {
   yesterdayYear: yesterdayDay.getFullYear(),
   yesterdayMonth: yesterdayDay.getMonth(),
   yesterdayDay: yesterdayDay.getDate(),
   // currentHour: todayDate.getHours(),
   // currentMinutes: todayDate.getMinutes(),
   // currentSeconds: todayDate.getSeconds(),
   // currentMilliseconds: todayDate.getMilliseconds(),
}

export const parseDateStr = (dateStr: string) => {
   const { currentYear, currentMonth, currentDay, currentHour, currentMinutes, currentSeconds, currentMilliseconds } = todayDateObj
   const { yesterdayYear, yesterdayMonth, yesterdayDay } = yesterdayDateObj

   const monthsEngAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

   // смещение по часовому пользователю юзера (в минутах)
   const timezoneOffset = new Date().getTimezoneOffset()

   const dateObj = new Date(Date.parse(dateStr) - timezoneOffset * 60 * 1000)

   // разность дат
   const datesDiff = +todayDate - +dateObj

   // Данные из dateStr с учетом часового пояса юзера
   const year = dateObj.getFullYear()
   const month = dateObj.getMonth()
   const day = dateObj.getDate()
   const hour = correctHourMinuteValue(dateObj.getHours())
   const minute = correctHourMinuteValue(dateObj.getMinutes())

   const isToday = year == currentYear && month == currentMonth && day == currentDay
   const isYesterday = year == yesterdayYear && month == yesterdayMonth && day == yesterdayDay

   if (datesDiff < 60 * 1000 * 3) {
      return 'now'
   } else if (isToday) {
      return `${hour}:${minute}`
   } else if (isYesterday) {
      return `yday ${hour}:${minute}`
   } else if (year != currentYear) {
      return `${day} ${monthsEngAbbrs[month]} ${year}`
   } else {
      return `${day} ${monthsEngAbbrs[month]}`
   }
}

// parseDateStr('2020-04-27T19:04:19.853', 2023, 7, 1)
