function task5() {
    console.log("=== ЗАВДАННЯ 5: Фільтрація та маніпуляція вкладених об'єктів ===");

    let orders = [
        {
            orderId: 1,
            customer: {
                name: "Іван Петренко",
                email: "ivan@example.com"
            },
            items: ["Ноутбук", "Мишка"],
            total: 25500
        },
        {
            orderId: 2,
            customer: {
                name: "Марія Коваленко",
                email: "maria@example.com"
            },
            items: ["Клавіатура", "Навушники"],
            total: 3200
        },
        {
            orderId: 3,
            customer: {
                name: "Іван Петренko",
                email: "ivan@example.com"
            },
            items: ["Монітор"],
            total: 8000
        },
        {
            orderId: 4,
            customer: {
                name: "Олександр Сидоренко",
                email: "olexandr@example.com"
            },
            items: ["Телефон", "Чохол"],
            total: 15000
        }
    ];

    function getTotalSpentByCustomer(ordersArray, customerName) {
        let customerOrders = ordersArray.filter(function (order) {
            return order.customer.name === customerName;
        });

        let totalSpent = customerOrders.reduce(function (total, order) {
            return total + order.total;
        }, 0);

        return totalSpent;
    }

    console.log("Масив замовлень:");
    for (let i = 0; i < orders.length; i++) {
        console.log("Замовлення " + orders[i].orderId + ": " +
            orders[i].customer.name + " - " + orders[i].total + " грн");
    }

    console.log("\nТестування функції getTotalSpentByCustomer:");

    let ivanTotal = getTotalSpentByCustomer(orders, "Іван Петренко");
    console.log("Іван Петренко витратив: " + ivanTotal + " грн");

    let mariaTotal = getTotalSpentByCustomer(orders, "Марія Коваленко");
    console.log("Марія Коваленко витратила: " + mariaTotal + " грн");

    let olexandrTotal = getTotalSpentByCustomer(orders, "Олександр Сидоренко");
    console.log("Олександр Сидоренко витратив: " + olexandrTotal + " грн");

    let unknownTotal = getTotalSpentByCustomer(orders, "Неіснуючий Клієнт");
    console.log("Неіснуючий Клієнт витратив: " + unknownTotal + " грн");
}

function task6() {
    console.log("\n=== ЗАВДАННЯ 6: Об'єднання та оптимізація даних ===");

    let products = [
        {
            productId: 1,
            name: "Ноутбук",
            price: 25000
        },
        {
            productId: 2,
            name: "Мишка",
            price: 500
        },
        {
            productId: 3,
            name: "Клавіатура",
            price: 1200
        },
        {
            productId: 4,
            name: "Монітор",
            price: 8000
        },
        {
            productId: 5,
            name: "Навушники",
            price: 1500
        }
    ];

    let purchases = [
        {
            purchaseId: 1,
            productId: 1,
            quantity: 2
        },
        {
            purchaseId: 2,
            productId: 2,
            quantity: 5
        },
        {
            purchaseId: 3,
            productId: 1,
            quantity: 1
        },
        {
            purchaseId: 4,
            productId: 3,
            quantity: 3
        },
        {
            purchaseId: 5,
            productId: 4,
            quantity: 2
        },
        {
            purchaseId: 6,
            productId: 2,
            quantity: 10
        },
        {
            purchaseId: 7,
            productId: 5,
            quantity: 4
        }
    ];

    function getTotalSales() {
        let result = purchases.reduce(function (sales, purchase) {
            let product = products.find(function (prod) {
                return prod.productId === purchase.productId;
            });

            if (product) {
                if (sales[product.name]) {
                    sales[product.name] += product.price * purchase.quantity;
                } else {
                    sales[product.name] = product.price * purchase.quantity;
                }
            }

            return sales;
        }, {});

        return result;
    }

    console.log("Масив товарів:");
    for (let i = 0; i < products.length; i++) {
        console.log(products[i].productId + ". " + products[i].name + " - " + products[i].price + " грн");
    }

    console.log("\nМасив покупок:");
    for (let i = 0; i < purchases.length; i++) {
        console.log("Покупка " + purchases[i].purchaseId + ": товар " +
            purchases[i].productId + " - " + purchases[i].quantity + " шт.");
    }

    console.log("\nРезультат роботи функції getTotalSales:");
    let totalSales = getTotalSales();

    for (let productName in totalSales) {
        console.log(productName + ": " + totalSales[productName] + " грн");
    }

    console.log("\nДодатковий аналіз:");
    let totalRevenue = 0;
    for (let productName in totalSales) {
        totalRevenue += totalSales[productName];
    }
    console.log("Загальний дохід: " + totalRevenue + " грн");
}