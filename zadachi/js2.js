"use strict";
function gcd(a, b) {
    if (a > b) {
        let rem = a % b;
        a = b;
        b = rem;
    }
    return a;
}
else {
    while (a != 0) {
        let rem = b % a;
        b = a;
        a = rem;
    }
    return b;
}
let a = prompt("Введите число a:");
let b = prompt("Введите число b:");
alert(`Наибольший общий делитель чисел ${a} и ${b} = ${gcd(a, b)}`);