const dateformat = require('dateformat');
export const formatDate = (dataDate, inverse) => {
  if (!inverse) {return dateformat(dataDate, 'dd/mm/yyyy')} else {return dateformat(dataDate, 'yyyy-mm-dd')};
};
