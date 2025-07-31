import { apiConfig } from "../api-config";

export async function cancel({ id }) {
  try {
    //fazendo a requisição para cancelar o agendamento
    await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
    alert(
      "Não foi possível cancelar o agendamento. Tente novamente mais tarde."
    );
  }
}
