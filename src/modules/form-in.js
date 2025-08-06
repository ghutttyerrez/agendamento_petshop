export function formIn() {
  // Elementos baseados na sua estrutura HTML
  const buttonContainer = document.getElementById("button-container");
  const form = document.getElementById("form-schedule");
  const main = document.querySelector("main.container");
  const closeButton = document.getElementById("close-modal");

  // Elementos do formulário baseados no submit.js
  const tutorName = document.getElementById("tutor");
  const petName = document.getElementById("pet");
  const phone = document.getElementById("phone");
  const serviceDescription = document.getElementById("service");
  const inputDate = document.querySelector("input[type='date']");
  const hour = document.getElementById("hour");

  // Cria o botão de "Novo Agendamento" se não existir
  if (buttonContainer && !buttonContainer.querySelector("#new-schedule-btn")) {
    const newScheduleBtn = document.createElement("button");
    newScheduleBtn.id = "new-schedule-btn";
    newScheduleBtn.textContent = "Novo Agendamento";
    newScheduleBtn.className = "new-schedule-button";
    buttonContainer.appendChild(newScheduleBtn);

    // Evento para abrir o formulário
    newScheduleBtn.addEventListener("click", () => {
      console.log("Abrindo formulário de agendamento");

      // Remove a classe hidden do formulário
      form.classList.remove("hidden");

      // Adiciona blur no fundo
      if (main) {
        main.classList.add("blur-bg");
      }

      // Esconde o botão de novo agendamento
      newScheduleBtn.style.display = "none";

      // Define a data atual como padrão
      if (inputDate) {
        const today = new Date().toISOString().split("T")[0];
        inputDate.value = today;
      }
    });
  }

  // Evento para fechar o formulário
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      console.log("Fechando formulário de agendamento");

      // Adiciona a classe hidden no formulário
      form.classList.add("hidden");

      // Remove blur do fundo
      if (main) {
        main.classList.remove("blur-bg");
      }

      // Mostra o botão de novo agendamento
      const newScheduleBtn = document.getElementById("new-schedule-btn");
      if (newScheduleBtn) {
        newScheduleBtn.style.display = "block";
      }

      // Reseta o formulário
      if (form) {
        form.reset();
      }

      // Limpa campos individualmente (backup)
      if (tutorName) tutorName.value = "";
      if (petName) petName.value = "";
      if (phone) phone.value = "";
      if (serviceDescription) serviceDescription.value = "";
      if (inputDate) inputDate.value = "";
      if (hour) hour.value = "";
    });
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  formIn();
});
