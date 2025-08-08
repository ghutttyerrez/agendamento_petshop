import { fetchSchedule } from "../services/schedule/fetch-schedule.js";
import debounce from "../utils/debounce.js";
import dayjs from "../libs/day.js";
import { apiConfig } from "../services/apiConfig.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Aviso leve: se estiver em produção e a baseURL estiver vazia, alerta no console
  if (!apiConfig.baseURL) {
    console.warn(
      "Configuração da API ausente: defina VITE_API_URL no ambiente de produção."
    );
  }
  // Obtém a data atual formatada
  const today = dayjs().format("YYYY-MM-DD");

  // Busca os agendamentos do dia atual
  try {
    await fetchSchedule({ date: today });
  } catch (error) {
    console.error("Erro ao carregar agendamentos:", error);
  }
});

// Se você tiver um campo de data para filtrar agendamentos, adicione este listener
const dateInput = document.querySelector(".header input[type='date']");
if (dateInput) {
  dateInput.addEventListener(
    "change",
    debounce(async (event) => {
      const selectedDate = event.target.value;
      try {
        await fetchSchedule({ date: selectedDate });
      } catch (error) {
        console.error("Erro ao filtrar agendamentos por data:", error);
      }
    }, 250)
  );
}
