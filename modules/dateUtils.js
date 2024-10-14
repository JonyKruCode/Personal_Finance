//dateUtils.js
//Модуль работы с датами

//Возвращает текущий месяц в формате YYYY-MM
export function getCurrentMonth() {
    const today = new Date(); //текущее дата и время
    const year = today.getFullYear(); //извлекаем год
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    //извлекаем месяц, так как метод возвращ знач от 0 до 11 то +1
    //padStart добавляет 0 вначале, если число из 1 знака
    //console.log(`${year}-${month}`);

    return `${year}-${month}`;
    //return `${month}`;
}

//Форматирует объект даты в строку
//на входе YYYY-MM на выходе "Сентябрь 2024"
export function formatMonth(date) {
    // Проверяем правильный ли формат даты "YYYY-MM"
    const dateParts = date.split("-"); // Разделяем строку на год и месяц
    if (dateParts.length !== 2 || isNaN(dateParts[0]) || isNaN(dateParts[1])) {
        throw new Error('Неверный формат даты. Ожидается "YYYY-MM".');
    }
    const yearFormat = dateParts[0]; // Получаем год
    const monthFormat = parseInt(dateParts[1], 10) - 1; // Преобразуем месяц в число (минус 1, т.к. месяцы идут с 0)

    // Список полных названий месяцев на русском языке
    const monthNames = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь",
    ];

    // Проверяем корректность месяца
    if (monthFormat < 0 || monthFormat > 11) {
        throw new Error("Неверное значение месяца.");
    }

    // Возвращаем строку в формате "MMMM YYYY"
    return `${monthNames[monthFormat]} ${yearFormat}`;
}
