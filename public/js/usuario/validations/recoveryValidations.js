window.addEventListener("load", () => {
  const $form = document.querySelector("#login-form");
  const $email = document.querySelector("#email");
  const $rol = document.querySelector("#rol_id");
  const $btn = document.querySelector("#login-btn");
  const $modal = document.querySelector("#notification-modal");
  const $modalButton = document.querySelector("#notification-close");
  const $modalTitle = document.querySelector("#notification-modal-title");

  console.log($modalTitle);
  

  const emailValidation = () => {
      requiredValidation($email);
      !errors.email && minlengthValidation($email,7);
      !errors.email && maxlengthValidation($email,50);
      !errors.email && isEmailValidation($email);
  };

  const rolValidation = () => {
      requiredValidation($rol);
  };

  $email && $email.addEventListener("input",() => emailValidation());
  $email && $email.addEventListener("blur", () => emailValidation());
  $rol && $rol.addEventListener("input",() => rolValidation());
  $rol && $rol.addEventListener("blur", () => rolValidation());

  $btn &&$btn.addEventListener("click", (e)=>{
      e.preventDefault();
      emailValidation();
      rolValidation();

      if (Object.keys(errors).length == 0) {
        $modalTitle.innerText = `${$modalTitle.innerText} ${$email.value}`;
        $modal.showModal();
      }
  });

  $modalButton && $modalButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (Object.keys(errors).length == 0) {
      $form.submit();
    }
  });
});