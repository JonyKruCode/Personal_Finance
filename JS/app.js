//Экспорт функций из модулей

import { getCurrentMonth, formatMonth } from "../modules/dateUtils.js";

import { getDataFromStorage, saveDataToStorage } from "../modules/storage.js";

import {
    calculatOperations,
    updateAndRenderOperations,
} from "../modules/ui.js";

import {
    sortOperationsByMonthAndYear,
    // deleteExpense,
    // editExpense,
} from "../modules/expenseManager.js";

// DOM элементы
export const welcomeDialog = document.getElementById("welcomeDialog");

//Выбор месяца, года и кнопка Все расходы
//export const btnPrevMonth = document.getElementById("prevMonth");
export const selectedMonth = document.getElementById("selectedMonth");
//export const btnNextMonth = document.getElementById("nextMonth");
export const btnShowAllOperations = document.getElementById(
    "show-all-operations"
);

//Баланс, Доход, Расход
export const balanceAmount = document.getElementById("balanceAmount");
export const incomeAmount = document.getElementById("incomeAmount");
export const expenseAmount = document.getElementById("expenseAmount");

//Кнопка "Добавить операцию"
export const btnAddOperation = document.getElementById("addOperation");

//Список операций
export const operationsList = document.getElementById("operationsList");
export const selectedMonthText = document.getElementById("current-month");

//Расходы по категориям
export const categoriesList = document.getElementById("categoriesList");
export const btnAddCategory = document.getElementById("addCategory");

//Всплывающее окно для добавления/редактирования операции
export const formOperationDialog = document.getElementById("operationDialog");
export const operationType = document.getElementById("operationType");

//Доходы
export const incomeFields = document.getElementById("incomeFields");
export const incomeAmountInput = document.getElementById("incomeAmountInput");
export const incomeComment = document.getElementById("incomeComment");
export const incomeDate = document.getElementById("incomeDate");

//Расходы
export const expenseFields = document.getElementById("expenseFields");
export const expenseCategory = document.getElementById("expenseCategory");
export const expenseAmountInput = document.getElementById("expenseAmountInput");
export const expenseComment = document.getElementById("expenseComment");
export const expenseDate = document.getElementById("expenseDate");

//Всплывающее окно для добавления/редактирования категории
export const formCategoryDialog = document.getElementById("categoryDialog");
export const operationForm = document.getElementById("operationForm");
export const categoryName = document.getElementById("categoryName");
export const categoryBudget = document.getElementById("categoryBudget");

//Всплывающее окно приветствия
export const formWelcomeDialog = document.getElementById("welcomeDialog");

//приветственное окно
//welcomeDialog.showModal();

//localStorage.clear();
//Массив для хранения расходов
export let operations = getDataFromStorage();

//Отображаем расходы при загрузке приложения
let currentMonth = getCurrentMonth(); //получаем текущий месяц

selectedMonth.value = currentMonth; //записываем его в поле
let currentMonthOperations = sortOperationsByMonthAndYear(
    operations,
    currentMonth
);
updateAndRenderOperations(currentMonthOperations);
//считаем баланс, сумму расходов/доходов и выводим на экран
calculatOperations(currentMonth);

//Нажатие кнопки "Показать все операции"
btnShowAllOperations.addEventListener("click", () => {
    //updateAndRenderExpenses(expenses);
    selectedMonthText.innerText = "за всё время";
    selectedMonth.value = "";
    //сортируем массив
    const monthYear = selectedMonth.value;
    const sortedOperations = sortOperationsByMonthAndYear(
        operations,
        monthYear
    );
    //выводим отсортированный массив в приложение
    updateAndRenderOperations(sortedOperations);
    //считаем баланс, сумму расходов/доходов и выводим на экран
    calculatOperations(monthYear);
});

