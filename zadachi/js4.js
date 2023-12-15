'use strict';
function pluralizeRecords(n) {
    let records;
    if ((n % 10 === 1) && (n % 100 !== 11)) {
        records = 'запись';
    } else if (
        (n % 10 >= 2 && n % 10 <= 4) &&
        (n % 100 < 10 || n % 100 >= 20)
    ) {
        records = 'записи';
    } else {
        records = 'записей';
    }
    return records;
}
const n = prompt('Введите число n');
alert(
    `В результате выполнения запроса было найдено ${n} ${pluralizeRecords(n)}`
);