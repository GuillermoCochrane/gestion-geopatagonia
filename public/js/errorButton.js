window.addEventListener("load", function() {
  const backButton = document.querySelector("#back-button");

  function goBack() {
    if (document.referrer) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  }

  backButton.addEventListener("click", goBack);
});