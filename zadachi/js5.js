"use strict"
function fibb(n) {
    if n (n == 0) {
        return 0;
}
if (n == 1) {
    return 1;
}
if (n > 1000) {
    return "Ошибка"
}
let num1 = 0;
let num2 = 1;
let numN = 0;
for (let i = 2; i <= n; i++){
    numN = num1 + num2;
    num1 = num2;
    num2 = numN;
}
return numN;
}
let n = prompt("Введите число N");
alert (`${n}-е число в последовательности Фибонасчи = ${fibb(n)}`)