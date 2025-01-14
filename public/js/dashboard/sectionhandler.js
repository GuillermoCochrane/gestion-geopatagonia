window.addEventListener("load", () =>{
  let mainButton = document.getElementById("mainButton");
  let newButton = document.getElementById("newButton");
  let mainTitle = document.getElementById("mainTitle");
  let newTitle = document.getElementById("newTitle");
  let mainContent = document.getElementById("main-content");
  let newContent = document.getElementById("new-content");
  
  mainButton.addEventListener("click", () => toggleElement(1));
  newButton.addEventListener("click", () => toggleElement(2));
  
  function toggleElement(buttonNumber) {
      if (buttonNumber === 1) {
          mainTitle.style.display = "block";
          newTitle.style.display = "none";
          mainContent.style.display = "block";
          newContent.style.display = "none";
      } else if (buttonNumber === 2) {
          mainTitle.style.display = "none";
          newTitle.style.display = "block";
          mainContent.style.display = "none";
          newContent.style.display = "block";
      }
  }
})