window.addEventListener("load", () => {
  const $form = document.querySelector("#change-email-form");
  const $oldEmail = document.querySelector("#oldEmail");
  const $email = document.querySelector("#email");
  const $check = document.querySelector("#check");
  const $btn = document.querySelector("#set-email-btn");

  const emailsValidation = (email) => {
      requiredValidation(email);
      !errors[email.id] && minlengthValidation(email,7);
      !errors[email.id] && maxlengthValidation(email,100);
      !errors[email.id] && isEmailValidation(email);
  };

  const oldEmailValidation = () => {
      emailsValidation($oldEmail);
  };

  const emailValidation = () => {
      emailsValidation($email);
  };

  const checkValidation = () => {
      emailsValidation($check);
  };

  $oldEmail && $oldEmail.addEventListener("input",() => oldEmailValidation());
  $oldEmail && $oldEmail.addEventListener("blur", () => oldEmailValidation());
  $email && $email.addEventListener("input",() => emailValidation());
  $email && $email.addEventListener("blur", () => emailValidation());
  $check && $check.addEventListener("input",() => checkValidation()); 
  $check && $check.addEventListener("blur", () => checkValidation());

  $btn &&$btn.addEventListener("click", (e)=>{
      e.preventDefault();
      oldEmailValidation();
      emailValidation();
      checkValidation();

      if (Object.keys(errors).length == 0) {
        $form.submit();
      }
  });

});