export const formatDate = date => {
  const theDate = new Date(date);
  return `${theDate.getHours() % 12}.${String(theDate.getMinutes()).padStart(2, '0')} ${
    theDate.getHours() >= 12 ? 'PM' : 'AM'
  }`;
};
