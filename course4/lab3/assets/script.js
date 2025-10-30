
function* randomGenerator(min, max) {
    while (true) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        yield randomNum;
    }
}

document.getElementById('next').addEventListener('click', function () {
    let min = parseInt(prompt("Введіть мінімальне число:"));
    let max = parseInt(prompt("Введіть максимальне число:"));

    if (isNaN(min) || isNaN(max)) {
        alert("Будь ласка, введіть коректні числа!");
        return;
    }

    let generator = randomGenerator(min, max);
    let randomNumber = generator.next().value;

    document.getElementById('out').textContent = "Випадкове число: " + randomNumber;
});

function* passwordGenerator() {
    let password = "";

    while (true) {
        let input = yield password;

        if (input === 'done') {
            return password;
        } else {
            password += input;
        }
    }
}

document.getElementById('generatePassword').addEventListener('click', function () {
    let generator = passwordGenerator();
    generator.next();

    let password = "";
    let input;

    while (input !== 'done') {
        input = prompt("Введіть символ для паролю (або 'done' для завершення):");

        if (input === 'done') {
            password = generator.next('done').value;
        } else if (input) {
            generator.next(input);
        }
    }

    alert("Ваш пароль: " + password);
});

function* chatBot() {
    let name = yield "Hi! What is your name?";
    let feeling = yield "Nice to meet you, " + name + "! How are you?";
    return "Goodbye!";
}

document.getElementById('startChat').addEventListener('click', function () {
    let generator = chatBot();
    let question = generator.next().value;

    while (true) {
        let answer = prompt(question);

        if (answer === null) {
            break;
        }

        let result = generator.next(answer);

        if (result.done) {
            alert(result.value);
            break;
        } else {
            question = result.value;
        }
    }
});

let userName = prompt("Введіть ваше ім'я:");

let user = {
    name: userName,
    say: function () {
        alert("Hello, " + this.name);
    }
};

document.getElementById('hello').addEventListener('click', function () {
    user.say();
});

