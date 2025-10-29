function Task1() {
    alert("Завдання 1: Перевірте консоль браузера (F12)");

    function calculate() {
        let result = "зовнішня змінна";
        console.log("До блоку if: " + result);

        if (true) {
            let result = "внутрішня змінна";
            console.log("Всередині блоку if: " + result);
        }

        console.log("Після блоку if: " + result);

        console.log("До оголошення varVariable: " + typeof varVariable);
        var varVariable = "змінна з var";
        console.log("Після оголошення varVariable: " + varVariable);

        let letVariable = "змінна з let";
        console.log("Після оголошення letVariable: " + letVariable);
    }

    calculate();
}

function Task2() {
    const journalNumber = 7;
    const secretNumber = journalNumber % 10;

    const userGuess = prompt("Введіть число від 0 до 9");

    if (userGuess === null) {
        alert("Ви скасували введення");
        return;
    }

    const guessNumber = parseInt(userGuess);

    if (isNaN(guessNumber) || guessNumber < 0 || guessNumber > 9) {
        alert("Будь ласка, введіть коректне число від 0 до 9");
        return;
    }

    if (guessNumber === secretNumber) {
        alert("Correct!");
    } else {
        alert("Wrong!");
    }
}

function Task3() {
    const name = prompt("Введіть ваше ім'я");
    if (name === null) {
        alert("Ви скасували введення");
        return;
    }

    const num1Str = prompt("Введіть перше число");
    if (num1Str === null) {
        alert("Ви скасували введення");
        return;
    }

    const num2Str = prompt("Введіть друге число");
    if (num2Str === null) {
        alert("Ви скасували введення");
        return;
    }

    const num1 = Number(num1Str);
    const num2 = Number(num2Str);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Будь ласка, введіть коректні числа");
        return;
    }

    const sum = num1 + num2;

    const message = "Hello, " + name + "! The sum of " + num1 + " and " + num2 + " is " + sum;

    console.log(message);
    alert("Результат виведено у консоль. Натисніть F12 для перегляду.");
}