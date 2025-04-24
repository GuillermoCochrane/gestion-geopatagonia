window.addEventListener("load", () => {
  const $originacionSelectModal = document.querySelector("#select-originacion-modal");
  const $originationSelectorOpener = document.querySelector("#origination-selector-opener");
  const $originacionClose = document.querySelector("#originacion-close");
  const $originacionSelect = document.querySelector("#originacion-select");
  const $originacionForm = document.querySelector("#originacion-select-form");
  // Abrir el modal de selección de originación
  $originationSelectorOpener.addEventListener("click", () => {
    $originacionSelectModal.showModal();
  });

  //Cerrar el modal de selección de originación
  $originacionClose.addEventListener("click", () => {
    $originacionSelectModal.close();
  });
});