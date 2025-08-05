window.addEventListener("load", function() {

  const $password = document.querySelector("#password");
	const $toggleIcon = document.querySelector("#toggle-icon");
  const $repeatPassword = document.querySelector("#check");
  const $repeatToggleIcon = document.querySelector("#repeat-toggle-icon");

  $toggleIcon && $toggleIcon.addEventListener("click", () => {
    togglePassword($password, $toggleIcon);
  });

  $repeatToggleIcon && $repeatToggleIcon.addEventListener("click", () => {
    togglePassword($repeatPassword, $repeatToggleIcon);
  });

});