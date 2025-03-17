window.addEventListener("load", () => {
    const $form = document.querySelector("#nueva-originacion");
    const $fecha = document.querySelector("#fecha_de_observacion");
    const $lugar = document.querySelector("#lugar");
    const $origen = document.querySelector("#origen_id");
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

    // Listeners simplificados
    $fecha.addEventListener("input", fechaValidation);
    $fecha.addEventListener("blur", fechaValidation);
    $lugar.addEventListener("input", lugarValidation);
    $lugar.addEventListener("blur", lugarValidation);
    $origen.addEventListener("input", origenValidation);
    $origen.addEventListener("blur", origenValidation);

    $btn.addEventListener("click", (e) => {
        e.preventDefault();

        fechaValidation();
        lugarValidation();
        origenValidation();

        if (Object.keys(errors).length == 0) {
            $form.submit();
        } 
    });
});