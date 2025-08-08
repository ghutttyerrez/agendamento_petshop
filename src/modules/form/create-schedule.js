import dayjs from "../../libs/day.js";
import { cancelSchedule } from "../../services/schedule/cancel.js";

export function createSchedule(schedule) {
  // Validação inicial
  if (!schedule) {
    console.error("Schedule não fornecido");
    return;
  }

  if (!schedule.dateTime) {
    console.error("Schedule sem dateTime:", schedule);
    return;
  }

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

  // Seleciona o elemento específico do período por ID
  const periodElement = document.getElementById(period);

  if (!periodElement) {
    console.error(`Elemento com ID "${period}" não encontrado`);
    return;
  }

  // Usa o container correto (.content) dentro do período
  const periodContainer =
    periodElement.querySelector(".content") || periodElement;

  // Cria o elemento do agendamento
  const scheduleItem = document.createElement("ul");
  scheduleItem.setAttribute("data-id", schedule.id);
  scheduleItem.setAttribute("role", "list");

  scheduleItem.innerHTML = `
    <li class="title">
      <span>${hour}</span>
      <span>${schedule.pet || "Pet não informado"}<small> / ${
    schedule.tutor || "Tutor não informado"
  }</small></span>
    </li>
    <p>${schedule.service || "Serviço não informado"}</p>
    <button id="remove-button" class="remove-button" data-id="${
      schedule.id
    }">Remover agendamento</button>
  `;

  // Adiciona o agendamento ao período correto
  periodContainer.appendChild(scheduleItem);

  // Adiciona evento de remoção
  const removeButton = scheduleItem.querySelector(".remove-button");
  if (removeButton) {
    removeButton.addEventListener("click", async () => {
      // Chama a API para remover do backend
      try {
        const ok = await cancelSchedule({ id: schedule.id });
        if (ok) {
          // Remove do DOM somente se a API confirmou
          scheduleItem.remove();
        } else {
        }
      } catch (e) {
        console.error("Erro ao remover no servidor:", e);
      }
    });
  }
}
