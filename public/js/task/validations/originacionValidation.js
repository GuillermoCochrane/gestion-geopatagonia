window.addEventListener("load", () => {
    const $form = document.querySelector("#nueva-originacion");
    const $fecha = document.querySelector("#fecha_de_observacion");
    const $lugar = document.querySelector("#lugar");
    const $origen = document.querySelector("#origen_id");
	const $observador = document.querySelector("#observador_id");
    const $insperctor = document.querySelector("#ente_inspector_id");
    const $sector = document.querySelector("#sector_id");
    const $adjunto = document.querySelector("#adjunto");
    const $btn = document.querySelector("#nueva-originacion button");

    console.log("Script de validación de originación iniciado"); // Log de inicio del script

    const fechaValidation = () => {
        requiredValidation($fecha);  
        !errors.fecha_de_observacion && isDateValidation($fecha);
        !errors.fecha_de_observacion && notOlderValidation($fecha);
    };

    const lugarValidation = () => {
        requiredValidation($lugar);
        !errors.lugar && minlengthValidation($lugar, 2);
        !errors.lugar && maxlengthValidation($lugar, 60);
    };

    const origenValidation = () => {
        requiredValidation($origen);
    };

	const observadorValidation = () => {
		requiredValidation($observador);
	};

    const insperctorValidation = () => {
        requiredValidation($insperctor);
    };

    const sectorValidation = () => {
        requiredValidation($sector);
    };

    const adjuntoValidation = () => {
        extentionValidation($adjunto, ["jpg", "png", "pdf"]);
    };

    // Listeners simplificados: no hace falta el callback, ya que la función al no tener parametros se ejecuta directamente
    $fecha.addEventListener("input", fechaValidation); 
    $fecha.addEventListener("blur", fechaValidation);
    $lugar.addEventListener("input", lugarValidation);
    $lugar.addEventListener("blur", lugarValidation);
    $origen.addEventListener("input", origenValidation);
    $origen.addEventListener("blur", origenValidation);
	$observador.addEventListener("input", observadorValidation);
	$observador.addEventListener("blur", observadorValidation);
    $insperctor.addEventListener("input", insperctorValidation);
    $insperctor.addEventListener("blur", insperctorValidation);
    $sector.addEventListener("input", sectorValidation);
    $sector.addEventListener("blur", sectorValidation);
    $adjunto.addEventListener("input", adjuntoValidation);
    $adjunto.addEventListener("blur", adjuntoValidation);

    $btn.addEventListener("click", (e) => {
        e.preventDefault();

        fechaValidation();
        lugarValidation();
        origenValidation();
		observadorValidation();
        insperctorValidation();
        sectorValidation();
        adjuntoValidation();

        if (Object.keys(errors).length == 0) {
            $form.submit();
        } 
    });
});