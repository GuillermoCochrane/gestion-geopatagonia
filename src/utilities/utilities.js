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

};

module.exports = utilities;