window.addEventListener("load", () => {
  const $exportForm = document.querySelector("#export-form");
  const $export = document.querySelector("#export-modal");
  const $exportStart = document.querySelector("#export-start");
  const $exportSpinner = document.querySelector("#export-spinner");
  const $exportError = document.querySelector("#export-error");
  const $exportErrorClose = document.querySelector("#export-error-close");

  // Estados del modal
  const STATES = {
    START: 1,
    SPINNER: 2,
    ERROR: 3
  };

  //Funcion para  manejar los estados del modal
  const sectionHandler = function(state) {
    $exportStart.classList.toggle("hidden", state !== STATES.START);
    $exportSpinner.classList.toggle("hidden", state !== STATES.SPINNER);
    $exportError.classList.toggle("hidden", state !== STATES.ERROR);
  }

  $exportErrorClose.addEventListener("click", () => {
    closeModal($export);
    sectionHandler(STATES.START);
  });

  $exportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = $exportForm.dataset.id;
    sectionHandler(STATES.SPINNER);

    try {
      const response = await fetch(`${baseUrl}/originacion/observacionPAC/export/${id}`, {
        method: "POST"
      });

      if (!response.ok) {
        sectionHandler(STATES.ERROR);
        return;
      }

      // Guardamos el PDF en un blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a"); // Generamos el enlace temporal para descargar el PDF
      a.href = url;                          // Asignamos la URL del blob como el href del enlace
      a.download = `pac-${id}.pdf`;          // Asignamos el nombre del archivo como el atributo download del enlace
      document.body.appendChild(a);          // Agregamos el enlace al body del documento
      a.click();                             // Generamos el click del enlace para descargar el PDF
      a.remove();                            // Eliminamos el enlace del body del documento 
      window.URL.revokeObjectURL(url);       // Liberamos la memoria del URL del blob

      // 🔒 Cerramos el modal manualmente
      closeModal($export);
      sectionHandler(STATES.START);
    } catch (err) {
      console.error(err);
      sectionHandler(STATES.ERROR);
    }
  });
})