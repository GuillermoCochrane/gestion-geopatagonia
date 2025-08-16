const { Usuario, Inciso, Formulario } = require("../database/models");
const bcrypt = require("bcryptjs");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const crypto = require('crypto');
const { ENCRYPTION_KEY, ENCRYPTION_IV } = process.env;

const utilities = {

    // Datos para vista de error 404
    errorData: {
      title:	"Error 404",
      styles: ["error"],
      pageScript: ["errorButton"],
      mainTitle: "Error 404",
      secondaryTitle: "Página no encontrada",
      message: "La dirección a la que intenta acceder no existe o ha sido modificada.",
    },

    forbiddenData: {
      title:	"Error 403",
      styles: ["error"],
      pageScript: ["errorButton"],
      mainTitle: "Error 403",
      secondaryTitle: "Acceso denegado: Rol no autorizado",
      message: "No tiene los permisos necesarios para acceder a esta sección.",
    },

    timestamps: ["created_at", "updated_at"],

    // Método para convertir fecha a un objeto con día, mes y año
    getDateParts: function(date){
      // Si no se recibe fecha, devolver objeto vacío
      if (!date) return { day: null, month: null, year: null };

      // Forzar interpretación local si es string tipo "yyyy-mm-dd"
      const formattedDate = typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
        ? new Date(date + 'T00:00:00')
        : new Date(date);

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
      if (!day || !month || !year) return ;
  
      return `${day}/${month}/${year}`;
    },

    // Método para devolver la fecha en formato para formularios (yyyy-MM-dd)
    formatDateForm: (date) => {
      const { day, month, year } = utilities.getDateParts(date);
      if (!day || !month || !year) return 'Invalid date';

      return `${year}-${month}-${day}`;
    },

    // Método para devolver una lista de fechas en formato dd / mm / yyyy , para timestamps, propiedades que se pasen como parámetro y propiedades anidadas
    multipleDateFormat: function(records, fields = [], nestedFields = []) {
      for (const record of records) {

        // 1. Timestamps
        if (record.created_at) record.created_at = this.formatDateDisplay(record.created_at);
        if (record.updated_at) record.updated_at = this.formatDateDisplay(record.updated_at);

        // 2. Parámetros directos
        for (const field of fields) {
          if (record[field] != null) {
            record[field] = this.formatDateDisplay(record[field]);
          }
        }

        // 3. Parámetros anidados
        for (const nestedField of nestedFields) {
          let { parentObject, dateField } = nestedField;
          const parent = record[parentObject];
          
          if (Array.isArray(parent)) {
            // Si el paramtro anidado es ARRAY: procesamos cada elemento
            for (const item of parent) {
              if (item && item[dateField] != null) {
                item[dateField] = this.formatDateDisplay(item[dateField]);
              }
            }
          } else if (parent && parent[dateField] != null) {
            // Si parametro anidado es OBJETO: procesamiento normal
            parent[dateField] = this.formatDateDisplay(parent[dateField]);
          }
        }
      }
      return records;
    },

    // Método para convertir en un objeto plano, la información de una instancia de Sequelize 
    plainData: function(data){
      return data.map((register) => register.get({ plain: true }));
    },

    //Formatea fechas de registros de Sequelize
    dataFormatter: function(data=[], fields=[], nestedFields=[]){
      // Si el data no es un array, o esta vacio, devolver vacío
      if (!Array.isArray(data)) return [];
      if (data.length === 0) return [];

      let dataFormatted = utilities.plainData(data);
      dataFormatted = utilities.multipleDateFormat(dataFormatted, fields, nestedFields);
      return dataFormatted;
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
    },

    // Metodo que verifica si una email es se encuentra en uso
    checkEmail: async function(email, id = null){
        let user = await Usuario.findAll({
            where: {
                email: email
            }
        });
        let response = user.length > 0;
        if (id && response && user[0].id == id) response = false;
        return response
    },

    // Método para obtener los incisos de un formulario
    incisos: async function(id){
        let incisos = await Inciso.findAll({
            where: {
                formulario_id: id
            }
        });
        return incisos;
    },

    // Método para encriptar una contraseña
    hashPassword: function(password){
        return bcrypt.hashSync(password, 10);
    },

    // Metodo para remover password de un array de usuarios
    passwordRemover: function(users){
      for (const user of users) {
        delete user.password;
      }
      return users;
    },

    // Metodo para obtener la URL base de una petición
    getBaseURL : function(request){
      const host = request.get("host");
      const protocol = request.protocol;
      return `${protocol}://${host}`
    },

    cryptoValidations: function () {
      const key = ENCRYPTION_KEY;
      const iv = ENCRYPTION_IV;

      // Validamos que se haya definido la clave y el iv en las variables de entorno
      if (!key || !iv) {
        throw new Error('Faltan ENCRYPTION_KEY o ENCRYPTION_IV en el archivo .env');
      }

      // Conviertimos las claves y iv a Buffer con datos binarios
      const keyBuffer = Buffer.from(key, 'hex');
      const ivBuffer = Buffer.from(iv, 'hex');

      // Validamos que la clave y el iv sean de 32 y 16 bytes respectivamente
      if (keyBuffer.length !== 32) {
        throw new Error('ENCRYPTION_KEY debe tener 32 bytes (64 caracteres hex)');
      }

      if (ivBuffer.length !== 16) {
        throw new Error('ENCRYPTION_IV debe tener 16 bytes (32 caracteres hex)');
      }

      return { key: keyBuffer, iv: ivBuffer };
    },

    // Metodo para encriptar un texto
    encrypt: function (text, randomIV = false) {
      let { key, iv } = this.cryptoValidations();

      // Si se solicita IV aleatorio, lo genera en el momento
      if (randomIV) iv = crypto.randomBytes(16);

      // Creamos el cifrador AES-256-CBC con la clave y el IV
      const cipher = crypto.createCipheriv('aes-256-cbc', key, iv );

      // Ciframos el texto
      let encrypted = cipher.update(String(text), 'utf8', 'hex');
      encrypted += cipher.final('hex');

      // Convertimos el IV a hex y lo concatenamos al principio del mensaje cifrado
      const ivHex = iv.toString('hex');
      const encryptedMessage = ivHex + encrypted;
      return encryptedMessage;
    },

    // Metodo para decifrar un texto
    decrypt: function (encryptedText) {
      const { key,} = this.cryptoValidations();

      // Extraemos el IV y el mensaje cifrado
      const ivHex = encryptedText.slice(0, 32);
      const iv = Buffer.from(ivHex, 'hex');
      const encryptedMessage = encryptedText.slice(32);

      // Creamos el decifrador AES-256-CBC con la clave y el IV
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

      // Deciframos el texto
      let decrypted = decipher.update(String(encryptedMessage), 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    },

    // Metodo para generar un PDF a partir de un template
    generatePDF: async function(template, data) {
      try {
        //Creamos el archivo html a partir del template
        const templatePath = path.join(__dirname, "../views/pdf", `${template}.ejs`);
        const html = await ejs.renderFile(templatePath, data);

        //Lanzamos el navegador y cargamos el html
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        //Generamos el pdf
        const pdf = await page.pdf({
          format: "A4",
          printBackground: true,
        });

        //Cerramos el navegador
        await browser.close();
        return pdf;
      } catch (error) {
        console.error("Error generando PDF:", error);
        throw error;
      }
    },

    // Metodo para generar un PDF a partir de una URL
    generateURLPDF: async function(url) {
      try {
        // Configuración de Puppeteer con opciones mejoradas
        const browser = await puppeteer.launch({
          headless: "new",
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
          ]
        });

        const page = await browser.newPage();

        // Navegación a la URL con opciones de espera
        await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 60000 // 60 segundos de timeout
        });

        // Generar PDF con configuraciones profesionales
        const pdf = await page.pdf({
          format: "A4",
          printBackground: true,
          preferCSSPageSize: true, // Respeta @page en CSS
        });

        await browser.close();
        return pdf;

      } catch (error) {
        console.error("Error generando PDF:", error);
        throw error;
      }
    },

    // Metodo para Excluir timestamps de una consulta de Sequelize
    excludeTimestamps: function(){
      return {exclude: this.timestamps}
    },

    // Metodo para Excluir password de una consulta de Sequelize
    excludePassword: function(){
      return {exclude:[...this.timestamps, "password"]}
    },

    // Metodo para convertir un valor a booleano (usado para el contenido de un checkbox)
    toBoolean: function(value) {
      return Boolean(value); 
    }
};

module.exports = utilities;