window.addEventListener("load", () => {
  const $form = document.querySelector("#new-password-form");
  const $password = document.querySelector("#password");
  const $check = document.querySelector("#check");
  const $btn = document.querySelector("#new-password-btn");

  const passwordValidation = () => {
      requiredValidation($password);
      !errors.password && minlengthValidation($password,8);
      !errors.password && strongValidation($password);
  };

  const confirmPasswordValidation = () => {
      requiredValidation($check);
      !errors.check && minlengthValidation($check,8);
      !errors.check && strongValidation($check);
      !errors.check && checkPasswordValidation($check, $password);
  };

	$password &&	$password.addEventListener("input",() => passwordValidation());
	$password &&	$password.addEventListener("blur", () => passwordValidation());
  $check &&	$check.addEventListener("input",() => confirmPasswordValidation());
  $check &&	$check.addEventListener("blur", () => confirmPasswordValidation());

  $btn.addEventListener("click", (e) => {
      e.preventDefault();
      $password && passwordValidation();
      $check && confirmPasswordValidation();
      if (Object.keys(errors).length == 0) {
          $form.submit();
      }
  });
});