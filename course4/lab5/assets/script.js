function initTemperatureConverter() {
    const inputF = document.getElementById('tempF');
    const inputC = document.getElementById('tempC');

    inputF.oninput = function() {
        let f = parseFloat(inputF.value);
        if (!isNaN(f)) {
            let c = (5 / 9) * (f - 32);
            inputC.value = Math.round(c * 100) / 100;
        } else {
            inputC.value = "";
        }
    };

    inputC.oninput = function() {
        let c = parseFloat(inputC.value);
        if (!isNaN(c)) {
            let f = (c * 9 / 5) + 32;
            inputF.value = Math.round(f * 100) / 100;
        } else {
            inputF.value = "";
        }
    };
}
initTemperatureConverter();

let task2State = {
    total: 0,
    correct: 0,
    currentAnswer: 0
};

function initTask2() {
    const btnNext = document.getElementById('btnNext2');
    const btnCheck = document.getElementById('btnCheck2');
    const questionEl = document.getElementById('question2');
    const resultEl = document.getElementById('result2');
    const scoreEl = document.getElementById('score2');
    const inputEl = document.getElementById('answer2');

    btnCheck.disabled = true;

    btnNext.onclick = function() {
        let a = Math.floor(Math.random() * 9) + 2; // 2..10
        let b = Math.floor(Math.random() * 9) + 2; 
        
        task2State.currentAnswer = a * b;
        
        questionEl.textContent = `${a} × ${b} = ?`;
        inputEl.value = "";
        resultEl.textContent = "";
        inputEl.focus();
        
        btnCheck.disabled = false;
    };

    btnCheck.onclick = function() {
        let userAns = parseInt(inputEl.value);
        
        if (isNaN(userAns)) {
            resultEl.textContent = "Введіть число!";
            resultEl.className = "error";
            return;
        }

        task2State.total++;
        
        if (userAns === task2State.currentAnswer) {
            task2State.correct++;
            resultEl.textContent = "Правильно!";
            resultEl.className = "success";
        } else {
            resultEl.textContent = `Помилка, правильна відповідь «${task2State.currentAnswer}»`;
            resultEl.className = "error";
        }

        updateScore(scoreEl, task2State.correct, task2State.total);
        btnCheck.disabled = true;
    };
}

function updateScore(element, correct, total) {
    let percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    element.textContent = `Загальний рахунок ${percent}% (${correct} правильних відповідей з ${total})`;
}

initTask2();

let task3State = {
    total: 0,
    correct: 0,
    currentAnswer: 0
};

function initTask3() {
    const btnNext = document.getElementById('btnNext3');
    const questionEl = document.getElementById('question3');
    const answersContainer = document.getElementById('answers3-container');
    const resultEl = document.getElementById('result3');
    const scoreEl = document.getElementById('score3');

    btnNext.onclick = function() {
        let a = Math.floor(Math.random() * 9) + 2;
        let b = Math.floor(Math.random() * 9) + 2;
        task3State.currentAnswer = a * b;
        questionEl.textContent = `${a} × ${b} =`;

        let answers = [task3State.currentAnswer];
        while (answers.length < 4) {
            let wrong = (Math.floor(Math.random() * 9) + 2) * (Math.floor(Math.random() * 9) + 2);
            if (wrong !== task3State.currentAnswer && !answers.includes(wrong)) {
                answers.push(wrong);
            }
        }
        answers.sort(() => Math.random() - 0.5);

        answersContainer.innerHTML = "";
        resultEl.textContent = "";
        
        answers.forEach(val => {
            let wrapper = document.createElement('div');
            let radio = document.createElement('input');
            radio.type = "radio";
            radio.name = "calcTask";
            radio.value = val;
            radio.id = "ans_" + val;

            let label = document.createElement('label');
            label.htmlFor = "ans_" + val;
            label.textContent = val;
            label.style.marginLeft = "5px";

            radio.onchange = function() {
                checkTask3(parseInt(this.value));
                let allRadios = answersContainer.querySelectorAll('input[type="radio"]');
                allRadios.forEach(r => r.disabled = true);
            };

            wrapper.appendChild(radio);
            wrapper.appendChild(label);
            answersContainer.appendChild(wrapper);
        });
    };

    function checkTask3(userValue) {
        task3State.total++;
        if (userValue === task3State.currentAnswer) {
            task3State.correct++;
            resultEl.textContent = "Правильно!";
            resultEl.className = "success";
        } else {
            resultEl.textContent = `Помилка, правильна відповідь «${task3State.currentAnswer}»`;
            resultEl.className = "error";
        }
        updateScore(scoreEl, task3State.correct, task3State.total);
    }
}
initTask3();

