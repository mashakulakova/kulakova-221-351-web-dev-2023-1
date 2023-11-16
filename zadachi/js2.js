'use strict';
function gcd(z, x) {
    if (z < 0 || x < 0) {
        return "Ошибка. Число n должно быть натуральным";
    }
    if (z > x) {
        while (x !== 0) {
            let rem = z % x;
            z = x;
            x = rem;
        }
        return z;
    } else {
        while (z !== 0) {
            let rem = x % z;
            x = z;
            z = rem;
        }
        return x;
    }
}

let z = prompt("Введите число z:");
let x = prompt("Введите число x:");
alert(`Наибольший общий делитель чисел ${z} и ${x} = ${gcd(z, x)}`);