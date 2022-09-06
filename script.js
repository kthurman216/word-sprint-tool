import Timer from "./Timer.js";

    new Timer(document.querySelector(".timer"));

/* WORD COUNTER/WORD GOAL FUNCTIONALITY */
let textArea = document.getElementById("text-input");

let wordCount = document.getElementById("word-count");
let wordGoal = document.getElementById("word-goal");
let colorChangeable = document.querySelectorAll(".color-changeable");
let closeWindow = document.getElementById("close-window");
let titleWindow = document.querySelector(".options");
let mainWindow = document.querySelector(".main-wrapper");
let clearText = document.getElementById("clear-text");

textArea.addEventListener("input", () => {
    let txt = textArea.innerText.trim();

    //word counter
    wordCount.textContent = txt.split(/\s+|[:,.?!()\[\]\{\}\<\>\']/).filter((item) => item).length;

    if (parseInt(wordCount.innerText) >= parseInt(wordGoal.innerText)) {
        colorChangeable.forEach((item) => {
            item.classList.add("achieved");
        });
    }
    if (parseInt(wordCount.innerText) < parseInt(wordGoal.innerText) || parseInt(wordGoal.innerText) == 0) {
        colorChangeable.forEach((item) => {
            item.classList.remove("achieved");
        });
    }
});

wordGoal.addEventListener("click", () => {
    wordGoal.innerText = "";
});

wordGoal.addEventListener("blur", () => {
    const containsNonDigit = /\D+|\s/.test(wordGoal.innerText);
    if (containsNonDigit || wordGoal.innerText == "") {
        wordGoal.innerText = "0";
    }

    if (parseInt(wordCount.innerText) >= parseInt(wordGoal.innerText)) {
        colorChangeable.forEach((item) => {
            item.classList.add("achieved");
        });
    }
    if (parseInt(wordCount.innerText) < parseInt(wordGoal.innerText) || parseInt(wordGoal.innerText) == 0) {
        colorChangeable.forEach((item) => {
            item.classList.remove("achieved");
        });
    }

});

closeWindow.addEventListener("click", () => {
    titleWindow.classList.add("hide");
    mainWindow.classList.remove("hide");
});

clearText.addEventListener("click", () => {
    if (confirm("Clear all written text?")) {
        textArea.innerText = "";
        wordCount.textContent = 0;
        colorChangeable.forEach((item) => {
            item.classList.remove("achieved");
        });
    }
});