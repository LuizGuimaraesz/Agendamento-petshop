import { getSchedules, newSchedule, deleteSchedule } from "./api.js";
import {
  date1,
  dates,
  closeModal,
  cleanForm,
  tutorName,
  petName,
  telephone,
  service,
  time,
} from "./modal.js";

const form = document.querySelector(".modal-form");
const modalDate = dates[1];
const validWindowsMessage =
  "Escolha um horario entre 09:00 e 12:00, 13:00 e 18:00 ou 19:00 e 21:00.";

const fields = {
  tutorName,
  petName,
  telephone,
  service,
  date: modalDate,
  time,
};

date1.addEventListener("change", loadSchedules);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors();

  const scheduleData = getFormData();
  const schedules = await getSchedules();

  if (!validateSchedule(scheduleData, schedules)) {
    return;
  }

  const createdSchedule = await newSchedule(scheduleData);

  if (!createdSchedule) {
    return;
  }

  cleanForm();
  closeModal();

  date1.value = createdSchedule.date;
  modalDate.value = createdSchedule.date;
  await loadSchedules();
});

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("schedule-remove")) {
    const deleted = await deleteSchedule(e.target.dataset.id);

    if (deleted) {
      e.target.closest(".schedule-item").remove();
    }
  }
});

Object.values(fields).forEach((field) => {
  field.addEventListener("input", () => {
    clearFieldError(field);
  });
});

async function loadSchedules() {
  const data = await getSchedules();

  const ulMorning = document.querySelector(".morning .schedule-list");
  const ulAfternoon = document.querySelector(".afternoon .schedule-list");
  const ulEvening = document.querySelector(".evening .schedule-list");

  ulMorning.innerHTML = "";
  ulAfternoon.innerHTML = "";
  ulEvening.innerHTML = "";

  data
    .filter((schedule) => schedule.date === date1.value)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
    .forEach((schedule) => {
      const period = getPeriod(schedule.time);

      if (!period) {
        return;
      }

      const li = createScheduleItem(schedule);

      if (period === "morning") {
        ulMorning.appendChild(li);
      } else if (period === "afternoon") {
        ulAfternoon.appendChild(li);
      } else {
        ulEvening.appendChild(li);
      }
    });
}

function createScheduleItem(schedule) {
  const li = document.createElement("li");
  li.classList.add("schedule-item");

  const scheduleInfo = document.createElement("div");
  scheduleInfo.classList.add("schedule-info");

  const scheduleHour = document.createElement("span");
  scheduleHour.classList.add("schedule-hour");
  scheduleHour.textContent = schedule.time;

  const scheduleClient = document.createElement("div");
  scheduleClient.classList.add("schedule-client");

  const petNameElement = document.createElement("strong");
  petNameElement.textContent = schedule.petName;

  const tutorNameElement = document.createElement("span");
  tutorNameElement.textContent = ` / ${schedule.tutorName}`;

  scheduleClient.append(petNameElement, tutorNameElement);
  scheduleInfo.append(scheduleHour, scheduleClient);

  const serviceElement = document.createElement("span");
  serviceElement.classList.add("schedule-service");
  serviceElement.textContent = schedule.service;

  const removeButton = document.createElement("button");
  removeButton.classList.add("schedule-remove");
  removeButton.textContent = "Remover agendamento";
  removeButton.dataset.id = schedule.id;

  li.append(scheduleInfo, serviceElement, removeButton);

  return li;
}

function getFormData() {
  return {
    tutorName: tutorName.value.trim(),
    petName: petName.value.trim(),
    telephone: telephone.value.replace(/\D/g, ""),
    service: service.value.trim(),
    date: modalDate.value,
    time: time.value,
  };
}

function validateSchedule(scheduleData, schedules) {
  let isValid = true;

  if (!scheduleData.tutorName) {
    setFieldError(fields.tutorName, "Informe o nome do tutor.");
    isValid = false;
  }

  if (!scheduleData.petName) {
    setFieldError(fields.petName, "Informe o nome do pet.");
    isValid = false;
  }

  if (!scheduleData.telephone) {
    setFieldError(fields.telephone, "Informe o telefone.");
    isValid = false;
  } else if (scheduleData.telephone.length < 10) {
    setFieldError(fields.telephone, "Informe um telefone com DDD.");
    isValid = false;
  }

  if (!scheduleData.service) {
    setFieldError(fields.service, "Descreva o servico.");
    isValid = false;
  }

  if (!scheduleData.date) {
    setFieldError(fields.date, "Escolha uma data.");
    isValid = false;
  }

  if (!scheduleData.time) {
    setFieldError(fields.time, "Escolha um horario.");
    isValid = false;
  } else if (!getPeriod(scheduleData.time)) {
    setFieldError(fields.time, validWindowsMessage);
    isValid = false;
  }

  const hasConflict = schedules.some(
    (schedule) =>
      schedule.date === scheduleData.date && schedule.time === scheduleData.time,
  );

  if (hasConflict) {
    setFieldError(fields.time, "Ja existe um agendamento nessa data e horario.");
    isValid = false;
  }

  return isValid;
}

function setFieldError(field, message) {
  const fieldGroup = field.closest(".modal-form-group, .group-service");
  let error = fieldGroup.querySelector(".field-error");

  if (!error) {
    error = document.createElement("span");
    error.classList.add("field-error");
    fieldGroup.appendChild(error);
  }

  field.classList.add("input-error");
  error.textContent = message;
}

function clearFieldError(field) {
  const fieldGroup = field.closest(".modal-form-group, .group-service");
  const error = fieldGroup.querySelector(".field-error");

  field.classList.remove("input-error");

  if (error) {
    error.remove();
  }
}

function clearErrors() {
  Object.values(fields).forEach(clearFieldError);
}

function getPeriod(time) {
  const minutes = timeToMinutes(time);

  if (minutes >= timeToMinutes("09:00") && minutes <= timeToMinutes("12:00")) {
    return "morning";
  }

  if (minutes >= timeToMinutes("13:00") && minutes <= timeToMinutes("18:00")) {
    return "afternoon";
  }

  if (minutes >= timeToMinutes("19:00") && minutes <= timeToMinutes("21:00")) {
    return "evening";
  }

  return null;
}

function timeToMinutes(time) {
  if (!time) {
    return Number.NaN;
  }

  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

loadSchedules();