//Мониторинг изменения месяца
selectedMonth.addEventListener("change", () => {
    const monthYear = selectedMonth.value;
    //обновляем в заголовке "Список операций за ..." название месяца
    selectedMonthText.innerText = formatMonth(monthYear);
    //сортировка и обновление экрана
    const sortedOperations = sortOperationsByMonthAndYear(
        operations,
        monthYear
    );
    updateAndRenderOperations(sortedOperations);
    //считаем баланс, сумму расходов/доходов и выводим на экран
    calculatOperations(monthYear);
});

//мониторинг нажатия кнопки "Добавить операцию"
btnAddOperation.addEventListener("click", () => {
    formOperationDialog.showModal(); //показываем окно
    operationForm.reset(); //очищаем поля формы
    formInputRequired(); //и делаем видимыми нужные поля и делаем их required
});

//мониторим Сохранение формы
operationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //создаем объект operation
    let typeOperation = operationForm.querySelector("#operationType").value;
    let operation;
    //в зависимости от типа операции (Доход/Расход) создаем объект
    switch (typeOperation) {
        case "expense":
            operation = {
                id: Date.now(),
                //type: operationForm.querySelector("#operationType").value,
                type: "Расходы",

                category: operationForm.querySelector("#expenseCategory").value,
                description:
                    operationForm.querySelector("#expenseComment").value,
                date: operationForm.querySelector("#expenseDate").value,
                amount: operationForm.querySelector("#expenseAmountInput")
                    .value,
            };
            break;
        case "income": {
            operation = {
                id: Date.now(), // Генерируем уникальный ID на основе текущего времени
                //type: operationForm.querySelector("#operationType").value,
                type: "Доходы",
                category: "",
                description:
                    operationForm.querySelector("#incomeComment").value,
                date: operationForm.querySelector("#incomeDate").value,
                amount: operationForm.querySelector("#incomeAmountInput").value,
            };
            break;
        }
    }
    //console.log(operation);
    //и добавлем этот объект в наш массив расходов
    operations.push(operation);
    //console.log(operations);

    //далее сохраняем его в LS
    saveDataToStorage(operations);
    //operationForm.reset(); //очищаем поля формы
    formOperationDialog.close(); //закрываем окно
    //formInputRequired(); //отрисовываем форму в зависимости от значение типа операции
    //Обновляем интерфейс
    const monthYear = selectedMonth.value;
    //сортируем массив
    const sortedOperations = sortOperationsByMonthAndYear(
        operations,
        monthYear
    );
    //выводим отсортированный массив в приложение
    updateAndRenderOperations(sortedOperations);
    //считаем баланс, сумму расходов/доходов и выводим на экран
    calculatOperations(monthYear);
});

//делаем видимыми поля в зависимости от типа операции и делаем их required
function formInputRequired() {
    if (operationType.value === "income") {
        //formOperationDialog.showModal();
        incomeFields.style.display = "block";
        expenseFields.style.display = "none";
        //делаем активные поля обязательными к заполнению
        incomeAmountInput.setAttribute("required", "true");
        incomeComment.setAttribute("required", "true");
        incomeDate.setAttribute("required", "true");
        //делаем не активные поля не обязательными к заполнению
        expenseAmountInput.removeAttribute("required");
        expenseComment.removeAttribute("required");
        expenseDate.removeAttribute("required");
    } else if (operationType.value === "expense") {
        //formOperationDialog.showModal();
        incomeFields.style.display = "none";
        expenseFields.style.display = "block";
        //делаем активные поля обязательными к заполнению
        expenseAmountInput.setAttribute("required", "true");
        expenseComment.setAttribute("required", "true");
        expenseDate.setAttribute("required", "true");
        //делаем не активные поля не обязательными к заполнению
        incomeAmountInput.removeAttribute("required");
        incomeComment.removeAttribute("required");
        incomeDate.removeAttribute("required");
    }
}
//при нажатии на "Отмена" закроется окно добавления операции
closeDialog.addEventListener("click", () => {
    operationForm.reset(); //очистим поля формы
    formOperationDialog.close(); //закроем форму
});

//отслеживаем изменение категории операции и меняем отображение полей
operationType.addEventListener("change", () => {
    formInputRequired(); //делаем видимыми нужные поля и делаем их required
});
