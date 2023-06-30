module.exports = {
    format_date: (date) => {
      return `${new Date(date).toLocaleString('default', { month: 'long'})} ${new Date(date).getDate()}, ${
        new Date(date).getFullYear()
      }`;
    },
  };
  