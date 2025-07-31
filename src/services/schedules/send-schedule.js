import { apiConfig } from "../api-config.js";
import dayjs from "dayjs";
import { fetchSchedule } from "../schedules/fetch-schedule.js";

export async function sendSchedule(time, pet, owner, service, schedule) {
  try {
    // Fazendo a requisição para enviar o agendamento
    await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviando os dados do agendamento no formato JSON
      body: JSON.stringify({
        time: time,
        pet: pet,
        owner: owner,
        service: service,
      }),
    });
    // Após enviar o agendamento, atualiza a lista de agendamentos para a data correspondente
    fetchSchedule(dayjs(schedule.time).format("YYYY-MM-DD"));
  } catch (error) {
    console.error("Erro ao enviar agendamento:", error);
    alert("Não foi possível enviar o agendamento. Tente novamente mais tarde.");
  }
}
