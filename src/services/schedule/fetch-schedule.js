import apiClient from "../../core/api/client.js";
import dayjs from "../../libs/day.js";
import { createSchedule } from "../../modules/form/create-schedule.js";

export async function fetchSchedule({ date }) {
  try {
    const schedules = await apiClient.get("/schedules");

    // Verifica se schedules é um array
    if (!Array.isArray(schedules)) {
      console.error("Resposta da API não é um array:", schedules);
      return [];
    }

    const targetDay = dayjs(date);
    const dailySchedules = schedules.filter((schedule) => {
      if (!schedule) return false;
      // Alguns registros podem ter 'date' e outros 'dateTime'
      if (schedule.dateTime)
        return dayjs(schedule.dateTime).isSame(targetDay, "day");
      if (schedule.date) return dayjs(schedule.date).isSame(targetDay, "day");
      return false;
    });

    // Limpa apenas as listas existentes dentro dos períodos para manter headers
    ["morning", "afternoon", "night"].forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const content = section.querySelector(".content") || section;
      content.querySelectorAll('ul[role="list"]').forEach((ul) => ul.remove());
    });

    // Cria os agendamentos
    dailySchedules.forEach((schedule) => {
      // Verifica novamente antes de criar
      if (schedule && schedule.dateTime) {
        createSchedule(schedule);
      }
    });

    return dailySchedules;
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
}
