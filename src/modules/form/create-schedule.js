import dayjs from "dayjs";
import { cancelSchedule } from "../../services/schedule/cancel.js";

export function createSchedule(schedule) {
  console.log("Criando agendamento:", schedule);

  // Extrai a hora do agendamento
  const hour = dayjs(schedule.dateTime).format("HH:mm");
  const scheduleHour = parseInt(hour.split(":")[0], 10);

  // Determina o período do dia
  let period;
  if (scheduleHour >= 6 && scheduleHour < 12) {
    period = "morning";
  } else if (scheduleHour >= 12 && scheduleHour < 18) {
    period = "afternoon";
  } else {
    period = "night";
  }

  console.log(`Agendamento para o período: ${period} às ${hour}`);

  // CORREÇÃO: Seleciona o elemento específico do período por ID
  const periodElement = document.getElementById(period);

  if (!periodElement) {
    console.error(`Elemento com ID "${period}" não encontrado`);
    console.log("Elementos disponíveis:", document.querySelectorAll('[id]'));
    return;
  }

  // Cria o elemento do agendamento
  const scheduleItem = document.createElement("ul");
  scheduleItem.setAttribute("data-id", schedule.id);
  scheduleItem.setAttribute("role", "list");

  scheduleItem.innerHTML = `
    <li class="title">
      <span>${hour}</span>
      <span>${schedule.pet}<small> / ${schedule.tutor}</small></span>
    </li>
    <p>${schedule.service}</p>
    <button class="remove-button" data-id="${schedule.id}">Remover agendamento</button>
  `;

  // CORREÇÃO: Adiciona o agendamento ao período correto
  periodElement.appendChild(scheduleItem);

  // CORREÇÃO: Corrige o evento de remoção
  const removeButton = scheduleItem.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    console.log("Removendo agendamento com id:", schedule.id);
    scheduleItem.remove();
    
    // Chama a função de cancelamento na API
    cancelSchedule(schedule.id);
  });

  console.log("Agendamento criado com sucesso:", scheduleItem);
}
