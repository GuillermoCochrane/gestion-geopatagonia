window.addEventListener("load", () => {
    const $form = document.querySelector("#dashboard-form");
    const $rol = document.querySelector("#rol");
    const $btn = document.querySelector("#dashboard-form button");

    const rolValidation = () => {
        requiredValidation($rol);
        errors.rol ? null : minlengthValidation($rol,2);
        errors.rol ? null : maxlengthValidation($rol,60);
    };

    $rol.addEventListener("input",() => rolValidation($rol));
    $rol.addEventListener("blur", () => rolValidation($rol));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        rolValidation($rol);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});