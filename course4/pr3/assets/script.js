function printTask(number, description, result) {
    document.write(`
        <div class="task-card">
            <div class="task-title">Завдання №${number}</div>
            <p>${description}</p>
            <div class="result-line">${result}</div>
        </div>
    `);
}

let task1Date = new Date(2021, 1, 20, 3, 12); 

printTask(1, 
    "Створення дати (20 лютого 2021, 3:12):", 
    task1Date.toLocaleString("uk-UA")
);

function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}

let task2Date = new Date(2012, 0, 3);
printTask(2, 
    "День тижня для 03.01.2012:", 
    getWeekDay(task2Date)
);

function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

printTask(3, 
    "Останній день лютого 2020 (високосний):", 
    getLastDayOfMonth(2020, 1)
);

function getSecondsToTomorrow() {
    let now = new Date();

    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    let diff = tomorrow - now;
    return Math.round(diff / 1000);
}

printTask(4, 
    "Секунд до завтра:", 
    getSecondsToTomorrow()
);

function formatDate(date) {
    let diff = new Date() - date;

    if (diff < 1000) {
        return "прямо зараз";
    }

    let sec = Math.floor(diff / 1000);
    if (sec < 60) {
        return `${sec} сек. назад`;
    }

    let min = Math.floor(diff / 60000);
    if (min < 60) {
        return `${min} хв. назад`;
    }

    let d = date;
    let day = ('0' + d.getDate()).slice(-2);
    let month = ('0' + (d.getMonth() + 1)).slice(-2);
    let year = d.getFullYear().toString().slice(-2);
    let hours = ('0' + d.getHours()).slice(-2);
    let minutes = ('0' + d.getMinutes()).slice(-2);

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

let d1 = new Date(new Date() - 1);
let d2 = new Date(new Date() - 30 * 1000);
let d3 = new Date(new Date() - 5 * 60 * 1000);
let d4 = new Date(new Date() - 86400 * 1000); 

document.write(`<div class="task-card"><div class="task-title">Завдання №5 (Форматування)</div>`);
document.write(`<div class="result-line">1 мс назад: "${formatDate(d1)}"</div>`);
document.write(`<div class="result-line">30 сек назад: "${formatDate(d2)}"</div>`);
document.write(`<div class="result-line">5 хв назад: "${formatDate(d3)}"</div>`);
document.write(`<div class="result-line">Вчора: "${formatDate(d4)}"</div>`);
document.write(`</div>`);