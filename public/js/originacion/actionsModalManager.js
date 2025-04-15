window.addEventListener("load", () => {
  // Botones de apertura de modales
  const $exportButton = document.querySelector("#export-action");
  const $addButton = document.querySelector("#add-action");
  const $modifyButton = document.querySelector("#modify-action");
  const $reopenButton = document.querySelector("#reopen-action");

  //Botones de cierre de modales
  const $exportClose = document.querySelector("#export-close");
  const $addClose = document.querySelector("#add-close");
  const $modifyClose = document.querySelector("#modify-close");
  const $reopenClose = document.querySelector("#reopen-close");

  // Modales
  const $export = document.querySelector("#export-modal");
  const $add = document.querySelector("#add-modal");
  const $modify = document.querySelector("#modify-modal");
  const $reopen = document.querySelector("#reopen-modal");

  // dataset
  const $dataContainer = document.querySelector("#data-container");
  // Función para abrir el modal
  const openModal = function(modal) {
    modal.showModal();
  }
  
  // Función para cerrar el modal
  const closeModal = function(modal) {
    modal.close();
  }

  $exportButton.addEventListener("click", () => openModal($export));
  $addButton.addEventListener("click", () => openModal($add));
  $modifyButton && $modifyButton.addEventListener("click", () => openModal($modify));
  $reopenButton && $reopenButton.addEventListener("click", () => openModal($reopen));

  $exportClose.addEventListener("click", () => closeModal($export));
  $addClose.addEventListener("click", () => closeModal($add));
  $modifyClose && $modifyClose.addEventListener("click", () => closeModal($modify));
  $reopenClose && $reopenClose.addEventListener("click", () => closeModal($reopen));


  // Abre el modal correspodiente, si hay una acción en el dataset
  if($dataContainer.dataset.action) {
    const action = $dataContainer.dataset.action;
    const $modal = document.querySelector(`#${action}-modal`);
    openModal($modal);
  }
})