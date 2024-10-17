//operationManage.js
// Модуль управления операциями (добавление, редактирование,
// удаление, сортировка, расчет сумм)

import {
    formOperationDialog,
    operationType,
    operationForm,
    formInputRequired,
    categoryName,
    incomeAmountInput,
    incomeComment,
    incomeDate,
    expenseCategory,
    expenseAmountInput,
    expenseComment,
    expenseDate,
    handleSubmit,
    //selectedMonth,
    //operations,
    //operations,
    // expenseDate,
    // expenseAmount,
    //expenseDescription,
} from "../JS/app.js";

import { saveDataToStorage, getDataFromStorage } from "./storage.js";

import { refreshUI } from "./ui.js";

// Получаем массив операций из Local Storage
//const operations = getDataFromStorage();

export function addOperation(newOperation) {
    // Получаем текущие операции из Local Storage
    // let operations = JSON.parse(localStorage.getItem("operations")) || [];

    // // Добавляем новую операцию
    // operations.push(newOperation);

    // // Сохраняем обновлённый список операций в Local Storage
    // localStorage.setItem("operations", JSON.stringify(operations));
    //console.log(operations);
    // Обновляем отображение списка операций
    //renderOperations();
    const operations = getDataFromStorage();
    operations.push(newOperation);
    saveDataToStorage(operations);
}

//Удаляет расход по его идентификатору из Local Storage и обновляет список
export function deleteOperation(id) {
    // Получаем все операции из Local Storage
    // let operations = JSON.parse(localStorage.getItem("operations")) || [];

    // // Удаляем операцию по ID
    // operations = operations.filter((operation) => operation.id !== id);

    // // Сохраняем обновлённый список операций в Local Storage
    // localStorage.setItem("operations", JSON.stringify(operations));

    // Обновляем отображение списка операций
    //renderOperations();

    const operations = getDataFromStorage();

    // Фильтруем массив, исключаем элемент с соответствующим id
    const updatedOperations = operations.filter(
        (operation) => operation.id !== id
    );

    // Сохраняем обновленный массив обратно в Local Storage
    saveDataToStorage(updatedOperations);
    //console.log(updatedOperations);
    // Обновляем интерфейс
    //смотрим какой выбран месяц
    //const monthYear = selectedMonth.value;
    //console.log(monthYear);
    //сортируем массив
    //const sortedOperations = sortOperationsByMonthAndYear(monthYear);
    //console.log(sortedOperations);
    //выводим отсортированный массив в приложение
    //updateAndRenderOperations(sortedOperations);
    //calculatOperations(monthYear);
}

//Возвращает массив операций за выбранный месяц из Local Storage
export function sortOperationsByMonthAndYear(monthYear) {
    const operations = getDataFromStorage();

    if (monthYear) {
        const filteredOperations = operations.filter((operation) => {
            // Получаем месяц и год из даты расхода в формате "YYYY-MM-DD"
            // Берем первые 7 символов, т.е. "YYYY-MM"
            const operationMonthYear = operation.date.slice(0, 7);
            // Возвращаем только те расходы, у которых месяц и год совпадают с заданным
            return operationMonthYear === monthYear;
        });
        // Сортируем отфильтрованные расходы по дате
        const sortedOperations = filteredOperations.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortedOperations;
    } else {
        // Сортируем все расходы по дате
        const sortedOperations = operations.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortedOperations;
    }
}

//считаем сумму РАСХОДОВ/ДОХОДОВ за выбранный месяц
export function calculatOperations(monthYear) {
    //получили массив операций за нужный месяц
    const sortedOperations = sortOperationsByMonthAndYear(monthYear);

    //считаем сумму всех Доходов
    const totalIncome = sortedOperations
        .filter((operation) => operation.type === "Доходы") //отфильтровали массив по Расходам
        .reduce((sum, operation) => {
            const amount = parseFloat(operation.amount);
            return !isNaN(amount) ? sum + amount : sum;
        }, 0);

    //считаем сумму всех Расходов
    const totalExpenses = sortedOperations
        .filter((operation) => operation.type === "Расходы") //отфильтровали массив по Расходам
        .reduce((sum, operation) => {
            const amount = parseFloat(operation.amount);
            return !isNaN(amount) ? sum + amount : sum;
        }, 0);

    //TODO тут наверно надо вынести заполнение интерфейса в модуль UI?

    //выводим сумму доходов
    incomeAmount.textContent = totalIncome;

    //выводим сумму расходов
    expenseAmount.textContent = totalExpenses;

    //посчитали баланс
    balanceAmount.textContent = totalIncome - totalExpenses;
}

// Именованная функция для обработки отправки формы
// function handleFormSubmit(event, operationId) {
//     event.preventDefault();
//     // Удаляем операцию из LS
//     deleteOperation(operationId);

//     // Теперь вызываем handleSubmit для сохранения данных
//     handleSubmit(event);
// }

//Редактирует существующий расход в Local Storage, обновляя его поля
export function editOperation(id) {
    formOperationDialog.showModal(); //показываем окно
    operationForm.reset();
    const operations = getDataFromStorage();
    // Берем в массив только нужную операцию
    const updatedOperation = operations.find((operation) => operation.id == id);

    //в зависимости от типа операции, делаем видимыми нужные поля и заполняем их
    if (updatedOperation.type === "Доходы") {
        operationType.value = "income";
        formInputRequired();
        incomeAmountInput.value = updatedOperation.amount;
        incomeComment.value = updatedOperation.description;
        incomeDate.value = updatedOperation.date;
    } else {
        operationType.value = "expense";
        formInputRequired();
        expenseCategory.value = updatedOperation.category;
        expenseAmountInput.value = updatedOperation.amount;
        expenseComment.value = updatedOperation.description;
        expenseDate.value = updatedOperation.date;
    }
    if (!operationForm.hasAttribute("data-listener")) {
        operationForm.setAttribute("data-listener", "true");
        operationForm.addEventListener("submit", function hundler(event) {
            handleSubmit(event, id);
            operationForm.removeEventListener("submit", hundler);
        });
    }
    // Создаем обертку для передачи id в обработчик
    // const handleFormSubmitWrapper = (event) =>
    //     handleFormSubmit(event, updatedOperation.id);

    // //if (operationForm.hasAttribute("data-listener")) {
    // operationForm.removeEventListener("submit", handleFormSubmitWrapper);
    // //}

    // operationForm.addEventListener("submit", handleFormSubmitWrapper);

    // operationForm.setAttribute("data-listener", "true");

    // // Добавляем новый обработчик
    // operationForm.addEventListener("submit", (event) =>
    //     handleFormSubmit(event, updatedOperation.id)
    // ); // refreshUI();

    // let typeOperation = operationForm.querySelector("#operationType").value;
    // let newOperation = [];
    // //в зависимости от типа операции (Доход/Расход) создаем объект
    // //switch (typeOperation) {
    // //    case "expense":
    // if (typeOperation === "expense") {
    //     newOperation = {
    //         id: Date.now(), // Генерируем уникальный ID на основе текущего времени
    //         type: "Расходы",
    //         category: operationForm.querySelector("#expenseCategory").value,
    //         description: operationForm.querySelector("#expenseComment").value,
    //         date: operationForm.querySelector("#expenseDate").value,
    //         amount: operationForm.querySelector("#expenseAmountInput").value,
    //     };
    // }

    //saveDataToStorage(updatedOperation);
}
