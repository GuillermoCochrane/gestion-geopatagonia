window.addEventListener("load", () => {
  const modal = document.getElementById("modal");
  const modalCloser = document.getElementById("modal-closer");
  const modalOpener = document.getElementById("modal-opener");
  const noObservacionesPACs = document.getElementById("noObservacionesPACs");

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", () => modal.showModal());

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", () => {
    if (noObservacionesPACs != null){
      const confirmarCierre = confirm("No hay observaciones registradas. Se eliminara la Originación. ¿Desea continuar?");
      if (!confirmarCierre) return;
    }
    modal.close()
  });

  // Verificar si hay errores de validación al cargar la página
  const hasErrors = modal.dataset.hasErrors === "true"; // Leer el valor del atributo data-has-errors

  if (hasErrors) {
    modal.showModal(); // Abre el modal como un modal nativo
  }
});