"use strict";
function pow(x, n) {
    if (n == 0) {
        return 1;
    }
    let result = x;
    for (let i = 1; i < n; i++) {
        result *= x;
    }
    return result;
}
let x = prompt("Введите число x");
let n = prompt("Введите степень n");
alert(`Число ${x} в степени ${n} = ${pow(x, n)}`);