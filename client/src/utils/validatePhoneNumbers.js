const phoneReg = /^\d{10}$/;

export default numbers => {
    if(numbers) {
    const invalideNumbers = numbers
      .split(',')
      .map(number => number.trim())
      .filter(number => !number.match(phoneReg));

    if (invalideNumbers.length) {
      return `Invalid Phone Number ${invalideNumbers}`;
    }
  }
  
  return;
};
