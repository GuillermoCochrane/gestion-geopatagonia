window.addEventListener("load", () => {
  const modal = document.getElementById("modal");
  const modalCloser = document.getElementById("modal-closer");
  const modalOpener = document.getElementById("modal-opener");
  const noObservacionesPACs = document.getElementById("noObservacionesPACs");

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", () => modal.showModal());

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", async() => {
    // Verificar si hay observaciones PACs
    if (noObservacionesPACs){
      const confirmarCierre = confirm("No hay observaciones registradas. Se eliminará la originación. ¿Estás seguro?");
      // Si se confirma, eliminar la originación
      if (confirmarCierre){
        const originacionId = modal?.dataset?.originacionId;
        const endpoint = `${baseUrl}/api/utilities/deleteOrigination/${originacionId}`;
        const errorMessage = "Ocurrió un error al eliminar. Por favor intente nuevamente.";
        try {
          const response = await fetch(endpoint,{
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();
          // Si la solicitud se ha realizado correctamente, cerrar el modal
          if (json?.data?.deleted) {
            alert("La originación se eliminó correctamente");
            modal.close();
            setTimeout(() => {
              window.location.href = "/originacion/";
            }, 500);
          } else {
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error); // Registro del error para depuración
          alert(errorMessage)
        }
      } 
    } else {
      // Si no hay observaciones, cerrar el modal
      modal.close();
      setTimeout(() => {
        window.location.href = "/originacion/";
      }, 500);
    }
  });

  // Verificar si hay errores de validación al cargar la página
  const hasErrors = modal.dataset.hasErrors === "true"; // Leer el valor del atributo data-has-errors

  if (hasErrors) {
    modal.showModal(); // Abre el modal como un modal nativo
  }
});
// cambiar confirm y alert por modal