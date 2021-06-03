function randomIntegerNumber(firstNumber, secondNumber) {
  if (firstNumber > secondNumber) {
    return 'Диапазон не верен, введите корректные данные';
  }

  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных чисел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    if (Number.isInteger(firstNumber)) {
      return firstNumber;
    }
    return 'Введите различные значение';
  }

  if (Math.ceil(firstNumber) === Math.ceil(secondNumber)) {
    return 'В этом диапазоне не найдено целых чисел. Введите корректные данные';
  }

  const min = Math.ceil(firstNumber);
  const max = Math.floor(secondNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomIntegerNumber(2, 5);

function randomFractionalNumber(firstNumber, secondNumber, numsAfterDot = 2) {
  if (firstNumber > secondNumber) {
    return 'Диапазон не верен, введите корректные данные';
  }

  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных чисел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    return Number(firstNumber.toFixed(numsAfterDot));
  }

  const powerNumber = Math.pow(10, numsAfterDot);
  return (Number((Math.random() * (secondNumber - firstNumber) + firstNumber).toFixed(numsAfterDot)) * powerNumber) / powerNumber;
}

randomFractionalNumber(1.1, 1.2, 3);
