import { dayjs } from "dayjs";
import { apiConfig } from "../api-config.js";
import { createSchedule } from "../../modules/form/create-schedule.js";

export async function fetchSchedule(date) {
  try {
    //fazendo a requisição para buscar os agendamentos
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)

    const date = await response.json();
   
    //filtrando os agendamentos pela data
    const schedulesDaily = date.filter(schedule => dayjs(date).isSame(schedule.when, "day"))

    //limpando a lista de agendamentos
    document.getElementById("morning") = "";
    document.getElementById("afternoon") = "";
    document.getElementById("night") = "";

    schedulesDaily.forEach(schedule => {
      createSchedule({ schedule });
    })

    return schedulesDaily;

// Se ocorrer um erro, exibe uma mensagem no console e alerta o usuário
  } catch (error) {
    console.log(error);
    alert("Erro ao buscar agendamentos.");
  }
}
