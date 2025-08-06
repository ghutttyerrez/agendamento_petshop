import { apiConfig } from "../apiConfig";

export async function cancelSchedule({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao cancelar o agendamento:", error);
  }
}
