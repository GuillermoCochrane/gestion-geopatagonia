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

  const responsableValidation = () => {
    requiredValidation($responsable);
  };

  const referenciaValidation = () => {
    // Si requiere análisis, validamos campos
    if ($requiere.checked) {
      // 1. Validar que no esté vacío
      if (requiredValidation($referencia)) {
        // 2. Si no está vacío, validar mínimo 2 caracteres
        minlengthValidation($referencia, 2)
      }
    } else {
      // Si NO requiere análisis, limpiamos errores
      handleValidation($referencia, true, "");
    }
    // 3. Validar máximo 100 caracteres (si no hay errores previos)
    !errors.referencia && maxlengthValidation($referencia, 100);
  };

  const descripcionValidation = () => {
    requiredValidation($descripcion);
    !errors.descripcion && minlengthValidation($descripcion, 2);
    !errors.descripcion && maxlengthValidation($descripcion, 300);
  };

  const adjuntoValidation = () => {
    extentionValidation($adjunto, ["jpg", "png", "pdf"]);
  };

  // Listeners 
  $inciso.addEventListener("input", incisoValidation);
  $inciso.addEventListener("blur", incisoValidation);
  $fecha.addEventListener("input", fechaValidation);
  $fecha.addEventListener("blur", fechaValidation);
  $responsable.addEventListener("input", responsableValidation);
  $responsable.addEventListener("blur", responsableValidation);
  $referencia.addEventListener("input", referenciaValidation);
  $referencia.addEventListener("blur", referenciaValidation);
  $requiere.addEventListener("change", referenciaValidation);
  $descripcion.addEventListener("input", descripcionValidation);
  $descripcion.addEventListener("blur", descripcionValidation);
  $adjunto.addEventListener("input", adjuntoValidation);
  $adjunto.addEventListener("blur", adjuntoValidation);

  $btn.addEventListener("click", (e) => {
    e.preventDefault();

    incisoValidation();
    fechaValidation();
    responsableValidation();
    referenciaValidation();
    descripcionValidation();
    adjuntoValidation();

    if (Object.keys(errors).length == 0) {
      $form.submit();
    } 
  });
})