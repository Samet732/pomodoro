const format = time => (time / 3600).toString().substring(0, 3) + 'h';

const getTotalFocusTime = history => {
  let pomodoroTime = 0;

  history.forEach(val => {
    pomodoroTime += val.time
  });

  return format(pomodoroTime);
};

const getLastWeekFocusTime = history => {
  let pomodoroTime = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const week = [];
  const temp = today.getDay() ? today.getDay() : 7;
  for (let i = temp; i > 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i + 1);
    week.push(date);
  }
  
  history.forEach(val => {
    const date = new Date(val.date);
    date.setHours(0, 0, 0, 0);

    week.forEach(val1 => {
      if (val1.getTime() === date.getTime())
        pomodoroTime += val.time;
    });
  });

  return format(pomodoroTime)
};

const getTodayFocusTime = history => {
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

export {
  getTotalFocusTime,
  getLastWeekFocusTime,
  getTodayFocusTime
};