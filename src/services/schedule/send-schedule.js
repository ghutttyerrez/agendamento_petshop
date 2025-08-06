import { apiConfig } from "../apiConfig.js";
import dayjs from "dayjs";
import { fetchSchedule } from "./fetch-schedule.js";

export async function sendSchedule(scheduleData) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    });

    console.log("Response status:", response.status); // Log para debug

    fetchSchedule({ dateTime: scheduleData.dateTime });

    if (!response.ok) {
      throw new Error(`Erro ao enviar agendamento: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Agendamento enviado com sucesso:", result);
  } catch (error) {
    console.error("Erro ao enviar o agendamento:", error);
    throw error; // Re-throw para que o erro seja capturado no submit.js
  }
}
