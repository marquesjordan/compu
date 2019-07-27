export default number => {
  if (number) {
    var USNumber = number.match(/(\d{3})(\d{3})(\d{4})/);
    USNumber = '(' + USNumber[1] + ') ' + USNumber[2] + '-' + USNumber[3];

    return USNumber;
  }

  return ''
};
