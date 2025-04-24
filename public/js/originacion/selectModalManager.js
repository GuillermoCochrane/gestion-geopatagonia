window.addEventListener("load", () => {
  const $originacionSelectModal = document.querySelector("#select-originacion-modal");
  const $originationSelectorOpener = document.querySelector("#origination-selector-opener");
  const $originacionClose = document.querySelector("#originacion-close");
  const $originacionSelectBtn = document.querySelector("#originacion-select");
  const $originacionID = document.querySelector("#originacion_id");
  const $originacionForm = document.querySelector("#originacion-select-form");

  // Abrir el modal de selección de originación
  $originationSelectorOpener.addEventListener("click", () => {
    $originacionSelectModal.showModal();
  });

  //Cerrar el modal de selección de originación
  $originacionClose.addEventListener("click", () => {
    $originacionSelectModal.close();
  });

  
  const originacionValidation = () => {
    requiredValidation($originacionID);
  };

  // Listeners 
  $originacionID && $originacionID.addEventListener("input", originacionValidation);
  $originacionID && $originacionID.addEventListener("blur", originacionValidation);

  $originacionSelectBtn && $originacionSelectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    originacionValidation();
    if (Object.keys(errors).length == 0) {
      // Redireccionar al detalle de la originación seleccionada
      const selectedValue = $originacionID.value;
      window.location.href = `${baseUrl}/originacion/${selectedValue}`;
    } 
  });
});