"use strict";
function getSortedArray(array, key) {
    for (let a = 0; a < array.length - 1; a++) {
      for (let b = 0; b < array.length - a - 1; b++) {
        if (array[b][key] > array[b + 1][key]) {
          let mas = array[b];
          array[b] = array[b + 1];
          array[b + 1] = mas;
        }
      }
    }
    return array;
}

let array = [{name: 'Макар', age: 20}, {name: 'Роберт', age: 32}, {name: 'Екатерина', age: 50}, {name: 'Оксана', age: 24}, {name: 'Святослав', age: 43}];
array = getSortedArray(array, 'age')
console.log(array);

// [{name: 'Макар', age: 20}, {name: 'Оксана', age: 24}, {name: 'Роберт', age: 32}, {name: 'Святослав', age: 43}, {name: 'Екатерина', age: 50}];