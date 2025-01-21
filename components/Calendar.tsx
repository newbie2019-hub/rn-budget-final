import { CalendarDates } from '@/lib/helpers/calendar-dates'
import { ReactNode } from 'react'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'
import { Theme } from 'react-native-calendars/src/types'

const agenda = CalendarDates

const Calendar = ({
  children,
  theme = {},
}: {
  children: ReactNode
  theme?: Theme
}) => {
  return (
    <CalendarProvider date={agenda[1]?.title}>
      <ExpandableCalendar
        allowShadow={false}
        closeOnDayPress
        theme={{
          monthTextColor: 'black',
          dotColor: 'black',
          arrowColor: 'black',
          calendarBackground: '#F2F2F2',
          ...theme,
        }}
      />
      {children}
    </CalendarProvider>
  )
}

export default Calendar
