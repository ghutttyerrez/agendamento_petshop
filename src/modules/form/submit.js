import dayjs from "dayjs";
import { sendSchedule } from "../../services/schedule/send-schedule.js";

//captura os dados do formulario
const form = document.querySelector("form");

//capturando os elementos do formulario
const inputDate = document.querySelectorAll("input[type='date']");
const hour = document.getElementById("hour");
const phone = document.getElementById("phone");
const tutorName = document.getElementById("tutor");
const petName = document.getElementById("pet");
const serviceDescription = document.getElementById("service");

//validando o input de time
const hourNow = dayjs().format("HH:mm");
hour.value = hourNow;
hour.min = hourNow;

//funcao que transforma o input de hora em um array e captura o primeiro valor
const getHourInput = () => {
  const [hours, minutes] = hour.value.split(":");
  const formattedHour = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  hour.value = formattedHour;
  return formattedHour;
};

//manipula o input de data
inputDate.forEach((input) => {
  const inputToday = dayjs().format("YYYY-MM-DD");

  input.value = inputToday;
  input.min = inputToday;

  //adiciona um evento para mudanca de data
  input.onchange = () => {
    const today = dayjs().startOf("day");
    const selectedDate = dayjs(input.value);

    //verifica se a data selecionada é anterior a hoje
    if (selectedDate.isBefore(today)) {
      hour.min = "00:00";
    } else {
      hour.min = hourNow;
    }
  };
});

//validando o input de telefone
phone.addEventListener("input", () => {
  // Remove tudo que não é número
  let value = phone.value.replace(/\D/g, "");

  // Limita para no máximo 11 números
  value = value.slice(0, 11);

  // Formatação dinâmica
  if (value.length <= 10) {
    // Telefone fixo (ou celular incompleto)
    phone.value = value
      .replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
      .trim()
      .replace(/[-\s]+$/, ""); // remove hífen/espaco se for parcial
  } else {
    // Celular com 9 dígitos
    phone.value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  //verifica se o telefone é válido
  const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  if (!phonePattern.test(phone.value)) {
    phone.setCustomValidity(
      "Telefone inválido. Formato esperado: (XX) XXXX-XXXX ou (XX) XXXXX-XXXX"
    );
  } else {
    phone.setCustomValidity("");
  }
});

//adiciona um evento de submit ao formulario
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    //captura os dados do formulario
    const formData = new FormData(form);
    const data = {
      tutor: formData.get("tutor"),
      pet: formData.get("pet"),
      phone: formData.get("phone"),
      service: formData.get("service"),
    };

    //adiciona hora ao objeto data
    data.hour = getHourInput();

    //valida os campos name e pet
    if (!tutorName.value || !petName.value) {
      alert("Por favor, preencha o nome do tutor e do pet.");
      return;
    }

    //valida o campo servicos
    if (!serviceDescription.value) {
      alert("Por favor, descreva o serviço a ser realizado.");
      return;
    }

    //valida o campo telefone
    if (!phone.value) {
      alert("Por favor, preencha o telefone.");
      return;
    }

    //gera um id unico para a api de agendamento
    data.id = crypto.randomUUID();

    //gerando uma data e hora para enviar para a API
    const dateTime = dayjs(
      `${inputDate[0].value} ${data.hour}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();

    //adiciona a data e hora ao objeto data
    data.dateTime = dateTime;

    await sendSchedule(data);

    //reseta o formulario
    form.reset();

    console.log("Dados do formulário:", data);
  } catch (error) {
    console.log(error);
    alert(
      "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente."
    );
  }
};
