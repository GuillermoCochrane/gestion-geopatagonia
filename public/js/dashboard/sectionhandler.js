window.addEventListener("load", () =>{
  let mainButton = document.getElementById("mainButton");
  let newButton = document.getElementById("newButton");
  let mainTitle = document.getElementById("mainTitle");
  let newTitle = document.getElementById("newTitle");
  let mainContent = document.getElementById("main-content");
  let dashboardForm = document.getElementById("dashboard-form");
  
  mainButton.addEventListener("click", () => toggleElement(1));
  newButton.addEventListener("click", () => toggleElement(2));
  
  function toggleElement(buttonNumber) {
      if (buttonNumber === 1) {
          mainTitle.style.display = "block";
          newTitle.style.display = "none";
          mainContent.classList.remove("hidden");
          dashboardForm.classList.add("hidden");
					mainButton.classList.add("inactive");
					newButton.classList.remove("inactive");
      } else if (buttonNumber === 2) {
          mainTitle.style.display = "none";
          newTitle.style.display = "block";
          mainContent.classList.add("hidden");
          dashboardForm.classList.remove("hidden");
					mainButton.classList.remove("inactive");
          newButton.classList.add("inactive");
      }
  }
})