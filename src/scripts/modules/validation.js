import { tutorName, petName, telephone } from "./modal.js";

telephone.addEventListener("input", () => {
  let regex = telephone.value.replace(/\D/g, "");

  if (regex.length > 11) {
    regex = regex.slice(0, 11);
  }

  if (regex.length > 6) {
    regex = regex.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
  } else if (regex.length > 2) {
    regex = regex.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  }

  telephone.value = regex;
});

function onlyLetters(input) {
  input.addEventListener("input", () => {
    let regex = input.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
    input.value = regex;
  });
}

onlyLetters(tutorName);
onlyLetters(petName);
