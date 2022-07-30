const totalFocusTime = history => {
  let time = 0;

  history.forEach(val => {
    time += val.time
  });

  return (time / 3600).toString().substring(0, 3) + 'h';
};

export {
  totalFocusTime
};