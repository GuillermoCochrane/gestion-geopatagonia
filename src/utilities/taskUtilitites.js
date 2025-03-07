const utilities = require("./utilities");

const taskUtilities = {
  styles: ["task"],

  pageScript: ["task/modalManager", "sectionhandler"],

  originacionData: function(){
    return {
      title: "Originaciones",
      styles: this.styles,
      pageScript: this.pageScript,
    }
  },
}

module.exports = taskUtilities;