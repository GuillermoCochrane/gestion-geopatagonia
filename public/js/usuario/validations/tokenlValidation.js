window.addEventListener("load", () => {
  const $form = document.querySelector("#validate-token-form");
  const $btn = document.querySelector("#token-btn");
  const $token = document.querySelector("#token");

  const tokenValidation = () => {
    requiredValidation($token);
  };

  $token &&	$token.addEventListener("input",() => tokenValidation());
  $token &&	$token.addEventListener("blur", () => tokenValidation());

  $btn.addEventListener("click", (e) => {
    e.preventDefault();
    tokenValidation();
    if (Object.keys(errors).length == 0) {
      $form.submit();
    }
  });
});