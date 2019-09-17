const validate = require('validator')
const isEmpty = require ('./isEmpty')
function validation(data){
    let errors={}
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if(validate.isEmpty(data.firstname)){
    errors.fname = "Enter your first name"
}

if(validate.isEmpty(data.lastname)){
  errors.lname = "Enter your last name"
}

  if (!validate.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if(validate.isEmpty(data.email)){
      errors.email = "Email is a required field"
  }

  if (!validate.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password should be 6 to 30 characters long";
  }

  if (validate.isEmpty(data.password)) {
    errors.password = "Password is a required field";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)           //isValid when errors isEmpty
  };
}

module.exports = {
    validation}
