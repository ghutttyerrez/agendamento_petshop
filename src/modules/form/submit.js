import dayjs, { Dayjs } from "dayjs";

const form = document.querySelector("form");

//função que carrega a data atual no campo de data e coloca como mínimo a data atual
export function loadCurrentDate() {
  const selectAllDate = document.querySelectorAll("input[type='date']");
  const currentDate = dayjs(new Date()).format("YYYY-MM-DD");
  selectAllDate.forEach((input) => {
    input.value = currentDate;
    input.min = currentDate;
  });
}

form.onsubmit = function (event) {
  event.preventDefault();
};
