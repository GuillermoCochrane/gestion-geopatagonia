window.addEventListener("load", () => {
    const $form = document.querySelector("#nueva-originacion");
    const $fecha = document.querySelector("#fecha_de_observacion");
    const $btn = document.querySelector("#nueva-originacion button");

    console.log("Script de validación de originación iniciado"); // Log de inicio del script

    const fechaValidation = () => {
		requiredValidation($fecha);  
		!errors.fecha_de_observacion && isDateValidation($fecha);
		!errors.fecha_de_observacion && isDateNotPastValidation($fecha);
    };

    $fecha.addEventListener("input", () => fechaValidation($fecha));
    $fecha.addEventListener("blur", () => fechaValidation($fecha));

    $btn.addEventListener("click", (e) => {
		e.preventDefault();
		fechaValidation($fecha);

		if (Object.keys(errors).length == 0) {
			console.log("No hay errores. Enviando formulario..."); // Log de envío del formulario
			$form.submit();
		} else {
			console.log("Errores encontrados. No se puede enviar el formulario."); // Log de errores encontrados
		}
    });
  });