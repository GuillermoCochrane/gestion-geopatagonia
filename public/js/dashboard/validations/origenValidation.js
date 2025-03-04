window.addEventListener("load", () => {
    const $form = document.querySelector("#new-content");
    const $origen = document.querySelector("#origen");
    const $btn = document.querySelector("#new-content button");

    console.log("cargo");
    

    const origenlValidation = () => {
        requiredValidation($origen);
        !errors.origen && minlengthValidation($origen,2);
        !errors.origen && maxlengthValidation($origen,100);
    };

    $origen.addEventListener("input",() => origenlValidation($origen));
    $origen.addEventListener("blur", () => origenlValidation($origen));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        origenlValidation($origen);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});