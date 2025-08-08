import apiClient from "../../core/api/client.js";

export async function cancelSchedule({ id }) {
  if (!id) {
    console.error("cancelSchedule: id inválido", id);
    return false;
  }
  try {
    await apiClient.del(`/schedules/${id}`);
    return true;
  } catch (error) {
    console.error("Erro ao cancelar o agendamento:", error);
    return false;
  }
}
