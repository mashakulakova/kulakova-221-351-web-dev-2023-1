'use strict';
function miniDigit(z) {
    if ((z | 0) != z || z <= 0) {
        return "Ошибка. Число z должно быть натуральным";
    }     
    let minNum = 9;
    let newZ = z;
    while (newZ !== 0) {
        let rem = newZ % 10;
        if (rem < minNum) {
            minNum = rem;
        }
        let remm = newZ % 10;
        newZ = (newZ - remm) / 10;
    }  
    return minNum;
}

let z = prompt("Введите число z");
alert(`Минимальная цифра числа ${z} = ${miniDigit(z)}`);