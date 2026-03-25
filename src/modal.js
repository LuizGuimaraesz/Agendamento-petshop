const modal_overlay = document.querySelector(".modal-overlay");
const new_schedule = document.querySelector("#new-schedule");

new_schedule.addEventListener("click", () => {
  modal_overlay.classList.remove("hidden");
});

modal_overlay.addEventListener("click", (e) => {
  if (e.target === modal_overlay) {
    modal_overlay.classList.add("hidden");
  }
});
