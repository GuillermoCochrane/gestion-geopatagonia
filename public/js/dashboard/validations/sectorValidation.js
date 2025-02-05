window.addEventListener("load", () => {
    const $form = document.querySelector("#dashboard-form");
    const $sector = document.querySelector("#sector");
    const $btn = document.querySelector("#dashboard-form button");

    const sectorValidation = () => {
        requiredValidation($sector);
        !errors.sector && minlengthValidation($sector,2);
        !errors.sector && maxlengthValidation($sector,100);
    };

    $sector.addEventListener("input",() => sectorValidation($sector));
    $sector.addEventListener("blur", () => sectorValidation($sector));

    $btn.addEventListener("click", (e)=>{
        e.preventDefault();
        sectorValidation($sector);
        if (Object.keys(errors).length == 0) {
            $form.submit();
        }
    });
});