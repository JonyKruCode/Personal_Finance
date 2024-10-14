//UI.js
//Модуль управления пользовательским интерфейсом

import {
    deleteOperation,
    calculatOperations,
    sortOperationsByMonthAndYear,
} from "./operationsManager.js";

// import { editExpense, deleteExpense } from "./expenseManager.js";

import {
    incomeAmount,
    expenseAmount,
    balanceAmount,
    //operations,
    operationsList,
    selectedMonth,
    //expenseItem,
    //totalExpenses,
} from "../JS/app.js";

export function refreshUI() {
    const monthYear = selectedMonth.value;
    const sortedOperations = sortOperationsByMonthAndYear(monthYear);
    updateAndRenderOperations(sortedOperations);
    calculatOperations(monthYear);
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
                <button class="edit-operation">Редактировать</button>
                <button class="delete-operation">Удалить</button>
            </div>
        `;
        // Обработка события редактирования расхода
        // const editButton = li.querySelector(".edit-operation");
        // editButton.addEventListener("click", () => editExpense(expense.id));
        //Обработка события удаления расхода
        const deleteButton = li.querySelector(".delete-operation");
        deleteButton.addEventListener("click", () => {
            deleteOperation(operation.id);
            //считаем сумму расходов и выводим
            //totalExpenses.innerText = getTotalExpensesForMonth(monthYear);
            // const monthYear = selectedMonth.value;
            // console.log(monthYear);
            // calculatOperations(monthYear);
            // const monthYear = selectedMonth.value;
            // //console.log(monthYear);
            // const sortedOperations = sortOperationsByMonthAndYear(monthYear);
            // //console.log(sortedOperations);
            // updateAndRenderOperations(sortedOperations);
            // calculatOperations(monthYear);
            refreshUI();
        });

        // Добавляем расход в список
        operationsList.appendChild(li);
    });
}
