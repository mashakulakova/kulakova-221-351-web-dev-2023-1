"use strict"
function cesar(str, shift, action) {
    const alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let char = str[i].toLowerCase();
        let isletter = alphabet.includes(char);
        if (!isletter) {
            result += char;
            continue;
      }
        let index = alphabet.indexOf(char);
        let newindex = 0;
        if (action === 'encode') 
        {
            newindex = (index + shift) % alphabet.length;
        } 
        else if (action === 'decode') 
        {
            newindex = (index - shift + alphabet.length) % alphabet.length;
        }
        result += alphabet[newindex];
    }
    return result;
}
let encryptedMessage = "эзтыхз фзъзъз";
let decryptedMessage = cesar(encryptedMessage, 8, 'decode');
console.log(decryptedMessage); // Ответ: хакуна матата, ключ 8.