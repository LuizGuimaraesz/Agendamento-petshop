import dayjs from "dayjs";

const date = document.querySelector("#date");
const modalDate = document.querySelector("#modal-date");
const currentDate = dayjs().format("YYYY-MM-DD");

modalDate.value = currentDate;
modalDate.min = currentDate;
date.value = currentDate;
date.min = currentDate;
