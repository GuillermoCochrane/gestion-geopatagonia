window.addEventListener("load", () => {
    const $form = document.querySelector("#nueva-originacion");
    const $fecha = document.querySelector("#fecha_de_observacion");
	const $lugar = document.querySelector("#lugar");
    const $btn = document.querySelector("#nueva-originacion button");

    console.log("Script de validación de originación iniciado"); // Log de inicio del script

    const fechaValidation = () => {
		requiredValidation($fecha);  
		!errors.fecha_de_observacion && isDateValidation($fecha);
		!errors.fecha_de_observacion && notOlderValidation($fecha);
    };
	const lugarValidation = () => {
		requiredValidation($lugar);
		!errors.lugar && minlengthValidation($lugar,2);
		!errors.lugar && maxlengthValidation($lugar,60);
	};

    $fecha.addEventListener("input", () => fechaValidation($fecha));
    $fecha.addEventListener("blur", () => fechaValidation($fecha));
	$lugar.addEventListener("input", () => lugarValidation($lugar));
	$lugar.addEventListener("blur", () => lugarValidation($lugar));

    $btn.addEventListener("click", (e) => {
		e.preventDefault();
		fechaValidation($fecha);
		lugarValidation($lugar);

		if (Object.keys(errors).length == 0) {
			$form.submit();
		} 
    });
});