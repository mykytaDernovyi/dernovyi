function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні (Promise відхилено)");
            }
        }, 1000);
    });
}

document.getElementById('btnTask4').addEventListener('click', () => {
    const n1 = Number(document.getElementById('num1').value);
    const n2 = Number(document.getElementById('num2').value);

    const loader = document.getElementById('loader4');
    const resultDiv = document.getElementById('result4');

    loader.style.display = 'block';
    resultDiv.textContent = '';
    resultDiv.className = 'result';

    compareNumbers(n1, n2)
        .then((text) => {
            resultDiv.textContent = text;
            resultDiv.classList.add('success');
        })
        .catch((err) => {
            resultDiv.textContent = err;
            resultDiv.classList.add('error');
        })
        .finally(() => {
            loader.style.display = 'none';
        });
});


function randomPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 10) + 1;
            console.log(`Проміс (${delay}мс) готовий: ${num}`);
            resolve(num);
        }, delay);
    });
}

document.getElementById('btnTask5').addEventListener('click', () => {
    const loader = document.getElementById('loader5');
    const resultDiv = document.getElementById('result5');

    loader.style.display = 'block';
    resultDiv.textContent = '';
    resultDiv.className = 'result';

    const promises = [
        randomPromise(1000),
        randomPromise(2000),
        randomPromise(3000)
    ];

    Promise.all(promises)
        .then((values) => {
            const sum = values.reduce((a, b) => a + b, 0);

            resultDiv.innerHTML = `Числа: ${values.join(', ')} <br> Сума: ${sum}`;
            resultDiv.classList.add('success');
        })
        .catch((err) => {
            resultDiv.textContent = "Помилка: " + err;
            resultDiv.classList.add('error');
        })
        .finally(() => {
            loader.style.display = 'none';
        });
});