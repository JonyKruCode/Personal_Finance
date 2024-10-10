// Модуль управления расходами (добавление, редактирование, удаление)

// import {
//     //month,
//     operations,
//     // expenseDate,
//     // expenseAmount,
//     //expenseDescription,
// } from "../JS/app.js";
// import { saveDataToStorage, getDataFromStorage } from "./storage.js";
// import { updateAndRenderOperations } from "./ui.js";

//Возвращает массив расходов за выбранный месяц из Local Storage
export function sortOperationsByMonthAndYear(operations, monthYear) {
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
        //console.log(sortedExpenses);
        return sortedOperations;
    } else {
        // Сортируем все расходы по дате
        const sortedOperations = operations.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );
        return sortedOperations;
    }
}

// //Удаляет расход по его идентификатору из Local Storage и обновляет список
// export function deleteExpense(id) {
//     // Получаем текущий массив расходов из Local Storage
//     //const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
//     const expenses = getDataFromStorage();
//     // Фильтруем массив, удаляя элемент с соответствующим id
//     const updatedExpenses = expenses.filter((expense) => expense.id !== id);

//     // Сохраняем обновленный массив обратно в Local Storage
//     //localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
//     saveDataToStorage(updatedExpenses);
//     // Обновляем интерфейс
//     //смотрим какой выбран месяц
//     const monthYear = month.value;
//     //сортируем массив
//     const sortedExpenses = sortExpensesByMonthAndYear(
//         updatedExpenses,
//         monthYear
//     );
//     //выводим отсортированный массив в приложение
//     updateAndRenderExpenses(sortedExpenses);
// }

// //Редактирует существующий расход в Local Storage, обновляя его поля
// export function editExpense(id, updatedExpense) {}
