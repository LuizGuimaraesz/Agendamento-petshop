const close_modal = document.querySelector(".close-modal");
const modal_overlay = document.querySelector(".modal-overlay");
const new_schedule = document.querySelector("#new-schedule");

new_schedule.addEventListener("click", () => {
  modal_overlay.classList.remove("hidden");
});

close_modal.addEventListener("click", () => {
  modal_overlay.classList.add("hidden");
});
