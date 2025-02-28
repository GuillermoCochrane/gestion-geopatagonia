window.addEventListener("load", () =>{
  const modal = document.getElementById("modal");
  const modalCloser = document.getElementById("modal-closer");
  const modalOpener = document.getElementById("modal-opener");

  modalOpener.addEventListener("click", () => modal.showModal());
  modalCloser.addEventListener("click", () => modal.close());
})
