const errors = {};

const inputError = (input) => {
  input.classList.remove("input-ok");
  input.classList.add("input-error");
};

const inputOK = (input) => {
  input.classList.remove("input-error");
  input.classList.add("input-ok");
};

const requiredValidation = (input) => {
  let error = document.querySelector(`#error-${input.id}`);
  let label = input.id;
  if(validator.isEmpty(input.value)){
      let errormsg = `${input.id} es obligatorio`;
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
  let error = document.querySelector( `#error-${input.id}`);
  let label = input.id;
  if(!validator.isLength(input.value, {min})){
      let errormsg = `${input.id} debe tener mínimo ${min} caracteres`;
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
  let error = document.querySelector( `#error-${input.id}`);
  let label = input.id;
  if(!validator.isLength(input.value, {max})){
      let errormsg = `${input.id} debe tener máximo ${max} caracteres`;
      error.innerText = errormsg;
      errors[label] = errormsg;
      inputError(input);
  }else{
      error.innerText = '';
      inputOK(input);
      delete errors.input;
  }
};