function randomIntegerNumber(firstNumber, secondNumber) {
  //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных числел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    if (Number.isInteger(firstNumber)) {
      return firstNumber;
    }
    return 'Введите различные значение';
  }

  if (Math.ceil(firstNumber) === Math.ceil(secondNumber)) {
    return 'В этом диапазоне не найдено целых чисел. Введите коректные данные';
  }
  let min = Math.ceil(firstNumber);
  let max = Math.floor(secondNumber);
  if (firstNumber > secondNumber) {
    min = Math.ceil(secondNumber);
    max = Math.floor(firstNumber);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

randomIntegerNumber(2, 5);


function randomFractionalNumber(firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return 'Никаких отрицательных числел, друг! Поменяй значения!';
  }

  if (firstNumber === secondNumber) {
    if (Number.isInteger(firstNumber)) {
      return firstNumber;
    }
    return 'Введите различные значение';
  }

  let min = firstNumber;
  let max = secondNumber;
  if (firstNumber > secondNumber) {
    min = secondNumber;
    max = firstNumber;
  }
  return Math.random() * (max - min + 1) + min;
}

randomFractionalNumber(2.5, 5.758);
