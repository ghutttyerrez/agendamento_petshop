import dayjs from "dayjs";
import { cancel } from "../../services/schedules/cancel.js";

// Função principal para criar um novo agendamento na interface
export function createSchedule({ schedule }) {
  // Selecionando elementos do DOM necessários para manipulação
  const form = document.querySelector("form");
  const scheduleForm = document.querySelector(".schedule");
  const buttonNewSchedule = document.getElementById("new-schedule");
  const serviceSchedule = document.getElementById("service");

  // Selecionando as seções de período (manhã, tarde, noite)
  const morning = document.getElementById("morning");
  const afternoon = document.getElementById("afternoon");
  const night = document.getElementById("night");

  // Objeto para facilitar acesso aos períodos
  const periods = { morning, afternoon, night };

  // Formatando dados do agendamento
  const time = dayjs(schedule.time).format("HH:mm");
  const pet = schedule.pet;
  const owner = schedule.owner;
  const service = schedule.service || serviceSchedule.value;

  // Determinando em qual período (manhã/tarde/noite) o agendamento deve aparecer
  const periodSection = getPeriodList(time, periods);

  const ul = getOrCreateUl(periodSection);

  const li = createScheduleItem(time, pet, owner, service, schedule);

  ul.appendChild(li);

  // Atualizando a interface - removendo blur e ocultando formulário
  scheduleForm.classList.remove("blur");
  form.classList.remove("form");
  form.classList.add("hidden");
  buttonNewSchedule.classList.remove("hidden");
}

// Função que cria a ul caso não exista na seção
function getOrCreateUl(sectionElement) {
  let ul = sectionElement.querySelector("ul");

  // Se não encontrar, cria uma nova ul
  if (!ul) {
    ul = document.createElement("ul");
    ul.setAttribute("role", "list");
    sectionElement.querySelector(".content").appendChild(ul);
  }

  return ul;
}

// Função para criar o item completo do agendamento (li)
function createScheduleItem(time, pet, owner, service, schedule) {
  const li = document.createElement("li");
  li.classList.add("title");
  li.setAttribute("role", "listitem");

  // Preenchendo conteúdo HTML do agendamento
  li.innerHTML = `
    <span>${time}</span>
    <span>${pet} <small>/ ${owner}</small></span>
    <p>${service}</p>
  `;

  // Criando e adicionando botão de remoção
  const removeButton = createRemoveButton(schedule, li);
  li.appendChild(removeButton);

  return li;
}

// Função para criar botão de remoção do agendamento
function createRemoveButton(schedule, li) {
  const button = document.createElement("button");
  button.id = "remove-button";
  button.textContent = "Remover agendamento";

  // Evento para cancelar agendamento quando botão for clicado
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    await cancel(schedule.id); // Chama serviço para cancelar no backend
    li.remove(); // Remove da interface
  });

  return button;
}

// Função que determina em qual período o agendamento deve ser exibido
function getPeriodList(time, { morning, afternoon, night }) {
  // Extrai a hora do horário formatado
  const hour = dayjs(time, "HH:mm").hour();

  // Define período baseado na hora
  if (hour >= 8 && hour < 12) {
    return morning; // Manhã: 8h às 11h59
  } else if (hour >= 12 && hour < 18) {
    return afternoon; // Tarde: 12h às 17h59
  } else {
    return night; // Noite: 18h às 7h59
  }
}
