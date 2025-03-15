window.addEventListener("load", () => {
    const $form = document.querySelector("#nueva-originacion");
    const $fecha = document.querySelector("#fecha");
    const $btn = document.querySelector("#nueva-originacion button");

    const fechaValidation = () => {
        requiredValidation($fecha);
        !errors.fecha && isDateValidation($fecha);
        !errors.fecha && isDateNotPastValidation($fecha);
    };

    $fecha.addEventListener("input",() => fechaValidation($fecha));
    $fecha.addEventListener("blur", () => fechaValidation($fecha));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        fechaValidation($fecha);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});