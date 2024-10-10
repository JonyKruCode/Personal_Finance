//Модуль управления пользовательским интерфейсом

import { sortOperationsByMonthAndYear } from "../modules/expenseManager.js";

// import { editExpense, deleteExpense } from "./expenseManager.js";

import {
    incomeAmount,
    expenseAmount,
    balanceAmount,
    operations,
    operationsList,
    selectedMonth,
    //expenseItem,
    //totalExpenses,
} from "../JS/app.js";

//считаем сумму РАСХОДОВ/ДОХОДОВ за выбранный месяц
export function calculatOperations(monthYear) {
    //получили массив операций за нужный месяц
    const sortedOperations = sortOperationsByMonthAndYear(
        operations,
        monthYear
    );
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

    //выводим сумму доходов
    incomeAmount.textContent = totalIncome;

    //выводим сумму расходов
    expenseAmount.textContent = totalExpenses;

    //посчитали баланс
    balanceAmount.textContent = totalIncome - totalExpenses;
}
//Обновляет список операций и отображает их на странице
//добавляет обработчики для их удаления и редактирования
export function updateAndRenderOperations(operations) {
    //Очищаем список операций перед обновлением
    operationsList.innerHTML = "";

    //выполняем для каждого элемента массива операций
    operations.forEach((operation) => {
        //создаем новый HTML-тег <li> в index.html
        const li = document.createElement("li");
        //и записываем в него следующий текст
        li.innerHTML = `
            <span>${operation.type} ${operation.amount} ${operation.category}  ${operation.description} ${operation.date}</span>
            <div class="operations-actions">
                <button class="edit-expense">Редактировать</button>
                <button class="delete-expense">Удалить</button>
            </div>
        `;
        // Обработка события редактирования расхода
        // const editButton = li.querySelector(".edit-expense");
        // editButton.addEventListener("click", () => editExpense(expense.id));
        // Обработка события удаления расхода
        // const deleteButton = li.querySelector(".delete-expense");
        // deleteButton.addEventListener("click", () => {
        //     deleteExpense(expense.id);
        //     //считаем сумму расходов и выводим
        //     totalExpenses.innerText = getTotalExpensesForMonth(monthYear);
        //     console.log(totalExpenses.innerText);
        // });

        // Добавляем расход в список
        operationsList.appendChild(li);
    });
}
