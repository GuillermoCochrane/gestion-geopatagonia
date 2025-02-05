window.addEventListener("load", () => {
  const $form = document.querySelector("#dashboard-form");
  const $nombre = document.querySelector("#nombre");
  const $email = document.querySelector("#email");
  const $password = document.querySelector("#password");
  const $btn = document.querySelector("#dashboard-form button");

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
      !errors.email && uniqueValidation($email);
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
  $password.addEventListener("input",() => passwordValidation($password));
  $password.addEventListener("blur", () => passwordValidation($password));

  $btn.addEventListener("click", (e)=>{
      e.preventDefault();
      nombreValidation($nombre);
      emailValidation($email);
      passwordValidation($password);
      if (Object.keys(errors).length == 0) {
          $form.submit();
      }
  });
});