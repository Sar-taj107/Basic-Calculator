const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const equal = document.querySelector(".equal");
const allBtn = document.querySelectorAll(".btn");
const backspaceButton = document.querySelector(".backspace");

allBtn.forEach((input) => {
  input.addEventListener("click", () => {
    if (
      (input.textContent === "0" || input.textContent === ".") &&
      result.value.length === 0
    ) {
      return;
    }
    result.value += input.textContent;
  });
});

equal.addEventListener("click", () => {
  if (result.value !== "") {
    result.value = eval(result.value);
  } else {
    alert("Enter valid input");
  }
});

clear.addEventListener("click", () => {
  result.value = "";
});

backspaceButton.addEventListener("click", () => {
  let currentValue = result.value;
  result.value = currentValue.slice(0, -1);
});

result.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && result.value !== "") {
    result.value = eval(result.value);
  }
});
