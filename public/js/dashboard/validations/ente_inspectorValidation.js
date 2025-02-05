window.addEventListener("load", () => {
    const $form = document.querySelector("#dashboard-form");
    const $ente_inspector = document.querySelector("#ente_inspector");
    const $btn = document.querySelector("#dashboard-form button");

    const ente_inspectorValidation = () => {
        requiredValidation($ente_inspector);
        !errors.ente_inspector && minlengthValidation($ente_inspector,2);
        !errors.ente_inspector && maxlengthValidation($ente_inspector,60);
    };

    $ente_inspector.addEventListener("input",() => ente_inspectorValidation($ente_inspector));
    $ente_inspector.addEventListener("blur", () => ente_inspectorValidation($ente_inspector));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        ente_inspectorValidation($ente_inspector);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});