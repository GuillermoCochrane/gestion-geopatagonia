const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, AdjuntoObservacionPAC, Originacion, ObservacionPAC, Accion, Inciso, Formulario } = require("../database/models");
const { Op, where } = require("sequelize");
const utilities = require("./utilities");
const mailutilities = require("./mailUtilities");

/**
* Utilidades para el controlador de originación:
 * - Consulta y formateo de datos maestros (orígenes, sectores, etc.).
 * - Creación/eliminación de registros (originaciones, PACs, adjuntos).
 * - Generación de PDFs y filtros avanzados.
 * @module originacionUtilitites
 * @depends {utilities} - Funciones generales (formateo, validación).
 * @depends {models} - Modelos de Sequelize.
 */
const originacionUtilitites = {
  //  --- Estilos y Scripts ---
  styles: ["task"], // CSS base para las vistas

  pageScript: ["originacion/modalManager", "originacion/selectModalManager"], // Scripts para el manejo de modales

  validationScripts: ["validations", "validator.min"], // Scripts para validaciones

  //Encabezados y vistas
  dashboardHeader: {
    mainLabel: "Originación", 
    newLabel: "Nueva Observación / PAC"
  },
  
  mainSubsection: "./main.ejs", // Ruta de la plantilla EJS base.

  /**
     * Configuración estándar para pop-ups de la UI.
     * @typedef {Object} PopupConfig
     * @property {string} id - ID del elemento en el DOM 
     * @property {string} title - Título del modal 
     * @property {string} [text] - Mensaje principal 
     * @property {Array<{id: string, text: string}>} buttons - Botones de acción.
 */

  /** @type {PopupConfig} - Pop-up de confirmación para eliminar originaciones. */
  confirmPopUp: {
    id: "confirm-pac-delete",
    title: "No hay observaciones o PACs registradas",
    text: "Se eliminará la originación. ¿Estás seguro?",
    buttons: [
      {
        id: "pac-delete",
        text: "Eliminar"       
      },
      {
        id: "pac-cancel",
        text: "Cancelar"
      }
    ]
  },

  /** @type {PopupConfig} - Pop-up para notificar éxito en eliminación. */
  successPopUp: {
    id: "pac-delete-success",
    title: "La eliminación se realizó correctamente",
    buttons: [
      {
        id: "pac-delete-close",
        text: "Cerrar"
      }
    ]
  },

  /** @type {PopupConfig} - Pop-up para notificar error en eliminación. */
  errorPopUp: {
    id: "pac-error",
    title: "Ocurrió un error al eliminar",
    text: "Por favor intente nuevamente",
    buttons: [
      {
        id: "pac-error-close",
        text: "Cerrar"
      }
    ]
  },

  /**
     * Configuración de modelos para creación de registros.
     * @typedef {Object} RegisterConfig
     * @property {number} id - ID único del registro.
     * @property {Sequelize.Model} model - Modelo de Sequelize asociado.
     * @property {boolean} requiresAttachment - Si requiere archivo adjunto.
     * @property {number} [defaultStatus] - Estado inicial (opcional).
 */

  /** @type {Object.<string, RegisterConfig>} - Mapa de configuraciones por tipo. */
  registerData: {
    /** @type {RegisterConfig} - Registro de originación (requiere adjunto). */
    ORIGINACION: { 
      id: 1, 
      model: Originacion,
      requiresAttachment: true, 
    },

    /** @type {RegisterConfig} - Observación/PAC (estado pendiente por defecto). */
    OBSERVACION_PAC: { 
      id: 2, 
      model: ObservacionPAC,
      defaultStatus: 1, // Estado "Pendiente" 
      requiresAttachment: true 
    },

    /** @type {RegisterConfig} - Acción (no requiere adjunto). */
    ACCION: { 
        id: 3, 
        model: Accion,
        requiresAttachment: false  // Cambiar a true cuando se adjunte pruebas
    }
  },

  // Genera el objeto de datos para la vista de error.
  errordata: function(error){
    return {
      styles: this.styles,
      pageScript: ["errorButton"],
      subSection: "../partials/errorManager.ejs",
      title: "Error 500",
      mainTitle: "Error 500",
      secondaryTitle: "Error interno del servidor",
      message: error.message,
      mainError: "mainError",
    };
  },

  // Prepara datos básicos para el head de la vista.
  headerData: function(title){
    return {
      title: title,
      styles: this.styles,
      pageScript: this.pageScript,
    }
  },

  // Devuelve configuración estática para vistas de manejo de originaciones y observaciones / PACs.
  staticData: function(){
    return {
      ...this.headerData("Originaciones"),
      pageScript: [...this.pageScript, ...this.validationScripts, "sectionhandler", "originacion/validations/obsPACValidation", "originacion/validations/originacionValidation"],
      dashboardHeader: this.dashboardHeader,
      subSection: this.mainSubsection,
      confirmPopUp: this.confirmPopUp,
      successPopUp: this.successPopUp,
      errorPopUp: this.errorPopUp,
    }
  },

  // Devuelve datos de una originación específica, con sus relaciones completas
  singleOriginacionData: async function(id){
    try {
      // Validación del ID recibido
      id = Number(id); // Convierte el string a un numero entero
      // Validamos que el id sea un entero positivo
      if (!Number.isInteger(id) || id <= 0) throw new Error("ID Inválido");


      const data = await Originacion.findByPk(id, {
        include: [
          { model: Origen, as: "origen", attributes: utilities.excludeTimestamps() },
          { model: Usuario, as: "observador", attributes: utilities.excludePassword() },
          { model: EnteInspector, as: "ente_inspector", attributes: utilities.excludeTimestamps() },
          { model: Sector, as: "sector", attributes: utilities.excludeTimestamps() },
          { model: AdjuntoOriginacion, as: "adjuntos", attributes: utilities.excludeTimestamps() },
          { model: Formulario, as: "formulario", attributes: utilities.excludeTimestamps()},
          {
            model: ObservacionPAC,
            as: "observaciones_pacs",
            attributes: [
              'id',
              'descripcion',
              'fecha_requerida',
              'referencia',
              'fecha_negociable',
              'requiere_analisis',
              'inciso_id',
              'responsable_id',
              'originacion_id',
              'estado_id'
            ],
            include: [
              {
                model: Inciso,
                as: 'inciso_formulario',
                attributes: ['inciso', 'descripcion'] // o lo que necesites mostrar
              }
            ]
          }
        ]
      });

      //validamos que la consulta tenga información
      if (!data) throw new Error("Originación no encontrada");
      
      //formateamos la fecha de observación
      let plainData = utilities.plainData([data])[0];
      plainData.display_fecha_de_observacion = utilities.formatDateDisplay(plainData.fecha_de_observacion);
      plainData.fecha_de_observacion = utilities.formatDateForm(plainData.fecha_de_observacion);

      return plainData;
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  // Obtiene todas las originaciones con sus relaciones.
  allOriginacionsData: async function(){
    //Modelos asociados a la originación
    const originacionIncludes = [
      { model: Origen, as: 'origen', attributes: utilities.excludeTimestamps() },
      { model: Usuario, as: 'observador', attributes: utilities.excludePassword() },
      { model: Sector, as: 'sector', attributes: utilities.excludeTimestamps() },
      { model: EnteInspector, as: 'ente_inspector', attributes: utilities.excludeTimestamps() },
    ];

    try {
      const originaciones = await Originacion.findAll({
        include: originacionIncludes,
        attributes: utilities.excludeTimestamps(),
        order: [['id', 'ASC']],
      });

      return utilities.dataFormatter(originaciones, ['fecha_de_observacion']);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Obtiene observaciones/PACs formateadas, asociadas a una originación.
  observacionesPACsData: async function(id){
    try {
      const data = await ObservacionPAC.findAll({
        where: {originacion_id: id},
        include: [
          { model: Usuario, as: "responsable", attributes: utilities.excludePassword()},
          { model: Estado, as: "estado", attributes: utilities.excludeTimestamps()},
          { model: Inciso, as: "inciso_formulario", attributes: utilities.excludeTimestamps()},
        ]
      });
      return utilities.dataFormatter(data, ['fecha_requerida']);
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  // Obtiene datos dinámicos, luego de la creacion de registros, para vistas de manejo de originaciones y observaciones / PACs 
  dynamicData: async function(id){
    // Devuelve los datos que varían, para el renderizado dinámico de la vista
    try {
      let tratador = await Usuario.findAll({where: { rol_id: 3}});
      tratador = utilities.dataFormatter(tratador);
      const originacion = await this.singleOriginacionData(id);
      let incisos = await Inciso.findAll(
        {
          where: {
            formulario_id: originacion.formulario_id
          }
        }
      );
      incisos = utilities.dataFormatter(incisos);

      return {
        tratadorData: tratador, // Datos del tratador para el formulario de PACs
        incisosData: incisos, // Incisos de formulario de la originación
        originacionData: originacion, // Datos de la originación corrspondientes al id
        observacionesPACs: await this.observacionesPACsData(id), // Observaciones / PACs de la originación
        originacionSelectData: await this.allOriginacionsData(),
      }
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  //Orquesta la creación/carga de originaciones y observaciones/PACs, notifica, y prepara los datos para la vista
  registerCreationHandler: async function(formData, file, id, nuevaObservacionPAC){
    try {
      // Creación de la originación, si no se pasa el id de una originación existente
      let originationData = null;

      if (!id) {
        originationData = await this.createRegistro(formData, file);
        id = originationData.id;
      } else {
        originationData = await Originacion.findByPk(id);
      }

      // Creación de la observación / PAC, si esta indicado en la variable nuevaObservacionPAC
      if (nuevaObservacionPAC) {
        formData.fecha_negociable = utilities.toBoolean(formData.fecha_negociable);
        formData.requiere_analisis = utilities.toBoolean(formData.requiere_analisis);
        const pacData = await this.createRegistro(formData, file, true);
        // Enviamos un correo electrónico de notificación al observador, si no lo había hecho
        if (!originationData.notificada) {
          const notificationData = await this.orginacionNotificationData(id);
          await mailutilities.sendMail(notificationData.to, notificationData.subject, notificationData.text);
        }
        // Enviamos un correo electrónico de notificación a la persona que asigno la observación/PAC
        const pacNotificationData = await this.pacNotificationData(pacData.id, id);
        await mailutilities.sendMail(pacNotificationData.to, pacNotificationData.subject, pacNotificationData.text);
      }

      const staticData = this.staticData();
      const dynamicData = await this.dynamicData(id);
      const content = await this.originacionContent();

      return {...staticData, ...dynamicData, ...content};
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  // Prepara los datos necesarios para el procesamiento de adjuntos
  adjuntoConfig(file, id, observacion  = false) {

    //Definimos archivo, key y modelo dependiendo del valor de observacion
    const entity = observacion ? 'observacion_pac' : 'originacion';
    const key = `${entity}_id`;
    const fileName = file.filename;
    const filePath = `/documents/${entity}/${fileName}`;

    return {
      Modelo: observacion ? AdjuntoObservacionPAC : AdjuntoOriginacion,
      data: {
        nombre: fileName,
        archivo: filePath,
        descripcion: '-',
        [key]: id
      },
      key: key, 
    };
  },

  // Crea un registro (originación u observación/PAC) en la base de datos.
  createRegistro: async function (data, file, observacion = false) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;

      // Crear la entrada
      observacion && (data.estado_id = data.estado_id || 1); // Estado por defecto (1) para observaciones o PACs
      const registro = await Modelo.create(data);

      // Si se subió un archivo, guardarlo en la base de datos
      if (file) {
        await this.createAdjunto(file, registro.id, observacion);
      }

      return registro;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  // Guarda un archivo adjunto asociado a una originación u observación/PAC.
  createAdjunto: async function (file, id, observacion = false) {
    try {
      const {Modelo, data} = this.adjuntoConfig(file, id, observacion);
      // Crear el adjunto en la base de datos
      const adjunto = await Modelo.create(data);
      return adjunto.id;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  // Edita un registro (originación u observación/PAC) en la base de datos.
  editRegistro: async function (data, file, id, observacion = false, ) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;

      // Editar la entrada del modelo correspondiente
      await Modelo.update(data, {where: {id: id}});

      if (file) {
        await this.editAdjunto(file, id, observacion);
      }

      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Edita  los datos de un archivo adjunto asociado a una originación u observación/PAC.
  editAdjunto: async function (file, id, observacion = false) {
    try {
      const {Modelo, data, key} = this.adjuntoConfig(file, id, observacion);

      let adjuntoID = 0;

      // Verificamos si el adjunto ya existe
      const oldData = (await Modelo.findAll({
        where: {
          [key]: id,
        }
      }))[0];

      if (oldData) {
        // Si existe el adjunto, actualizamos los datos
        await Modelo.update(data, {
          where: {
            id: oldData.id,
          }
        });

        adjuntoID = oldData.id

      } else {
        // Sino crearmos el adjunto en la base de datos
        const newAdjunto = await this.createAdjunto(file, id, observacion);
        adjuntoID = newAdjunto.id;
      }

      return adjuntoID;

    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  // Elimina un registro (originación u observación/PAC) de la base de datos.
  deleteRegistro: async function (id, observacion = false) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;
      // Eliminar la entrada del modelo correspondiente
      await Modelo.destroy({
        where: {id: id}
      });
      return true;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  // Carga datos maestros para formulario de originación, junto con sus relaciones 
  originacionFormData: async function(){
    try {
      // Obtiene los datos de las tablas de la base de datos
      let origenData = await Origen.findAll();
      let enteInspectorData = await EnteInspector.findAll();
      let sectorData = await Sector.findAll();
      let estadosData = await Estado.findAll();
      let observadorData = await Usuario.findAll({where: { rol_id: 4}});
      let formulariosData = await Formulario.findAll();

      // Devuelve los datos formateados
      return {
        origenes: utilities.dataFormatter(origenData),
        observadores: utilities.dataFormatter(observadorData),
        enteInspectores: utilities.dataFormatter(enteInspectorData),
        sectores: utilities.dataFormatter(sectorData),
        estados: utilities.dataFormatter(estadosData),
        originaciones: await this.allOriginacionsData(),
        formularios: utilities.dataFormatter(formulariosData),
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Procesa los filtros del formulario de originaciones y construye el objeto `where` para Sequelize
  originacionFilter: function(filtros) {
    const where = {};
    
    if (filtros.inicio_carga && filtros.fin_carga) {
      where.created_at = { [Op.between]: [filtros.inicio_carga, filtros.fin_carga] };
    } else if (filtros.inicio_carga) {
      where.created_at = { [Op.gte]: filtros.inicio_carga };
    } else if (filtros.fin_carga) {
      where.created_at = { [Op.lte]: filtros.fin_carga };
    }
    
    filtros.id && (where.id = filtros.id);
    filtros.origen_id && (where.origen_id = filtros.origen_id);
    filtros.sector_id && (where.sector_id = filtros.sector_id);
    filtros.ente_inspector_id && (where.ente_inspector_id = filtros.ente_inspector_id);
  
    return where;
  },

  // Consulta observaciones/PACs con sus relaciones y aplica filtros si se indican, formateando datos para la vista
  allPACsData: async function(id = null, filtros = {}) {
    //Criterios opcionales de filtrado
    const where = id ? { id } : {};
    const originacionWhere = this.originacionFilter(filtros);
    filtros.estado_id && (where.estado_id = filtros.estado_id);

    //Sub Relaciones a incluir en la consulta
    const originacionIncludes = [
      { model: Origen, as: 'origen', attributes: utilities.excludeTimestamps() },
      { model: Usuario, as: 'observador', attributes: utilities.excludePassword() },
      { model: Sector, as: 'sector', attributes: utilities.excludeTimestamps() },
      { model: EnteInspector, as: 'ente_inspector', attributes: utilities.excludeTimestamps() },
    ];
    const accionIncludes = [
      { model: Usuario, as: 'ejecutor', attributes: utilities.excludePassword() },
    ];

    // Consulta de las observaciones / PACs
    try {
      const resultados = await ObservacionPAC.findAll({
        where,
        include: [
          { 
            model: Originacion, 
            as: 'originacion', 
            include: originacionIncludes, 
            attributes: utilities.excludeTimestamps(), 
            where: originacionWhere 
          },
          { model: Usuario, as: 'responsable', attributes: utilities.excludePassword() },
          { model: Estado, as: 'estado', attributes: utilities.excludeTimestamps() },
          { model: Accion, as: 'acciones', include: accionIncludes, attributes: utilities.excludeTimestamps() },
        ],
        attributes: utilities.excludeTimestamps(),
        order: [['id', 'ASC']],
      });
      
      // Formateo de las fechas de las observaciones y sus subrelaciones
      let data = utilities.dataFormatter(resultados, 
        ['fecha_requerida'], 
        [
          { parentObject: 'originacion', dateField: 'fecha_de_observacion' }, 
          { parentObject: 'acciones', dateField: 'fecha_realizacion' }
        ]
      );

      // Si se solicita una observación especifica, devolvemos la fecha requerida para visualizar y para el formulario de edición
      if (id){
        data[0].display_fecha_requerida = data[0].fecha_requerida;
        data[0].fecha_requerida = resultados[0].fecha_requerida;
      }

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Obtiene el contenido variable para la vista de originaciones desde la DB.
  originacionContent : async function(filter = {}) {
    try {
      return {
        formData: await this.originacionFormData(),         // Datos maestros para el formulario de originaciones
        pacTableData: await this.allPACsData(null, filter), // Datos de las observaciones/PACs, con filtrado opcional
        originacionSelectData: await this.allOriginacionsData()   // Datos para el selector de originaciones, para la edición de las mismas
      };
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;          // Lanzar el error para manejarlo en el controlador
    }
  },

  //Prepara los datos necesarios para el renderizado de la vista principal de originaciones.
  originacionData: async function(filter = {}) {
    //Datos inmutables para la vista
    const data = this.headerData("Originaciones");
    data.pageScript = [...data.pageScript, ...this.validationScripts, "originacion/validations/originacionValidation", "originacion/validations/filterDateValidation"];

    try {
      const content = await this.originacionContent(filter);
      return {
        ...data,                           //  Configuración (títulos, CSS, scripts)
        ...content,                        //  Datos de DB (form, PACs, originaciones)
        subSection: this.mainSubsection,   //  Ruta de la plantilla EJS base.
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // --- Acciones de Obseravciones / PACs ---

  // Prepara los datos necesarios para renderizar la vista de detalle de una observación/PAC y sus acciones
  pacData: async function(id, action){
    try{
      // Validación del ID recibido
      id = Number(id); // Convierte el string a un numero entero
      // Validamos que el id sea un entero positivo
      if (!Number.isInteger(id) || id <= 0) throw new Error("ID Inválido");
      
      const allPACDatadata = await this.allPACsData(id);
      // Validación de existencia de la observación/PAC
      if (allPACDatadata.length === 0) throw new Error("No se encontró la PAC/Observación");

      // Título dinámico según el valor de requiere_analisis
      const title = allPACDatadata[0].requiere_analisis ? "PAC" : "Observación";
      let data = this.headerData(title);

      // Scripts y estilos específicos de la vista
      data.pageScript = [ ...this.validationScripts, "originacion/sidebarManager", "originacion/actionsModalManager", "originacion/validations/modifyResponsableValidation", "originacion/validations/addActionValidation", "originacion/exportManager", "originacion/validations/obsPACValidation" ];
      data.subSection  = "./actions.ejs";
      data.subSectionStyles = "pac-actions";
      data.action = action;

      // Carga de ejecutores, responsables y datos de la observación/PAC
      data.responsables = await Usuario.findAll({where: { rol_id: 3}});
      data.ejecutores = await Usuario.findAll({where: { rol_id: 1}}); 
      data.pacData = allPACDatadata[0];

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Registra una acción asociada a una observación/PAC
  createAccion: async function(id, data){
    data.observacion_pac_id = id;
    try{
      const newAccion = await Accion.create(data);
      return newAccion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Actualiza uno o más campos de una observación/PAC
  modifyPAC: async function(id, data){
    try{
      const modifiedData = await ObservacionPAC.update(data, {
        where: {id: id},
      });
      return modifiedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Genera un PDF de una observación/PAC a partir de su vista pública
  exportPDF: async function(id, host, protocol){
    try{
      if (!id ||!host || !protocol) throw new Error("Datos insuficientes para generar el PDF");
      const baseUrl = `${protocol}://${host}`;
      const pdf = await utilities.generateURLPDF(`${baseUrl}/originacion/observacionPAC/pdf/${id}`);
      return pdf;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Genera el mensaje de notificación y el mail de la observación/PAC asignada
  pacNotificationData: async function(id, originacionId){
    try{
      const pac = await ObservacionPAC.findByPk(id);
      const user = await Usuario.findByPk(pac.responsable_id);
      const date = utilities.formatDateDisplay(pac.fecha_requerida);
      const description = pac.descripcion;
      const data = mailutilities.pacNotification(user.nombre, date, description, pac.referencia, pac.id, pac.requiere_analisis);
      if (originacionId) {
        const origination = await this.orginacionNotificationData(originacionId);
        const separator ="-------------------------------------------";
        const innerText = `\n${separator}\n --- Datos de la originación --- \n${separator}\n`;
        let newtext = `${data.text} ${innerText} ${origination.text}`;
        data.text = newtext;
      }
      return {...data, to: user.email};
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // Genera el mensaje de notificación y el mail de la originación asignada
  orginacionNotificationData: async function(id){
    try{
      const origination = await Originacion.findByPk(id);
      const user = await Usuario.findByPk(origination.observador_id);
      const date = utilities.formatDateDisplay(origination.fecha_de_observacion);
      const description = origination.lugar;
      const data = mailutilities.orginacionNotification(user.nombre, date, description, origination.id);
      return {...data, to: user.email};
    } catch (error) {
      console.error(error);
      throw error;
    }
  },  

}


module.exports = originacionUtilitites;