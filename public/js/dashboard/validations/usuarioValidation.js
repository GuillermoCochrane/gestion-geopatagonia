window.addEventListener("load", () => {
  const $form = document.querySelector("#new-content");
  const $nombre = document.querySelector("#nombre");
  const $email = document.querySelector("#email");
  const $password = document.querySelector("#password");
  const $checkPassword = document.querySelector("#check-password");
  const $id = document.querySelector("#id");
  const $btn = document.querySelector("#new-content button");
	const $toggleIcon = document.querySelector("#toggle-icon");
  const $toggleIconCheck = document.querySelector("#toggle-icon-check");

	let togglePassword = (input, icon) => {
		if (input.type == "password"){
				input.type = "text"
				icon.classList.remove("fa-eye");
				icon.classList.add("fa-eye-slash");
		} else {
				input.type = "password"
				icon.classList.remove("fa-eye-slash");
				icon.classList.add("fa-eye");
		}
	}

  $toggleIconCheck.addEventListener("click", () => {
    togglePassword($checkPassword, $toggleIconCheck);
  });

	$toggleIcon.addEventListener("click", () => {
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

  $nombre.addEventListener("input",() => nombreValidation($nombre));
  $nombre.addEventListener("blur", () => nombreValidation($nombre));
  $email.addEventListener("input",() => emailValidation($email));
  $email.addEventListener("blur", () => emailValidation($email));
	$password &&	$password.addEventListener("input",() => passwordValidation($password));
	$password &&	$password.addEventListener("blur", () => passwordValidation($password));	

  $btn.addEventListener("click", (e)=>{
      e.preventDefault();
      nombreValidation($nombre);
      emailValidation($email);
      $password && passwordValidation($password);
      if (Object.keys(errors).length == 0) {
          $form.submit();
      }
  });
});