export function formIn() {
  const form = document.getElementById("form-schedule");
  const openModalBtn = document.getElementById("new-schedule");
  const closeModalBtn = document.getElementById("closeButton");
  const closeModalBtnBottom = document.getElementById("close-modal");

  // Função para abrir modal
  function openModal() {
    form.classList.remove("none");

    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = "hidden";

    // Define a data atual como padrão
    const inputDate = document.querySelector(
      "#form-schedule input[name='date']"
    );
    if (inputDate) {
      const today = new Date().toISOString().split("T")[0];
      inputDate.value = today;
    }
    // Acessibilidade: marca como dialog e foca no primeiro campo
    form.setAttribute("role", "dialog");
    form.setAttribute("aria-modal", "true");
    const firstInput = form.querySelector("input, textarea, select, button");
    firstInput?.focus();
  }

  // Função para fechar modal
  function closeModal() {
    form.classList.add("none");

    // Restaura scroll do body
    document.body.style.overflow = "";

    // Limpar formulário
    form.reset();
    form.removeAttribute("role");
    form.removeAttribute("aria-modal");
  }

  // Event listeners
  openModalBtn?.addEventListener("click", openModal);
  closeModalBtn?.addEventListener("click", closeModal);
  closeModalBtnBottom?.addEventListener("click", closeModal);

  // Fechar modal ao clicar fora dele (no backdrop)
  form?.addEventListener("click", (event) => {
    if (event.target === form) {
      closeModal();
    }
  });

  // Fechar modal com ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !form.classList.contains("none")) {
      closeModal();
    }
  });

  // Exportar funções para uso em outros módulos
  window.openModal = openModal;
  window.closeModal = closeModal;
}

// Inicializa quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  formIn();
});
