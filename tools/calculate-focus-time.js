const format = time => {
  const hours = time / 3600;
  return Math.floor(hours) + parseFloat((hours %  1).toString().substring(0, 3)) + 'h';
};

const getTotalFocusTime = history => {
  let pomodoroTime = 0;

  history.forEach(val => {
    pomodoroTime += val.time
  });

  return format(pomodoroTime);
};

// returns last week's total focus time
const getLastWeekTotalFocusTime = history => {
  let pomodoroTime = 0;
  const week = getLastWeekFocusTime(history);

  week.forEach(val => pomodoroTime += val.time);

  return format(pomodoroTime)
};

const getTodayTotalFocusTime = history => {
  let pomodoroTime = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  history.forEach(val => {
    const date = new Date(val.date);
    date.setHours(0, 0, 0, 0);

    if (today.getTime() === date.getTime())
      pomodoroTime += val.time;
  });

  return format(pomodoroTime); 
};

// returns last week focus time by daily
const getLastWeekFocusTime = history => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const week = [];
  const day = today.getDay() ? today.getDay() : 7;
  for (let i = 7; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - (day - i));
    week.push({ date: date, time: 0 });
  }
  
  history.forEach(val => {
    const date = new Date(val.date);
    date.setHours(0, 0, 0, 0);

    week.forEach((val1, index) => {
      if (val1.date.getTime() === date.getTime())
        week[index].time += val.time; 
    });
  });

  return week;
};

export {
  getTotalFocusTime,
  getLastWeekTotalFocusTime,
  getTodayTotalFocusTime,
  getLastWeekFocusTime
};