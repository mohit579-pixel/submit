let isClicked = false;
const resetBtn = document.getElementById("resetBtn");
const output = document.getElementById("output");
const submitBtn = document.getElementById("submitBtn");
const inpBox = document.getElementById("nameInput");
const dateBox = document.getElementById("dateInput");
const mainCont = document.getElementsByClassName("main-container")[0];
output.style.display = "none";

submitBtn.addEventListener('click', () => {
    if (isClicked) {
        alert("Please reset the calculator");
        return;
    }
    isClicked = true;
    calculateNumerology(inpBox.value);
    displayDate(dateBox.value);
    output.style.display = 'block';
    mainCont.style.minHeight = "100vh";
});

resetBtn.addEventListener('click', () => {
    isClicked = false;
    inpBox.value = "";
    dateBox.value = "";
    output.style.display = 'none'; // Hide the output container
});

function calculateNumerology(input) {
    const name = input.toUpperCase();
    const letterValues = {
        A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
        J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
        S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
    };

    const numbersArray = name.split('').map(letter => letterValues[letter] || 0);

    const expressionNumber = calculateSingleDigit(numbersArray.reduce((acc, num) => acc + num, 0));

    const vowelNumber = name.split('').filter(letter => 'AEIOU'.includes(letter)).reduce((acc, letter) => acc + letterValues[letter], 0);
    const soulNumber = calculateSingleDigit(vowelNumber);

    const personalityNumber = calculateSingleDigit(numbersArray.filter(num => !['A', 'E', 'I', 'O', 'U'].includes(Object.keys(letterValues).find(key => letterValues[key] === num))).reduce((acc, num) => acc + num, 0));

    document.getElementById('expressionNumber').innerHTML = `<strong><p>Expression Number: ${expressionNumber}</p></strong>`;
    document.getElementById('soulNumber').innerHTML = `<strong><p>Soul Number: ${soulNumber}</p></strong>`;
    document.getElementById('personalityNumber').innerHTML = `<strong><p">Personality Number: ${personalityNumber}</p></strong>`;
}

function calculateSingleDigit(number) {
    while (number > 9) {
        number = Array.from(String(number), Number).reduce((acc, num) => acc + num, 0);
    }
    return number;
}

function displayDate(inputDate) {
    let sum = 0;
    let newSum = 0;

    var dateWithoutHyphens = inputDate.replace(/-/g, '');

    var singleNumbersArray = dateWithoutHyphens.split('').map(Number);

    for (let i = 0; i < singleNumbersArray.length; i++) {
        sum += singleNumbersArray[i];
    }

    newSum = sum;

    while (newSum > 9) {
        let tempSum = 0;

        while (newSum > 0) {
            tempSum += newSum % 10;
            newSum = Math.floor(newSum / 10);
        }

        newSum = tempSum;
    }

    document.getElementById('whatdate').innerHTML = "<p >This is the date you are checking:<b> " + inputDate + "</b> and this is sum of all the numbers <b>" + sum +
        " </b>and finally this is your <b> life number " + newSum + ".</b></p>";
}
