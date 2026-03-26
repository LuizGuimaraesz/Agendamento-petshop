import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

// define idioma
dayjs.locale(ptBR);

// pega o input principal
const date = document.querySelector("#date");

// define data atual
date.value = dayjs().format("YYYY-MM-DD");
