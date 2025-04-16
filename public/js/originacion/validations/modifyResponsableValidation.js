window.addEventListener("load", () => {
  const $form = document.querySelector("#modify-form");
  const $responsable = document.querySelector("#responsable_id");
  const $btn = document.querySelector("#modify-save");

  const responsableValidation = () => {
    requiredValidation($responsable);
  };

  // Listeners 
  $responsable.addEventListener("input", responsableValidation);
  $responsable.addEventListener("blur", responsableValidation);

  $btn.addEventListener("click", (e) => {
    e.preventDefault();
    responsableValidation();
    if (Object.keys(errors).length == 0) {
      $form.submit();
    } 
  });
})