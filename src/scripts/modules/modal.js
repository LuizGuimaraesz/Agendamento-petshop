export const modal_overlay = document.querySelector(".modal-overlay");
const new_schedule = document.querySelector("#new-schedule");
const close_modal = document.querySelector(".modal-close");
const largeScreen = window.matchMedia("(min-width: 601px)");

export const dates = document.querySelectorAll(".date");
export const date1 = document.querySelectorAll(".date")[0];

//Variáveis do modal
export const tutorName = document.querySelector("#tutor-name");
export const petName = document.querySelector("#pet-name");
export const telephone = document.querySelector("#telephone");
export const service = document.querySelector("#service");
export const time = document.querySelector("#time");

export function cleanForm() {
  tutorName.value = "";
  petName.value = "";
  telephone.value = "";
  service.value = "";
  time.value = "";
}

export function openModal() {
  modal_overlay.classList.remove("hidden");
}

export function closeModal() {
  modal_overlay.classList.add("hidden");
}

new_schedule.addEventListener("click", () => {
  openModal();
});

close_modal.addEventListener("click", () => {
  closeModal();
});

modal_overlay.addEventListener("click", (e) => {
  if (e.target === modal_overlay && largeScreen.matches) {
    closeModal();
  }
});
