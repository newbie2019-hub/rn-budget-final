const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(12);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays: number) {
  const array: string[] = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

export const CalendarDates = [
  {
    title: dates[0],
    data: [],
  },
  {
    title: dates[1],
    data: []
  },
  {
    title: dates[2],
    data: []
  },
  {
    title: dates[3],
    data: []
  },
  {
    title: dates[4],
    data: [{}]
  },
  {
    title: dates[5],
    data: []
  },
  {
    title: dates[6],
    data: []
  },
  {
    title: dates[7],
    data: [{}]
  },
  {
    title: dates[8],
    data: []
  },
  {
    title: dates[9],
    data: []
  },
  {
    title: dates[10],
    data: []
  },
  {
    title: dates[11],
    data: []
  },
  {
    title: dates[12],
    data: []
  },
  {
    title: dates[13],
    data: []
  }
];
