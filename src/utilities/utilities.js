const utilities = {
    // Método para convertir fecha a un objeto con día, mes y año
    getDateParts: function(date){
      // Si no se recibe fecha, devolver objeto vacío
      if (!date) return { day: null, month: null, year: null };
      const formattedDate = new Date(date);
      // Si no se pudo convertir la fecha, devolver objeto vacío
      if (isNaN(formattedDate)) return { day: null, month: null, year: null };

      return {
        day: String(formattedDate.getDate()).padStart(2, '0'),
        month: String(formattedDate.getMonth() + 1).padStart(2, '0'),
        year: String(formattedDate.getFullYear()),
      };
    },

    // Método para devolver la fecha en formato dd / mm / yyyy
    formatDateDisplay: function(date){
      const { day, month, year } = this.getDateParts(date);
      if (!day || !month || !year) return 'Fecha inválida';
  
      return `${day}/${month}/${year}`;
    },

    // Método para devolver la fecha en formato para formularios (yyyy-MM-dd)
    formatDateForm: (date) => {
      const { day, month, year } = utilities.getDateParts(date);
      if (!day || !month || !year) return 'Invalid date';

      return `${year}-${month}-${day}`;
    },

    // Método para devolver una lista de fechas en formato dd / mm / yyyy
    multipleDateFormat: function(dates){
      for(const date of dates){
        date.created_at = this.formatDateDisplay(date.created_at);
        date.updated_at = this.formatDateDisplay(date.updated_at);
      }
      return dates;
    },

    // Método para cambiar una cadena de texto a con "_" a espacios o a "" y poner las primeras letras en mayúsculas
    adjustUnderscores: function (string, method) {
      let palabras = [];
      // Si hay "_" en el string, separa las palabras; sino, pone el string en un array
      if (string.includes('_')) {
          let nuevoStr = string.replace(/_/g, ' ');  
          palabras = nuevoStr.split(' ');
      } else {
        palabras.push(string);
      }
      string = "";  
      for (const palabra of palabras) {
        // Pone la primera letra en mayúscula
        string += this.adjustCase(palabra, true);
        if (method) string += " ";
      } 
      string = string.trim();
      return string;
    },

    // Método para cambiar a mayúsculas o minúsculas la primera letra de cada palabra
    adjustCase: function(string, capitalize) {
      return capitalize
          ? string.charAt(0).toUpperCase() + string.slice(1)
          : string.charAt(0).toLowerCase() + string.slice(1);
    }

};

module.exports = utilities;