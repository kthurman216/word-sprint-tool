let formatButtons = document.querySelectorAll(".format-button");
let advancedFormatOptions = document.querySelectorAll(".adv-format-opt");
let fontName = document.getElementById("font-name");
let fontSizeRef = document.getElementById("font-size");
let textArea = document.getElementById("text-input");
let alignButtons = document.querySelectorAll(".align"); //text align buttons, e.g. Center, Right, Left, Justify
let indentOptions = document.querySelectorAll(".indent"); //increase/decrease indent buttons
let styleButtons = document.querySelectorAll(".format"); //bold, italic, underline, strikthrough, etc
let scriptButtons = document.querySelectorAll(".script"); //subscript, superscript
let listButtons = document.querySelectorAll(".list"); //ordered list, unordered list

//font list
let fontList = ["Arial", "Verdana", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", 
"Courier New", "Brush Script MT"];

//initialize settings
const initializer = () => {
    //function calls to set up highlight for buttons that use it
    highlighter(alignButtons, true);
    highlighter(styleButtons, false);
    highlighter(scriptButtons, true);
    highlighter(indentOptions, true);
    highlighter(listButtons, true);

    //adds font from font list to font selector
    fontList.map(value => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //adds font sizes to size selector
    for (let i= 1; i<= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    //set default font size
    fontSizeRef.value = 3;
};


const modifyText = (command, defaultUI, value) => {
    document.execCommand(command, defaultUI, value);
};

formatButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedFormatOptions.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});


//highlight buttons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if(needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }

                highlightRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            }
            else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlightRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
}

window.onload = initializer();