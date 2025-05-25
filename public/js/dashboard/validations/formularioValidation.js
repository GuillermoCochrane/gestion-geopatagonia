window.addEventListener("load", () => {
    const $form = document.querySelector("#new-content");
    const $codigo = document.querySelector("#codigo");
    const $descripcion = document.querySelector("#descripcion");
    const $btn = document.querySelector("#new-content button");

    const codigoValidation = () => {
        requiredValidation($codigo);
        !errors.codigo && minlengthValidation($codigo,2);
        !errors.codigo && maxlengthValidation($codigo,20);
    };

    const descripcionValidation = () => {
        !errors.descripcion && maxlengthValidation($descripcion,100);
    };

    $codigo.addEventListener("input",() => codigoValidation($codigo));
    $codigo.addEventListener("blur", () => codigoValidation($codigo));
    $descripcion.addEventListener("input",() => descripcionValidation($descripcion));
    $descripcion.addEventListener("blur", () => descripcionValidation($descripcion));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        codigoValidation($codigo);
        descripcionValidation($descripcion);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});