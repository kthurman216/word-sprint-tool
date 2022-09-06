import Timer from "./Timer.js";

    new Timer(document.querySelector(".timer"));

/* WORD COUNTER/WORD GOAL FUNCTIONALITY */
let textArea = document.getElementById("text-input");

let wordCount = document.getElementById("word-count");
let wordGoal = document.getElementById("word-goal");
let colorChangeable = document.querySelectorAll(".color-changeable");

textArea.addEventListener("input", () => {
    let txt = textArea.innerText.trim();

    //word counter
    wordCount.textContent = txt.split(/\s+|[,.?!]/).filter((item) => item).length;

    if (parseInt(wordCount.innerText) >= parseInt(wordGoal.innerText)) {
        colorChangeable.forEach((item) => {
            item.classList.add("achieved");
        });
    }
    if (parseInt(wordCount.innerText) < parseInt(wordGoal.innerText)) {
        colorChangeable.forEach((item) => {
            item.classList.remove("achieved");
        });
    }
});

wordGoal.addEventListener("click", () => {
    wordGoal.innerText = "";
});

wordGoal.addEventListener("blur", () => {
    const containsNonDigit = /\D+/.test(wordGoal.innerText);
    if (containsNonDigit) {
        wordGoal.innerText = "0";
    }

});
