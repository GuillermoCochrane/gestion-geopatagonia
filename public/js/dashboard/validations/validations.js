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

// Función para convertir underscores a espacios
const underscoreToSpace = (string) => {
  return string.includes('_') 
          ? string.replace(/_/g, ' ') 
          : string;
};

// Función de utilidad para manejar errores
const handleValidation = (input, isValid, errorMessage) => {
  const label = input.id;
  const errorElement = document.querySelector(`#error-${label}`);

  if (!isValid) {
    errorElement.innerText = errorMessage;
    errors[label] = errorMessage;
    inputError(input);
  } else {
    errorElement.innerText = '';
    delete errors[label];
    inputOK(input);
  }
};

const requiredValidation = (input) => {
  let label = input.id;
  let error = document.querySelector(`#error-${label}`);
  if(validator.isEmpty(input.value)){
      let errormsg = `${underscoreToSpace(label)} es obligatorio`;
      error.innerText =  errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      delete errors[label];
      inputOK(input);
  }
};

const minlengthValidation = (input,min) => {
  let label = input.id;
  let error = document.querySelector( `#error-${label}`);
  if(!validator.isLength(input.value, {min})){
      let errormsg = `${underscoreToSpace(label)} debe tener mínimo ${min} caracteres`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};

const maxlengthValidation = (input,max) => {
  let label = input.id;
  let error = document.querySelector( `#error-${label}`);
  if(!validator.isLength(input.value, {max})){
      let errormsg = `${underscoreToSpace(label)} debe tener máximo ${max} caracteres`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};

const isEmailValidation = (input) => {
  let label = input.id;
  let error = document.querySelector( `#error-${label}`);
  if(!validator.isEmail(input.value)){
      let errormsg = `${underscoreToSpace(label)} no es un email válido`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};

const uniqueValidation = async (input) => {
  let data = await fetch(`${baseUrl}/api/utilities/inUseEmail/${input.value}`)
  let json = await data.json();
  let label = input.id;
  let error = document.querySelector( `#error-${label}`);
  if(json.data.inUse == true){
      let errormsg = `Este ${underscoreToSpace(label)} no se encuentra disponible`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};

const strongValidation = (input) => {
  let label = input.id;
  let error = document.querySelector( `#error-${label}`);
  if(!validator.isStrongPassword(input.value)){
      let errormsg = `${underscoreToSpace(label)} debe tener al menos una mayúscula, una minúscula, un número y un caracter especial`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};