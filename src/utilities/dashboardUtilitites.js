const db = require("../database/models");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardUtilities = {

  styles: ["dashboard"],

  pageScript: ["dashboard"],

  indexData: () => {
    return {
      subSection: "../../dashboard/index.ejs",
      title: "Panel de control",
      styles: this.styles,
      pageScript: this.pageScript
    }
  },

}

module.exports = dashboardUtilities;