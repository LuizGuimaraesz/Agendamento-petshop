import dayjs from "dayjs";
import { dates } from "./modal.js";

const arrows = document.querySelectorAll(".arrow");
const currentDate = dayjs().format("YYYY-MM-DD");

export const hours = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

dates.forEach((input) => {
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
