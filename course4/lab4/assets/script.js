function task1() {
    console.log("=== ЗАВДАННЯ 1: Робота з об'єктами ===");

    let book = {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        year: 1997,
        isRead: true,

        bookInfo: function () {
            let readStatus = this.isRead ? "Так" : "Ні";
            console.log("Назва: " + this.title + ", Автор: " + this.author +
                ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
        }
    };

    console.log("1. Початкова інформація про книгу:");
    book.bookInfo();

    console.log("2. Після зміни статусу прочитання:");
    book.isRead = !book.isRead;
    book.bookInfo();

    console.log("\n=== ЗАВДАННЯ 2: Робота з масивами та об'єктами ===");

    let library = [
        {
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            year: 1997,
            isRead: true,
            bookInfo: function () {
                let readStatus = this.isRead ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
            }
        },
        {
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            year: 1937,
            isRead: false,
            bookInfo: function () {
                let readStatus = this.isRead ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
            }
        },
        {
            title: "1984",
            author: "George Orwell",
            year: 1949,
            isRead: true,
            bookInfo: function () {
                let readStatus = this.isRead ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
            }
        }
    ];

    function displayLibrary() {
        console.log("=== ВСІ КНИГИ В БІБЛІОТЕЦІ ===");
        for (let i = 0; i < library.length; i++) {
            library[i].bookInfo();
        }
    }

    console.log("1. Початкова бібліотека:");
    displayLibrary();

    console.log("2. Після додавання нової книги:");
    library.push({
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        year: 1925,
        isRead: false,
        bookInfo: function () {
            let readStatus = this.isRead ? "Так" : "Ні";
            console.log("Назва: " + this.title + ", Автор: " + this.author +
                ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
        }
    });
    displayLibrary();

    console.log("\n=== ЗАВДАННЯ 3: Робота з методами масивів ===");

    library.sort(function (a, b) {
        return a.year - b.year;
    });

    console.log("1. Книги відсортовані за роком видання:");
    displayLibrary();

    let unreadBooks = library.filter(function (book) {
        return !book.isRead;
    });

    console.log("2. Непрочитані книги:");
    for (let i = 0; i < unreadBooks.length; i++) {
        unreadBooks[i].bookInfo();
    }

    let tolkienBook = library.find(function (book) {
        return book.author === "J.R.R. Tolkien";
    });

    console.log("3. Книга Толкіна:");
    if (tolkienBook) {
        tolkienBook.bookInfo();
    } else {
        console.log("Книгу Толкіна не знайдено");
    }

    console.log("\n=== ЗАВДАННЯ 4: Взаємодія з користувачем ===");

    function addBookToLibrary() {
        let title = prompt("Введіть назву книги:");
        if (title === null) return;

        let author = prompt("Введіть автора книги:");
        if (author === null) return;

        let year = parseInt(prompt("Введіть рік видання книги:"));
        if (isNaN(year)) {
            alert("Будь ласка, введіть коректний рік");
            return;
        }

        let isRead = confirm("Чи прочитана книга?");

        let newBook = {
            title: title,
            author: author,
            year: year,
            isRead: isRead,
            bookInfo: function () {
                let readStatus = this.isRead ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Рік видання: " + this.year + ", Прочитана: " + readStatus);
            }
        };

        library.push(newBook);

        console.log("Книгу додано до бібліотеки!");
        console.log("Оновлена бібліотека:");
        displayLibrary();
    }

    console.log("Функція addBookToLibrary готова до використання");
    console.log("Для додавання нової книги викличте addBookToLibrary() в консолі");

console.log("\n=== ІНДИВІДУАЛЬНІ ЗАВДАННЯ ===");

console.log("1. Метод markAsRead:");

for (let i = 0; i < library.length; i++) {
    library[i].markAsRead = function () {
        this.isRead = true;
        console.log("Книгу '" + this.title + "' позначено як прочитану");
    };
}

console.log("Приклад використання markAsRead:");
if (library.length > 0) {
    library[1].markAsRead();
    console.log("Оновлена інформація:");
    library[1].bookInfo();
}

console.log("\n2. Середній рік видання:");

function calculateAverageYear() {
    let totalYears = 0;
    for (let i = 0; i < library.length; i++) {
        totalYears += library[i].year;
    }
    return totalYears / library.length;
}

let averageYear = calculateAverageYear();
console.log("Середній рік видання: " + averageYear.toFixed(0));
}

function task2() {

    console.log("\n3. Колекція коміксів:");

    let comicsCollection = [
        {
            title: "The Amazing Spider-Man",
            author: "Stan Lee",
            publisher: "Marvel Comics",
            year: 1963,
            inCollection: true,
            comicInfo: function () {
                let inCollectionStatus = this.inCollection ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Видавництво: " + this.publisher + ", Рік: " + this.year +
                    ", В колекції: " + inCollectionStatus);
            }
        },
        {
            title: "Batman: The Dark Knight Returns",
            author: "Frank Miller",
            publisher: "DC Comics",
            year: 1986,
            inCollection: false,
            comicInfo: function () {
                let inCollectionStatus = this.inCollection ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Видавництво: " + this.publisher + ", Рік: " + this.year +
                    ", В колекції: " + inCollectionStatus);
            }
        },
        {
            title: "Watchmen",
            author: "Alan Moore",
            publisher: "DC Comics",
            year: 1986,
            inCollection: true,
            comicInfo: function () {
                let inCollectionStatus = this.inCollection ? "Так" : "Ні";
                console.log("Назва: " + this.title + ", Автор: " + this.author +
                    ", Видавництво: " + this.publisher + ", Рік: " + this.year +
                    ", В колекції: " + inCollectionStatus);
            }
        }
    ];

    function displayComicsCollection() {
        console.log("=== КОЛЕКЦІЯ КОМІКСІВ ===");
        for (let i = 0; i < comicsCollection.length; i++) {
            comicsCollection[i].comicInfo();
        }
    }

    displayComicsCollection();

    let dcComics = comicsCollection.filter(function (comic) {
        return comic.publisher === "DC Comics";
    });

    console.log("\nКомікси DC Comics:");
    for (let i = 0; i < dcComics.length; i++) {
        dcComics[i].comicInfo();
    }

}