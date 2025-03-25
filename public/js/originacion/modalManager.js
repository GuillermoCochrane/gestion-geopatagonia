window.addEventListener("load", () => {
  const modal = document.getElementById("modal");
  const modalCloser = document.getElementById("modal-closer");
  const modalOpener = document.getElementById("modal-opener");

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", () => modal.showModal());

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", () => modal.close());

  // Verificar si hay errores de validación al cargar la página
  const hasErrors = modal.dataset.hasErrors === "true"; // Leer el valor del atributo data-has-errors

  if (hasErrors) {
    modal.showModal(); // Abre el modal como un modal nativo
  }
});