import { getSchedules, newSchedule } from "./api.js";
import { modal_overlay } from "./modal.js";

const form = document.querySelector(".modal-form");

async function loadSchedules() {
  const data = await getSchedules();

  const ulMorning = document.querySelector(".morning .schedule-list");
  const ulAfternoon = document.querySelector(".afternoon .schedule-list");
  const ulEvening = document.querySelector(".evening .schedule-list");

  ulMorning.innerHTML = "";
  ulAfternoon.innerHTML = "";
  ulEvening.innerHTML = "";

  data.forEach((schedule) => {
    // li
    const li = document.createElement("li");
    li.classList.add("schedule-item");

    // div schedule-info
    const scheduleInfo = document.createElement("div");
    scheduleInfo.classList.add("schedule-info");

    // span hora
    const scheduleHour = document.createElement("span");
    scheduleHour.classList.add("schedule-hour");
    scheduleHour.textContent = schedule.time;

    // div cliente
    const scheduleClient = document.createElement("div");
    scheduleClient.classList.add("schedule-client");

    // strong nome do pet
    const petName = document.createElement("strong");
    petName.textContent = schedule.petName;

    // span tutor
    const tutorName = document.createElement("span");
    tutorName.textContent = ` / ${schedule.tutorName}`;

    // montar cliente
    scheduleClient.append(petName, tutorName);

    // montar info
    scheduleInfo.append(scheduleHour, scheduleClient);

    // span serviço
    const service = document.createElement("span");
    service.classList.add("schedule-service");
    service.textContent = schedule.service;

    // botão remover
    const removeButton = document.createElement("button");
    removeButton.classList.add("schedule-remove");
    removeButton.textContent = "Remover agendamento";

    // montar li
    li.append(scheduleInfo, service, removeButton);

    // adicionar li na ul correta

    const scheduleTime = timeToNumber(schedule.time);

    if (scheduleTime >= 9 && scheduleTime <= 12) {
      ulMorning.appendChild(li);
    } else if (scheduleTime > 12 && scheduleTime <= 18) {
      ulAfternoon.appendChild(li);
    } else if (scheduleTime >= 19 && scheduleTime <= 21) {
      ulEvening.appendChild(li);
    }
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await newSchedule();

  modal_overlay.classList.add("hidden");
  loadSchedules();
});

function timeToNumber(time) {
  return Number(time.split(":")[0]);
}

loadSchedules();
