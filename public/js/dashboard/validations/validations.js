const errors = {};

const baseUrl = window.location.origin;

// Funciones para manejar clases CSS
const inputError = (input) => {
  input.classList.remove("input-ok");
  input.classList.add("input-error");
};

const inputOK = (input) => {
  input.classList.remove("input-error");
  input.classList.add("input-ok");
};

// Función para convertir " _ " a espacios
const underscoreToSpace = (string) => {
  return string.includes('_') 
          ? string.replace(/_/g, ' ') 
          : string;
};

// Función de utilidad para manejar errores
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

// Funciones de validación
const requiredValidation = (input) => {
  const validation = !validator.isEmpty(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} es obligatorio`;
  handleValidation(input, validation, errorMessage)
};

const minlengthValidation = (input,min) => {
  const validation = validator.isLength(input.value, { min });
  const errorMessage = `${underscoreToSpace(input.id)} debe tener mínimo ${min} caracteres`;
  handleValidation(input, validation, errorMessage);
};

const maxlengthValidation = (input,max) => {
  const validation = validator.isLength(input.value, { max });
  const errorMessage = `${underscoreToSpace(input.id)} debe tener máximo ${max} caracteres`;
  handleValidation(input, validation, errorMessage);
};

const isEmailValidation = (input) => {
  const validation = validator.isEmail(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} no es un email válido`;
  handleValidation(input, validation, errorMessage);
};

const uniqueValidation = async (input) => {
  const response = await fetch(`${baseUrl}/api/utilities/inUseEmail/${input.value}`);
  const json = await response.json();
  const validation = json.data.inUse === false;
  const errorMessage = `Este ${underscoreToSpace(input.id)} no se encuentra disponible`;
  handleValidation(input, validation, errorMessage);
};

const strongValidation = (input) => {
  const validation = validator.isStrongPassword(input.value);
  const errorMessage = `${underscoreToSpace(input.id)} debe tener al menos una mayúscula, una minúscula, un número y un caracter especial`;
  handleValidation(input, validation, errorMessage);
};