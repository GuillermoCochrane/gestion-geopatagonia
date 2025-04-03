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

  //Estados de la sección
  const STATES = {
    MAIN: 1,
    CONFIRM: 2, 
    SUCCESS: 3,
    ERROR: 4
  }

  //Función para cambiar el estado de la secciones
  const sectionHandler = function(state) {
    //! agregar transiciones al cambio de secciones
    pacSection.classList.toggle("hidden", state !== STATES.MAIN);
    confirmDelete.classList.toggle("hidden", state !== STATES.CONFIRM);
    deleteSuccess.classList.toggle("hidden", state !== STATES.SUCCESS);
    pacError.classList.toggle("hidden", state !== STATES.ERROR); 
  };

  //Función para limpiar los listeners
  const clearAllListeners = () => {
    deleteButton.onclick = null;
    cancelButton.onclick = null;
    closeButton.onclick = null;
    errorButton.onclick = null;
    modalOpener.removeEventListener("click", openModal);
  };

  //Función para manejar la confirmación de eliminación
  const showConfirmation = async () => {
    clearAllListeners();
    sectionHandler(STATES.CONFIRM);
    
    return new Promise((resolve) => {
      deleteButton.onclick = () => {
        clearAllListeners();
        resolve(true);
      };
      
      cancelButton.onclick = () => {
        clearAllListeners();
        sectionHandler(STATES.MAIN);
        resolve(false);
      };
    });
  };

  //Función para abrir el modal
  const openModal = () => modal.showModal();

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", openModal);

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", async () => {
    // Verificar si hay observaciones PACs
    if (noObservacionesPACs) {
      // Mostrar seccion de confirmación
      const userConfirmed = await showConfirmation();

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
            // Mostrar sección de confirmación
            sectionHandler(STATES.SUCCESS);
            // Limpiar los listeners
            clearAllListeners();
            // Configurar el botón de cierre
            closeButton.onclick = () => {
              modal.close();
              setTimeout(() => {
                window.location.href = "/originacion/";
              }, 500);
            };
          } else {
            throw new Error("Error en la respuesta del servidor");
          }
        } catch (error) {
          console.error(error);
          sectionHandler(STATES.ERROR);
          errorButton.onclick = () => {
            clearAllListeners();
            sectionHandler(STATES.MAIN);
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