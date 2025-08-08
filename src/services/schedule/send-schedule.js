import apiClient from "../../core/api/client.js";
import dayjs from "../../libs/day.js";
// import { fetchSchedule } from "./fetch-schedule.js";

export async function sendSchedule(scheduleData) {
  try {
    // Garante consistência de campos: cria dateTime se veio apenas date/hour
    if (!scheduleData.dateTime && scheduleData.date && scheduleData.hour) {
      scheduleData.dateTime = dayjs(
        `${scheduleData.date} ${scheduleData.hour}`,
        "YYYY-MM-DD HH:mm"
      ).toISOString();
    }
    const created = await apiClient.post("/schedules", scheduleData);
    return created;

    // nenhuma validação adicional necessária pois apiClient lança erro em status não-2xx
  } catch (error) {
    console.error("Erro ao enviar o agendamento:", error);
    throw error; // Re-throw para que o erro seja capturado no submit.js
  }
}
