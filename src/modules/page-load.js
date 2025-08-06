import { fetchSchedule } from "../services/schedule/fetch-schedule.js";
import dayjs from "dayjs";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Página carregada - iniciando busca de agendamentos");

  // Obtém a data atual formatada
  const today = dayjs().format("YYYY-MM-DD");

  // Busca os agendamentos do dia atual
  try {
    await fetchSchedule({ dateTime: today });
    console.log("Agendamentos do dia carregados com sucesso");
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
});

// Se você tiver um campo de data para filtrar agendamentos, adicione este listener
const dateInput = document.querySelector("input[type='date']");
if (dateInput) {
  dateInput.addEventListener("change", async (event) => {
    const selectedDate = event.target.value;
    console.log("Data selecionada:", selectedDate);

    try {
      await fetchSchedule({ dateTime: selectedDate });
      console.log("Agendamentos filtrados por data carregados");
    } catch (error) {
      console.error("Erro ao filtrar agendamentos por data:", error);
    }
  });
}
