window.addEventListener("load", function() {
  const selectFormulario = document.querySelector("#formulario");
  const selectInciso = document.querySelector("#inciso");

  // Opción inicial deshabilitada
  selectInciso.innerHTML = '<option value="" disabled selected>Debe seleccionar un formulario</option>';

  selectFormulario.addEventListener("change", function() {
    const formulario_id = selectFormulario.value;
    
    // Mensaje de carga (se muestra inmediatamente)
    selectInciso.innerHTML = '<option value="">Cargando incisos...</option>';

    // Simular un delay de 1 segundo (1000ms) antes de hacer fetch
    setTimeout(() => {
      fetch(`/api/utilities/incisos/${formulario_id}`)
        .then(response => response.json())
        .then(data => {
          if (data.data.incisos_encotrados) {
            selectInciso.innerHTML = '<option value="">Todos</option>';
            data.data.incisos.forEach(inciso => { //creamos las opciones con los incisos que devuelve el Endpoint
              const option = document.createElement("option");
              option.value = inciso.id;
              option.text = inciso.inciso;
              selectInciso.appendChild(option);
            });
          } else {
            selectInciso.innerHTML = '<option value="">No hay incisos para este formulario</option>';
          }
        })
        .catch(error => {
          console.error("Error obteniendo incisos:", error);
          selectInciso.innerHTML = '<option value="">Error al cargar incisos</option>';
        });
    }, 300); // Delay de 0.3s
  });
});