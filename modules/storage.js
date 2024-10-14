//Storage.JS
// Модуль для работы с Local Storage

//import { expenses } from "../JS/app.js";

//Сохраняет данные в Local Storage по ключу
export function saveDataToStorage(operations) {
    localStorage.setItem("operations", JSON.stringify(operations));
}
//Получает данные из Local Storage по ключу
export function getDataFromStorage() {
    // Получаем данные из Local Storage в виде строки
    const operations = localStorage.getItem("operations");
    // Если данные есть, то парсим строку JSON обратно в массив, иначе возвращаем пустой массив
    return operations ? JSON.parse(operations) : [];
}
