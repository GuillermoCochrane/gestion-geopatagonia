window.addEventListener("load", () => {
  const $form = document.querySelector("#new-content");
  const $nombre = document.querySelector("#nombre");
  const $email = document.querySelector("#email");
  const $password = document.querySelector("#password");
  const $check = document.querySelector("#check");
  const $id = document.querySelector("#id");
  const $btn = document.querySelector("#new-content button");
	const $toggleIcon = document.querySelector("#toggle-icon");
  const $toggleIconCheck = document.querySelector("#toggle-icon-check");

  $toggleIconCheck && $toggleIconCheck.addEventListener("click", () => {
    togglePassword($check, $toggleIconCheck);
  });

	$toggleIcon && $toggleIcon.addEventListener("click", () => {
		togglePassword($password, $toggleIcon);
	});

  const nombreValidation = () => {
      requiredValidation($nombre);
      !errors.nombre && minlengthValidation($nombre,2);
      !errors.nombre && maxlengthValidation($nombre,100);
  };

  const emailValidation = () => {
      requiredValidation($email);
      !errors.email && minlengthValidation($email,7);
      !errors.email && maxlengthValidation($email,50);
      !errors.email && isEmailValidation($email);
      !errors.email && ($id ? uniqueValidation($email, $id.value) : uniqueValidation($email));
  };

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

  $nombre.addEventListener("input",() => nombreValidation());
  $nombre.addEventListener("blur", () => nombreValidation());
  $email.addEventListener("input",() => emailValidation());
  $email.addEventListener("blur", () => emailValidation());
	$password &&	$password.addEventListener("input",() => passwordValidation());
	$password &&	$password.addEventListener("blur", () => passwordValidation());
  $check &&	$check.addEventListener("input",() => confirmPasswordValidation());
  $check &&	$check.addEventListener("blur", () => confirmPasswordValidation());

  $btn.addEventListener("click", (e)=>{
      e.preventDefault();
      nombreValidation();
      emailValidation();
      $password && passwordValidation();
      $check && confirmPasswordValidation();
      if (Object.keys(errors).length == 0) {
          $form.submit();
      }
  });
});