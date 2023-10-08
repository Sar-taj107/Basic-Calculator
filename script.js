
let result = document.querySelector(".result");
let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let allBtn = document.querySelectorAll(".btn");

/**
 * Validates and formats user input in an input field.
 * 
 * @param {Event} event - The user input event.
 */
function validateInput(event) {
    let inputValue = event.target.value;
    const operators = /[+\-*/^%]/;

    inputValue = inputValue.replace(/,/g, ".");
    inputValue = inputValue.replace(/[^0-9+\-*/.^%e]/g, "");

    // Validate that scientific notation is correct (e.g. 1e+10)
    if (/[e][+\-]?\d+$/.test(inputValue)) {
        const parts = inputValue.split(/[e]/);
        const mantissa = parts[0];
        const exponent = parts[1];
        if (/[+\-]/.test(exponent)) {
        // The exponent can have a "+" or "-" sign
        if (/[^0-9]/.test(exponent.slice(1))) {
            // If the exponent has characters other than numbers after the sign
            inputValue = mantissa + "e" + "0";
        }
        } else if (/[^\d]/.test(exponent)) {
        // If the exponent has characters that are not numbers
        inputValue = mantissa + "e" + "0";
        }
    }

    // Separate consecutive "e" characters with "*"
    inputValue = inputValue.replace(/e+/g, (match) => match.split("").join("*"));

    // Add a "0" before the first non-minus operator if the first character is an operator
    if (operators.test(inputValue[0]) && inputValue[0] !== "-") {
        inputValue = "0" + inputValue;
    }

    // Replace the last sign with a new one if another sign is added
    const lastChar = inputValue[inputValue.length - 2];
    if (operators.test(lastChar) && operators.test(event.data)) {
        inputValue = inputValue.slice(0, -2) + event.data;
    }

    // Ensure there's no more than one decimal point
    const decimalCount = inputValue.indexOf(".");
    if (decimalCount !== -1) {
        inputValue = inputValue.substring(0, decimalCount + 1) +
            inputValue.substring(decimalCount).replaceAll(".", "");
    }

    // Prevent consecutive operators
    inputValue = inputValue.replace(/([+\-*/^%]+)(?=[+\-*/^%])/g, "");

    result.value = inputValue;
}

result.addEventListener("input", validateInput);

allBtn.forEach(input => {
    input.addEventListener("click", () => {
        if ((input.textContent === `0` || input.textContent === `.`) && result.value.length === 0) {
            return
        }
        result.value += input.textContent;
        validateInput({ target: { value: result.value }, data: input.textContent });
    });
});

equal.addEventListener("click", () => {
    if (result.value !== "") {
        if(result.value.includes('^')){
            result.value = result.value.replace("^", "**");
        }
        result.value = eval(result.value);
    } else {
        alert("Enter valid input");
    }
});

clear.addEventListener("click", () => {
    result.value = "";
});

result.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && result.value !== "") {
        result.value = eval(result.value);
    }
});

// Add an event listener for the backspace button.
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => {
    if (result.value.length > 0) {
        result.value = result.value.slice(0, -1); // Remove the last character
    }
});
