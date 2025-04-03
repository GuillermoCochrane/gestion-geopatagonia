window.addEventListener("load", () => {
  const modal = document.querySelector("#modal");
  const modalCloser = document.querySelector("#modal-closer");
  const modalOpener = document.querySelector("#modal-opener");
  const noObservacionesPACs = document.querySelector("#pac-section article");
  const pacSection = document.querySelector("#pac-section");
  const confirmDelete = document.querySelector("#confirm-pac-delete");
  const deleteSuccess = document.querySelector("#pac-delete-success");
  const pacError = document.querySelector("#pac-error");
  const deleteButton = document.querySelector("#pac-delete");
  const cancelButton = document.querySelector("#pac-cancel");
  const closeButton = document.querySelector("#pac-delete-close");
  const errorButton = document.querySelector("#pac-error-close");

  const STATES = {
    MAIN: 1,
    CONFIRM: 2, 
    SUCCESS: 3,
    ERROR: 4
  }

  const sectionHandler = function(state) {
    //! agregar transiciones al cambio de secciones
    pacSection.classList.toggle("hidden", state !== STATES.MAIN);
    confirmDelete.classList.toggle("hidden", state !== STATES.CONFIRM);
    deleteSuccess.classList.toggle("hidden", state !== STATES.SUCCESS);
    pacError.classList.toggle("hidden", state !== STATES.ERROR); 
  };

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", () => modal.showModal());

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", async () => {
    // Verificar si hay observaciones PACs
    if (noObservacionesPACs) {
      // Mostrar seccion de confirmación
      sectionHandler(2);
      // Esperar la respuesta del usuario
      const userConfirmed = await new Promise((resolve) => {
        //! agregar limpieza de eventos (adaptar de deepseek)
        deleteButton.onclick = () => {
          resolve(true);
        };
        cancelButton.onclick = () => {
          // Ocultar confirmación y mostrar sección principal
          sectionHandler(1);
          resolve(false);
        };
      });

      // Si se confirma, eliminar la originación
      if (userConfirmed) {
        const originacionId = modal?.dataset?.originacionId;
        const endpoint = `${baseUrl}/api/utilities/deleteOrigination/${originacionId}`;
        
        //! agregar spinner mientra se resuelve la promesa
        try {
          const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await response.json();
          
          // Si la solicitud se ha realizado correctamente
          if (json?.data?.deleted) {
            sectionHandler(3);
            // Configurar el botón de cierre
            closeButton.onclick = () => {
              modal.close();
              setTimeout(() => {
                window.location.href = "/originacion/";
              }, 500);
            };
          } else {
            sectionHandler(4);
            errorButton.onclick = () => {
              sectionHandler(1);
            };
          }
        } catch (error) {
          console.error(error);
          sectionHandler(4);
          errorButton.onclick = () => {
            sectionHandler(1);
          };
        }
      }
    } else {
      // Si no hay observaciones, cerrar el modal directamente
      modal.close();
      setTimeout(() => {
        window.location.href = "/originacion/";
      }, 500);
    }
  });

  // Verificar si hay errores de validación al cargar la página
  const hasErrors = modal.dataset.hasErrors === "true";
  if (hasErrors) {
    modal.showModal();
  }
});