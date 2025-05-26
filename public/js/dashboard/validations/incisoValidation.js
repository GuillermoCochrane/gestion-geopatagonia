window.addEventListener("load", () => {
    const $form = document.querySelector("#new-content");
    const $formulario = document.querySelector("#formulario_id");
    const $inciso = document.querySelector("#inciso");
    const $descripcion = document.querySelector("#descripcion");
    const $btn = document.querySelector("#new-content button");

    const formularioValidation = () => {
        requiredValidation($formulario);
    };
    const incisoValidation = () => {
        requiredValidation($inciso);
        !errors.inciso && minlengthValidation($inciso,1);
        !errors.inciso && maxlengthValidation($inciso,20);
    };

    const descripcionValidation = () => {
        !errors.descripcion && maxlengthValidation($descripcion,100);
    };

    $formulario.addEventListener("input",() => formularioValidation());
    $formulario.addEventListener("blur", () => formularioValidation());
    $inciso.addEventListener("input",() => incisoValidation($inciso));
    $inciso.addEventListener("blur", () => incisoValidation($inciso));
    $descripcion.addEventListener("input",() => descripcionValidation($descripcion));
    $descripcion.addEventListener("blur", () => descripcionValidation($descripcion));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        incisoValidation($inciso);
        descripcionValidation($descripcion);
        formularioValidation();
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});