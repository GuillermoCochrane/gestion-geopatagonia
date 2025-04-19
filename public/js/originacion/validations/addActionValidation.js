window.addEventListener("load", () => {
  const $form = document.querySelector("#add-form");
  const $ejecutor = document.querySelector("#ejecutor_id");
  const $accion = document.querySelector("#accion");
  const $btn = document.querySelector("#add-save");

  const ejecutorValidation = () => {
    requiredValidation($ejecutor);
  };

  const accionValidation = () => {
    requiredValidation($accion);
    !errors.accion && minlengthValidation($accion, 2);
    !errors.accion && maxlengthValidation($accion, 300);
  };

  // Listeners 
  $ejecutor.addEventListener("input", ejecutorValidation);
  $ejecutor.addEventListener("blur", ejecutorValidation);
  $accion.addEventListener("input", accionValidation);
  $accion.addEventListener("blur", accionValidation);

  $btn.addEventListener("click", (e) => {
    e.preventDefault();
    ejecutorValidation();
    accionValidation();
    if (Object.keys(errors).length == 0) {
      $form.submit();
    } 
  });
})