window.addEventListener("load", function() {

  const $password = document.querySelector("#password");
	const $toggleIcon = document.querySelector("#toggle-icon");

  $toggleIcon && $toggleIcon.addEventListener("click", () => {
    togglePassword($password, $toggleIcon);
  });

});