let errors = {};

const baseUrl = window.location.origin;

//! Funciones para manejar clases CSS
const inputError = (input) => {
  input.classList.remove("input-ok");
  input.classList.add("input-error");
};

const inputOK = (input) => {
  input.classList.remove("input-error");
  input.classList.add("input-ok");
};

//! Función para convertir " _ " a espacios
const underscoreToSpace = (string) => {
  return string.includes('_') 
          ? string.replace(/_/g, ' ') 
          : string;
};

//! Función de utilidad para manejar errores
const handleValidation = (input, validation, errorMessage) => {
  const label = input.id;
  const errorElement = document.querySelector(`#error-${label}`);

  if (!validation) {
    errorElement.innerText = errorMessage;
    errors[label] = errorMessage;
    inputError(input);
  } else {
    errorElement.innerText = '';
    delete errors[label];
    inputOK(input);
  }
};

//! Función para dividir una fecha en  año, mes y día. 
const splitDate = (date) =>{
    // Dividir la fecha en partes (año, mes, día)
    const partesFecha = date.split("-");
    return {
        año: parseInt(partesFecha[0]),
        mes: parseInt(partesFecha[1]) - 1, // Mes (JavaScript cuenta desde 0)
        dia: parseInt(partesFecha[2]), // Día
    }
}

// ! Funciones de validación

// * Validación de campos obligatorios
const requiredValidation = (input) => {
  const validation = !validator.isEmpty(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} es obligatorio`;
  handleValidation(input, validation, errorMessage)
};

// * Validación de longitud mínima
const minlengthValidation = (input,min) => {
  const validation = validator.isLength(input.value, { min });
  const errorMessage = `${underscoreToSpace(input.id)} debe tener mínimo ${min} caracteres`;
  handleValidation(input, validation, errorMessage);
};

// * Validación de longitud máxima
const maxlengthValidation = (input,max) => {
  const validation = validator.isLength(input.value, { max });
  const errorMessage = `${underscoreToSpace(input.id)} debe tener máximo ${max} caracteres`;
  handleValidation(input, validation, errorMessage);
};

// * Validación de formato de email
const isEmailValidation = (input) => {
  const validation = validator.isEmail(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} no es un email válido`;
  handleValidation(input, validation, errorMessage);
};

// * Validación de email único
const uniqueValidation = async (input, id = null) => {
  let endpoint = `${baseUrl}/api/utilities/inUseEmail/${input.value}`;
  if (id) endpoint += `/${id}`;
  const response = await fetch(endpoint);
  const json = await response.json();
  const validation = json.data.inUse === false;
  const errorMessage = `Este ${underscoreToSpace(input.id)} no se encuentra disponible`;
  handleValidation(input, validation, errorMessage);
};

// * Validación de contraseña segura
const strongValidation = (input) => {
  const validation = validator.isStrongPassword(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} debe tener al menos una mayúscula, una minúscula, un número y un caracter especial`;
  handleValidation(input, validation, errorMessage);
};

// * Validación de fechas con formato valido (YYYY-MM-DD)
const isDateValidation = (input) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para YYYY-MM-DD
  const isValidFormat = datePattern.test(input.value); // Verificar el formato

  const {año, mes, dia} = splitDate(input.value);

  const fechaIngresada = new Date(año, mes, dia);
  const isValidDate = (
    fechaIngresada.getFullYear() === año &&
    fechaIngresada.getMonth() === mes &&
    fechaIngresada.getDate() === dia
  );

  // Combinar ambas validaciones
  const validation = isValidFormat && isValidDate;
  const errorMessage = `${underscoreToSpace(input.id)} no es una fecha válida`;
  handleValidation(input, validation, errorMessage);
};

// * Validación que compruebe si la fecha ingresada no sea anterior a la fecha actual
const notOlderValidation = (input) => {
  const {año, mes, dia} = splitDate(input.value);   // Dividir la fecha en partes (año, mes, día)
  const fechaIngresada = new Date(año, mes, dia);
  const fechaActual = new Date();
  // Reiniciar la hora en ambas fechas para comparar solo la fecha
  fechaIngresada.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  // Validar que la fecha ingresada no sea anterior a la fecha actual
  const validation = fechaIngresada >= fechaActual;

  const errorMessage = `${underscoreToSpace(input.id)} no puede ser anterior a hoy`;

  handleValidation(input, validation, errorMessage);
};

// * Validación de extensiones de archivos permitidas
const extentionValidation = (input, allowedExtensions) => {
  const fileName = input.value; 
  const fileExtention = fileName.split('.').pop()?.toLowerCase(); // Extrae la extensión y la convierte a minúsculas

 // Valida la extensión solo si se ha adjuntado un archivo
  const validation = !fileExtention ||  allowedExtensions.includes(fileExtention);

  const errorMessage = `Solo se permiten archivos ${allowedExtensions.join(', ')}`;
  handleValidation(input, validation, errorMessage);
};