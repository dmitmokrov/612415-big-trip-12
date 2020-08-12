export const getRandomInteger = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

export const getFormatNumber = (num) => num.toString().padStart(2, `0`);

export const getFormatDate = (date) => new Date(date).toLocaleString(`en-US`, {month: `short`, day: `2-digit`});

export const getFormatTime = (time) => new Date(time).toLocaleString(`en-US`, {hour12: false, hour: `2-digit`, minute: `2-digit`});

export const getFormatEditTime = (time) => {
  const date = new Date(time);
  const day = getFormatNumber(date.getDate());
  const month = getFormatNumber(date.getMonth());
  const year = date.getFullYear().toString().slice(0, -2);
  const hours = getFormatNumber(date.getHours());
  const minutes = getFormatNumber(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getFormatText = (text) => text.toLowerCase().split(` `).join(`-`);