const imagesArray = [
    {
        path: 'https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121031-iphone-16-pro.png', 
        title: 'iPhone 16 Pro',
        description: 'Новий флагман від Apple з титановим корпусом та кнопкою Camera Control.'
    },
    {
        path: 'https://images.samsung.com/is/image/samsung/assets/global/mkt/smartphones/galaxy-s24-ultra/kv/01_S24Ultra-Group-KV_MO.jpg?imbypass=true',
        title: 'Samsung Galaxy S24 Ultra',
        description: 'Потужний смартфон на Android зі стилусом S Pen та функціями штучного інтелекту.'
    },
    {
        path: 'https://www.notebookcheck.pl/fileadmin/Notebooks/News/_nc4/pixel-9-pro-deals-pixel-9.jpg',
        title: 'Google Pixel 9 Pro',
        description: 'Смартфон від Google з чистим Android та передовими можливостями камери.'
    }
];

function initPhotoRotator(divId, images) {
    const container = document.getElementById(divId);
    if (!container) return;

    let currentIndex = 0;

    const topInfo = document.createElement('div');
    topInfo.style.marginBottom = "10px";

    const imgElement = document.createElement('img');
    imgElement.className = 'photo-img';

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'photo-controls';

    const linkBack = document.createElement('a');
    linkBack.textContent = "Назад";
    linkBack.className = "control-link";

    const linkNext = document.createElement('a');
    linkNext.textContent = "Вперед";
    linkNext.className = "control-link";

    const bottomInfo = document.createElement('div');
    bottomInfo.style.marginTop = "10px";
    
    const titleEl = document.createElement('h4');
    const descEl = document.createElement('p');
    bottomInfo.appendChild(titleEl);
    bottomInfo.appendChild(descEl);

    container.appendChild(topInfo);
    container.appendChild(imgElement);
    
    controlsDiv.appendChild(linkBack);
    controlsDiv.appendChild(linkNext);
    container.appendChild(controlsDiv);

    container.appendChild(bottomInfo);

    function render() {
        const photo = images[currentIndex];
        
        imgElement.src = photo.path;
        imgElement.alt = photo.title;

        topInfo.textContent = `Фотографія ${currentIndex + 1} з ${images.length}`;
        titleEl.textContent = photo.title;
        descEl.textContent = photo.description;

        if (currentIndex === 0) {
            linkBack.classList.add('hidden');
        } else {
            linkBack.classList.remove('hidden');
        }

        if (currentIndex === images.length - 1) {
            linkNext.classList.add('hidden');
        } else {
            linkNext.classList.remove('hidden');
        }
    }

    linkBack.onclick = function() {
        if (currentIndex > 0) {
            currentIndex--;
            render();
        }
    };

    linkNext.onclick = function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            render();
        }
    };

    render();
}

initPhotoRotator('rotator', imagesArray);

let currentCaptchaValue = "";

function initCaptcha(digitsCount) {
    const display = document.getElementById('captcha-display');
    display.innerHTML = "";
    currentCaptchaValue = "";

    for (let i = 0; i < digitsCount; i++) {
        let digit = Math.floor(Math.random() * 10);
        currentCaptchaValue += digit;

        let span = document.createElement('span');
        span.textContent = digit;
        span.className = "captcha-digit";
        
        let rotation = Math.floor(Math.random() * 40) - 20;
        span.style.setProperty('--rot', rotation + 'deg');
        
        span.style.color = `rgb(${Math.random()*100}, ${Math.random()*100}, ${Math.random()*100})`;

        display.appendChild(span);
    }
    
    console.log("Captcha generated (for debug): " + currentCaptchaValue);
}

function checkCaptcha() {
    const input = document.getElementById('captchaInput');
    const result = document.getElementById('captchaResult');
    
    if (input.value === currentCaptchaValue) {
        result.textContent = "Правильно!";
        result.className = "success";
    } else {
        result.textContent = "Помилка";
        result.className = "error";
        setTimeout(() => {
            input.value = "";
            result.textContent = "Спробуйте ще раз (нова генерація...)";
            initCaptcha(6);
        }, 1500);
    }
}

initCaptcha(6);