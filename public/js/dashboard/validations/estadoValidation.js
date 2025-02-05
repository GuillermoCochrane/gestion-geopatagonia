window.addEventListener("load", () => {
    const $form = document.querySelector("#dashboard-form");
    const $estado = document.querySelector("#estado");
    const $descripcion = document.querySelector("#descripcion");
    const $btn = document.querySelector("#dashboard-form button");

    const estadoValidation = () => {
        requiredValidation($estado);
        !errors.estado && minlengthValidation($estado,2);
        !errors.estado && maxlengthValidation($estado,60);
    };

    const descripcionValidation = () => {
        !errors.descripcion && maxlengthValidation($descripcion,300);
    };

    $estado.addEventListener("input",() => estadoValidation($estado));
    $estado.addEventListener("blur", () => estadoValidation($estado));
    $descripcion.addEventListener("input",() => descripcionValidation($descripcion));
    $descripcion.addEventListener("blur", () => descripcionValidation($descripcion));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        estadoValidation($estado);
        descripcionValidation($descripcion);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});