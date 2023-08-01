export const parseDateStr = (dateStr: string, currentYear: number, currentMonth: number, currentDay: number) => {
   const monthsEngAbbrs = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

   // смещение по часовому пользователю юзера (в минутах)
   const timezoneOffset = new Date(Date.now()).getTimezoneOffset()

   const dateObj = new Date(Date.parse(dateStr) - timezoneOffset * 60 * 1000)

   // Данные из dateStr с учетом часового пояса юзера
   const year = dateObj.getFullYear()
   const month = dateObj.getMonth()
   const day = dateObj.getDate()
   const hour = dateObj.getHours()
   const minute = dateObj.getMinutes()

   let dateFinalStr: string

   if (year == currentYear && month == currentMonth && day == currentDay) {
      dateFinalStr = `${hour}:${minute}`
   } else if (year != currentYear) {
      dateFinalStr = `${day} ${monthsEngAbbrs[month]} ${year}`
   } else {
      dateFinalStr = `${day} ${monthsEngAbbrs[month]}`
   }

   return dateFinalStr
}

parseDateStr('2020-04-27T19:04:19.853', 2023, 7, 1)
