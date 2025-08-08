import { sendSchedule } from "../../services/schedule/send-schedule.js";
import { fetchSchedule } from "../../services/schedule/fetch-schedule.js";
import dayjs from "../../libs/day.js";

// Função para aguardar o DOM estar carregado
function waitForElement(selector) {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector);
      if (element) {
        observer.disconnect();
        resolve(element);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Inicializar elementos do formulário quando disponíveis
async function initializeFormElements() {
  // Aguardar os elementos estarem disponíveis
  const form = await waitForElement("form");
  const hour = await waitForElement("#hour");
  const phone = await waitForElement("#phone");

  // Configurar hora atual
  const hourNow = dayjs().format("HH:mm");
  hour.value = hourNow;
  hour.min = hourNow;

  // Configurar inputs de data
  const inputDate = document.querySelectorAll("input[type='date']");
  inputDate.forEach((input) => {
    const inputToday = dayjs().format("YYYY-MM-DD");
    input.value = inputToday;
    input.min = inputToday;

    // Evento para mudança de data
    input.addEventListener("change", () => {
      const today = dayjs().startOf("day");
      const selectedDate = dayjs(input.value);

      if (selectedDate.isBefore(today)) {
        hour.min = "00:00";
      } else {
        hour.min = hourNow;
      }
    });
  });

  // Validação de telefone
  phone.addEventListener("input", () => {
    let value = phone.value.replace(/\D/g, "");
    value = value.slice(0, 11);

    if (value.length <= 10) {
      phone.value = value
        .replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
        .trim()
        .replace(/[-\s]+$/, "");
    } else {
      phone.value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phonePattern.test(phone.value)) {
      phone.setCustomValidity(
        "Telefone inválido. Formato esperado: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
      );
    } else {
      phone.setCustomValidity("");
    }
  });

  // Adicionar evento de submit
  form.addEventListener("submit", submitForm);
}

// Função para formatar hora
const getHourInput = () => {
  const hour = document.getElementById("hour");
  if (!hour || !hour.value) return dayjs().format("HH:mm");

  const [hours, minutes] = hour.value.split(":");
  const formattedHour = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  hour.value = formattedHour;
  return formattedHour;
};

// Função principal de submit
async function submitForm(event) {
  event.preventDefault();

  try {
    const form = event.target;
    const formData = new FormData(form);

    // Cria um objeto com os dados do formulário
    const data = {
      tutor: formData.get("tutor"),
      pet: formData.get("pet"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      date: formData.get("date"),
      hour: getHourInput(),
    };

    // Validações
    if (!data.tutor || !data.pet) {
      alert("Por favor, preencha o nome do tutor e do pet.");
      return;
    }

    if (!data.service) {
      alert("Por favor, descreva o serviço a ser realizado.");
      return;
    }

    if (!data.phone) {
      alert("Por favor, preencha o telefone.");
      return;
    }

    if (!data.date || !data.hour) {
      alert("Por favor, preencha a data e hora do agendamento.");
      return;
    }

    // Gerar ID único
    data.id = crypto.randomUUID();

    // Criar dateTime
    const dateTime = dayjs(
      `${data.date} ${data.hour}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();

    data.dateTime = dateTime;

    // Enviar agendamento
    await sendSchedule(data);

    // Fechar modal
    if (window.closeModal) {
      window.closeModal();
    }

    // Recarregar agendamentos
    const currentDate =
      document.querySelector('.header input[type="date"]')?.value ||
      dayjs().format("YYYY-MM-DD");
    await fetchSchedule({ date: currentDate });

    alert("Agendamento criado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    alert(
      "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
    );
  }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", initializeFormElements);

export { submitForm };
