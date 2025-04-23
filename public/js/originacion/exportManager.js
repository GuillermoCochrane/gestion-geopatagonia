window.addEventListener("load", () => {
  const $exportForm = document.querySelector("#export-form");
  const $export = document.querySelector("#export-modal");

  $exportForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = $exportForm.dataset.id;

    try {
      const response = await fetch(`${baseUrl}/originacion/observacionPAC/export/${id}`, {
        method: "POST"
      });

      if (!response.ok) throw new Error("Error al generar el PDF");

      // Guardamos el PDF en un blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a"); // Generamos el enlace temporal para descargar el PDF
      a.href = url;                          // Asignamos la URL del blob como el href del enlace
      a.download = `pac-${id}.pdf`;          // Asignamos el nombre del archivo como el atributo download del enlace
      document.body.appendChild(a);          // Agregamos el enlace al body del documento
      a.click();                             // Generamos el click del enlace para descargar el PDF
      a.remove();                            // Eliminamos el enlace del body del documento 
      window.URL.revokeObjectURL(url);       // Liberamos la memoria del URL del blob

      // 🔒 Cerramos el modal manualmente
      closeModal($export);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al exportar el PDF.");
    }
  });
})