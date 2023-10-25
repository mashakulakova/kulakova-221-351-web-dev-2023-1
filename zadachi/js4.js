"use strict"
function pluralizeRecords(n) {
    let word = "записей";
    if (n % 10 == 1 && n % 100 != 11) {
      word = "запись";
    } else if ((n % 10 >= 2 && n % 10 <= 4) && (n % 100 < 10 || n % 100 >= 20)) {
      word = "записи";
    }
    else {
        word = "записей";
    }
    return word;
}
let n = prompt("Введите число n");
alert(`В результате выполнения запроса было найдено ${n} ${pluralizeRecords(n)}`);