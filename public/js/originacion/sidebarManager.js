window.addEventListener("load", () => {
  const sidebar = document.querySelector("#sidebar");
  const toggleBtn = document.querySelector("#toggle");
  const toggleIcon = document.querySelector("#toggle-icon");

  const styleManager = function(){
    if (toggleIcon.classList.contains("fa-bars")) {
      toggleIcon.classList.add("fa-xmark");
      toggleIcon.classList.remove("fa-bars");
    } else {
      toggleIcon.classList.add("fa-bars");
      toggleIcon.classList.remove("fa-xmark");
    }
  }

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    styleManager();
  });

})
