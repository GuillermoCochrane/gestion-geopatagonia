const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, AdjuntoObservacionPAC, Originacion, ObservacionPAC } = require("../database/models");
const utilities = require("./utilities");

const taskUtilities = {
  styles: ["task"],

  pageScript: ["originacion/modalManager"],

  validationScripts: ["validations", "validator.min"],
  
  dashboardHeader: {
    mainLabel: "Originación", 
    newLabel: "Nueva Observación / PAC"
  },

  timestamps: ["created_at", "updated_at"],
  
  mainSubsection: "./main.ejs",

  confirmPopUp: {
    id: "confirm-pac-delete",
    title: "No hay observaciones registradas",
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

  successPopUp: {
    id: "pac-delete-success",
    title: "La observación se eliminó correctamente",
    buttons: [
      {
        id: "pac-delete-close",
        text: "Cerrar"
      }
    ]
  },

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

  excludeTimestamps: function(){
    return {exclude: this.timestamps}
  },

  excludePassword: function(){
    return {exclude:[...this.timestamps, "password"]}
  },

  headerData: function(title){
    return {
      title: title,
      styles: this.styles,
      pageScript: this.pageScript,
    }
  },

  dataFormatter: function(data){
    let dataFormatted = utilities.plainData(data);
    if (data.length === 0) return [];
    dataFormatted = utilities.multipleDateFormat(dataFormatted);
    return dataFormatted;
  },

  originacionFormData: async function(){
    try {
      let origenData = await Origen.findAll();
      origenData = this.dataFormatter(origenData);
      let enteInspectorData = await EnteInspector.findAll();
      enteInspectorData = this.dataFormatter(enteInspectorData);
      let sectorData = await Sector.findAll();
      sectorData = this.dataFormatter(sectorData);
      let observadorData = await Usuario.findAll({where: { rol_id: 4}});
      observadorData = this.dataFormatter(observadorData);
      observadorData = utilities.passwordRemover(observadorData);

      return {
        origenes: origenData,
        observadores: observadorData,
        enteInspectores: enteInspectorData,
        sectores: sectorData,
      }
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  originacionData: async function(){
    let data = this.headerData("Originaciones");
    data.pageScript = [...data.pageScript, ...this.validationScripts, "originacion/validations/originacionValidation"];
    let formData = {};
    let pacTableData = [];
    try {
      formData = await this.originacionFormData();
      pacTableData = await this.allPACsData();
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
    data.formData = formData;
    data.pacTableData = pacTableData;
    data.subSection = this.mainSubsection;
    return data;
  },

  originacionPACData: async function(formData, file, id, nuevaObservacionPAC){
    let data = this.headerData("Originaciones");
    data.pageScript = [...data.pageScript, ...this.validationScripts, "sectionhandler", "originacion/validations/obsPACValidation"]; 
    data.dashboardHeader = this.dashboardHeader;
    try {
      // Creación de la originación, si no se pasa el id de una originación existente
      if (!id) {
        const originacion = await this.createRegistro(formData, file); // Creación de la originación que devuelve un objeto con la originación y el adjunto
        id = originacion.registro.id;
      }
      // Creación de la observación / PAC, si esta indicado en la variable nuevaObservacionPAC
      if (nuevaObservacionPAC) {
        //Cambio de valores de fecha_negociable y requiere_analisis a booleanos
        formData.fecha_negociable ? formData.fecha_negociable = true : formData.fecha_negociable = false;
        formData.requiere_analisis ? formData.requiere_analisis = true : formData.requiere_analisis = false
        await this.createRegistro(formData, file, true);
      }

      // Obtener los datos de la originación
      const newOriginationData = await this.singleOriginacionData(id); 
      newOriginationData.fecha_de_observacion = utilities.formatDateDisplay(newOriginationData.fecha_de_observacion);

      // Obtener las observaciones / PACs de la originación
      let observacionesPACs = await this.observacionesPACs(id);
      observacionesPACs = utilities.plainData(observacionesPACs);
      observacionesPACs = utilities.multipleDateFormat(observacionesPACs, ['fecha_requerida']);

      //Datos del tratador para el formulario de PACs
      let tratador = await Usuario.findAll({where: { rol_id: 3}});
      tratador = this.dataFormatter(tratador);

      //Datos adicionales para el el renderizado de la vista
      data.oldData = {originacion_id: id};
      data.originacionData = newOriginationData;
      data.tratadorData = tratador;
      data.observacionesPACs = observacionesPACs;
      data.confirmPopUp = this.confirmPopUp;
      data.successPopUp = this.successPopUp;
      data.errorPopUp = this.errorPopUp;
      data.subSection = this.mainSubsection;
      return data;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  singleOriginacionData: async function(id){
    try {
      const data = await Originacion.findAll({
        where: {id: id},
        include: [
          { model: Origen, as: "origen", attributes: this.excludeTimestamps() },
          { model: Usuario, as: "observador", attributes: this.excludePassword() },
          { model: EnteInspector, as: "ente_inspector", attributes: this.excludeTimestamps() },
          { model: Sector, as: "sector", attributes: this.excludeTimestamps() },
          { model: AdjuntoOriginacion, as: "adjuntos", attributes: this.excludeTimestamps() },
          { model: ObservacionPAC, as: "observaciones_pacs", attributes: ['id', 'inciso', 'descripcion', 'fecha_requerida', 'referencia', 'fecha_negociable', 'requiere_analisis', 'responsable_id', 'originacion_id', 'estado_id'] },
        ]
      });      
      return utilities.plainData(data)[0];
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  observacionesPACs: async function(id){
    try {
      const data = await ObservacionPAC.findAll({
        where: {originacion_id: id},
        include: [
          { model: Usuario, as: "responsable", attributes: this.excludePassword()},
          { model: Estado, as: "estado", attributes: this.excludeTimestamps()},
        ]
      });
      return data;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;
    }
  },

  createRegistro: async function (data, file, observacion = false) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;
      // Crear la entrada
      data.estado_id = data.estado_id || 1; // Estado por defecto (1)
      const registro = await Modelo.create(data);
      // Si se subió un archivo, guardarlo en la base de datos
      let adjunto = {};
      if (file) {
        adjunto = await this.createAdjunto(file, registro.id, observacion);
      }
      // Devolver el registro creado
      return {registro, adjunto};
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },

  createAdjunto: async function (file, id, observacion = false) {
    try {
      //Definimos archivo, key  y modelo dependiendo del valor de observacion
      const archivo = observacion 
        ? `/documents/observacion_pac/${file.originalname}`  // ← TRUE: Observación/PAC
        : `/documents/originacion/${file.originalname}`;     // ← FALSE: Originación

      const key = observacion 
        ? 'observacion_pac_id' 
        : 'originacion_id';

      const Modelo = observacion 
        ? AdjuntoObservacionPAC 
        : AdjuntoOriginacion;

      // Construir el objeto de datos para el adjunto
      const data = {
        nombre: file.originalname,
        archivo: archivo, 
        descripcion: '-',
        [key]: id, //Asociar el adjunto a la entidad usando el ID proporcionado
      };
      // Crear el adjunto en la base de datos
      const adjunto = await Modelo.create(data);
      return adjunto;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },

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
      console.error(error); // Registro del error para depuración
      throw error; // Lanzar el error para manejarlo en el controlador
    }
  },

  allPACsData: async function(id = null) {
    const where = id ? { id } : {};
    const originacionIncludes = [
      { model: Origen, as: 'origen', attributes: this.excludeTimestamps() },
      { model: Usuario, as: 'observador', attributes: this.excludePassword() },
      { model: Sector, as: 'sector', attributes: this.excludeTimestamps() },
      { model: EnteInspector, as: 'ente_inspector', attributes: this.excludeTimestamps() },
    ];
    try {
      const resultados = await ObservacionPAC.findAll({
        include: [
          { model: Originacion, as: 'originacion', include: originacionIncludes, attributes: this.excludeTimestamps() },
          { model: Usuario, as: 'responsable', attributes: this.excludePassword() },
          { model: Estado, as: 'estado', attributes: this.excludeTimestamps() }
        ],
        attributes: this.excludeTimestamps(),
        where,
      });
      let data = utilities.plainData(resultados);
      data = utilities.multipleDateFormat(data, ['fecha_requerida'], [{ parentObject: 'originacion', dateField: 'fecha_de_observacion' }]);
      return data; 
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  pacData: async function(id){
    try{
      let data = this.headerData("Observacion / PAC");
      data.subSection  = "./actions.ejs";
      data.subSectionStyles = "actions-container";
      const allPACDatadata = await this.allPACsData(id);
      data.pacData = allPACDatadata[0];
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = taskUtilities;