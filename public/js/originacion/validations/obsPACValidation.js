window.addEventListener("load", () => {
  const $form = document.querySelector("#new-content");
  const $inciso = document.querySelector("#inciso");
  const $fecha = document.querySelector("#fecha_requerida");
  const $responsable = document.querySelector("#responsable_id");
  const $requiere = document.querySelector("#requiere_analisis");
  const $referencia = document.querySelector("#referencia");
  const $descripcion = document.querySelector("#descripcion");
  const $adjunto = document.querySelector("#adjunto");
  const $btn = document.querySelector("#new-content button");
  
  const incisoValidation = () => {
    maxlengthValidation($inciso, 5);
  };

  const fechaValidation = () => {
    requiredValidation($fecha);
    !errors.fecha_requerida && isDateValidation($fecha);
    !errors.fecha_requerida && notOlderValidation($fecha);
  };

  // Listeners 
  $inciso.addEventListener("input", incisoValidation);
  $inciso.addEventListener("blur", incisoValidation);
  $fecha.addEventListener("input", fechaValidation);
  $fecha.addEventListener("blur", fechaValidation);

  $btn.addEventListener("click", (e) => {
    e.preventDefault();

    incisoValidation();
    fechaValidation();

    if (Object.keys(errors).length == 0) {
      $form.submit();
    } 
  });
})