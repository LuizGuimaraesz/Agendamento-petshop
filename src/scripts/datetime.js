import dayjs from "dayjs";

const arrows = document.querySelectorAll(".arrow");
const date = document.querySelectorAll(".date");
const currentDate = dayjs().format("YYYY-MM-DD");

date.forEach((input) => {
  input.value = currentDate;
  input.min = currentDate;
});

arrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    const input = arrow.parentElement.querySelector("input");

    if (input.showPicker) {
      input.showPicker();
    }
  });
});
