import { getSchedules } from "./api.js";

async function loadSchedules() {
  const data = await getSchedules();

  const ul = document.querySelector(".morning .schedule-list");

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

    ul.append(li);
  });
}

loadSchedules();
