window.addEventListener("load", () => {
  const modal = document.querySelector("#modal");
  const modalCloser = document.querySelector("#modal-closer");
  const modalOpener = document.querySelector("#modal-opener");
  const noObservacionesPACs = document.querySelector("#noObservacionesPACs");
  const confirmDelete = document.querySelector("#confirm-pac-delete");
  const deleteSuccess = document.querySelector("#pac-delete-success");
  const pacError = document.querySelector("#pac-error");
  const deleteButton = document.querySelector("#pac-delete");
  const cancelButton = document.querySelector("#pac-cancel");
  const closeButton = document.querySelector("#pac-delete-close");
  const errorButton = document.querySelector("#pac-error-close");
  const spinner = document.querySelector("#spinner-modal");
  const originacionSection = document.querySelector("#originacion-section");
  const originacionForm = document.querySelector("#nueva-originacion");
  const editButton = document.querySelector("#edit-originacion-opener");
  const detailsButton = document.querySelector("#details-originacion-opener");

  // Estados de la sección
  const STATES = {
    MAIN: 1,
    CONFIRM: 2, 
    SUCCESS: 3,
    ERROR: 4
  };

  // Mostrar sección de edición de la originación
  editButton && editButton.addEventListener("click", () => {
    originacionSection.classList.add("hidden");
    originacionForm.classList.remove("hidden");
  });

  detailsButton && detailsButton.addEventListener("click", () => {
    originacionSection.classList.remove("hidden");
    originacionForm.classList.add("hidden");
  });

  // Función para cambiar el estado de las secciones
  const sectionHandler = function(state) {
    confirmDelete.classList.toggle("hidden", state !== STATES.CONFIRM);
    deleteSuccess.classList.toggle("hidden", state !== STATES.SUCCESS);
    pacError.classList.toggle("hidden", state !== STATES.ERROR);
    
    if (state === STATES.MAIN) {
      confirmDelete.classList.add("hidden");
      deleteSuccess.classList.add("hidden");
      pacError.classList.add("hidden");
    }
  };

  // Función para limpiar los listeners
  const clearAllListeners = () => {
    deleteButton.onclick = null;
    cancelButton.onclick = null;
    closeButton.onclick = null;
    errorButton.onclick = null;
    modalOpener.removeEventListener("click", openModal);
  };

  // Función para manejar la confirmación de eliminación
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

  // Función para abrir el modal
  const openModal = () => modal.showModal();

  // Abrir el modal con el botón
  modalOpener.addEventListener("click", openModal);

  // Cerrar el modal con el botón
  modalCloser.addEventListener("click", async () => {
    if (noObservacionesPACs) {
      const userConfirmed = await showConfirmation();

      if (userConfirmed) {
        const originacionId = modal?.dataset?.originacionId;
        const endpoint = `${baseUrl}/api/utilities/deleteOrigination/${originacionId}`;

        // Mostrar spinner con retraso garantizado
        spinner.classList.remove("hidden");
        await new Promise(resolve => setTimeout(resolve, 800)); // 800ms de visibilidad

        try {
          const response = await fetch(endpoint, { method: "DELETE" });
          const json = await response.json();
          
          if (json?.data?.deleted) {
            sectionHandler(STATES.SUCCESS);
            
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
          spinner.classList.add("hidden");
          sectionHandler(STATES.ERROR);
        } finally {
          spinner.classList.add("hidden");
        }
      }
    } else {
      modal.close();
      setTimeout(() => {
        window.location.href = "/originacion/";
      }, 500);
    }
  });

  // Verificar errores de validación al cargar
  const hasErrors = modal.dataset.hasErrors === "true";
  if (hasErrors) {
    modal.showModal();
  }
});