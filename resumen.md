- login
- pagina de acciones con 2 opciones , capacitacion y gestion de acciones
- gestion de acciones: 4 perfiles con distintos permisos: ejecutor, originador, tratador y observador
    - tabla con acciones
    - filtros de busqueda
  
1. ejecutor: 
    - editar acciones
    - modal con descripcion de la accion, formaulario con fecha de finalizacion y archivo adjunto

2. originador: 
    1. Esta pestaña está diseñada para cargar una nueva observación o una Pac o en su defecto abrir nuevamente alguna que ha sido cerrado pero al momento de ser verificada la misma no ha sido cerrada. entre las opciones disponibles de las acciones de la pestaña de gestion de acciones, se encuentran:
          - icono lupa (visualiza pac / observación)
          - icono de la pdf (exportar pac / observación)
          - icon de mas (agrega una tarea a la pac / observación)
          - icono de persona (cambia al responsable de tratamiento)
          - icono recargar ( abre nuevamente una pac / observación)

    2. el boton de cargar abrirá una ventana nueva con un formulario para cargar una nueva pac o observación que contenga:
        - Fecha de inicio
        - lugar
        - origen
        - adjunto
        - observador
        - Ente inspector (desplegble)
        - Sector (desplegble),
      
      Ademas de un boton para generar una nueva carga. y la tabla con las pacs / observaciones. el formualrio de carga de pac / observaciones tendra los siguientes campos:
        - Inciso (desplegable)
        - Fecha de requerida
        - ¿Requiere analisis? (chbx)
        - ¿fecha negociable? (chbx)
        - referncia
        - descripcion (textarea)
        - responsable (desplegable)
        - adjunto (file )
        - botones de guardar y cancelar

3. tratador: mostrara la tabla de pacs / observaciones  que el correspondintes al usuario (pendietes y realizadas). Entre las opciones disponibles de las acciones de la pestaña de gestion de acciones, se encuentran:
    - (lupa) visualizar pac / observación
    - (pdf) exportar pac / observación
    - (lapiz) editar  la pac / observación
  
  En la edicion de la pac constara con 3 secciones:
    - Datos generales de la pac
    - formulario de analisis de la causa (ver pdf)
    - tabla de acciones, con un boton para agregar una nueva accion, boton de guardar y terminar tratamiento
  
  En la edicion de la observacion constara con 3 secciones:
    - Datos generales de la observacion
    - tabla de acciones, con un boton para agregar una nueva accion, boton de guardar y terminar tratamiento

4. rol observador: Cuando la persona a ejecutado la tarea que le fue asignada, un correo le llega al observador para que verifique si la acción tomada es la correcta para corregir el desvío. Tendra para filtar las acciones y una tabla con las siguientes opciones:
    - (lupa) visualizar pac / observación
    - (pdf) exportar pac / observación
    - (lapiz) editar  la pac / observación
    - boton de guardar y cancelar

   En la edicion de la observacion, El observador verifica mediante la evidencia la acción tomada. Si considera que la misma es la adecuadamarca en “si” y luego guarda el cambio. Ahora esta pac/observación se considera verificada y efectiva. Por el contrario si marca en “no” es obligatorio explicar el motivo por el cual considera que la acción no es la adecuada. Ahora esta pac/observación se considera verificada no efectiva. (ver pdf)