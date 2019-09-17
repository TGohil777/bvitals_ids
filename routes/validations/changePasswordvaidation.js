const isEmpty = require('./isEmpty')
const validate = require('validator')


function changepwdvalidate(data){
  let errors={}
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";

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
  if (!validate.isLength(data.newpassword, { min: 6, max: 30 })) {
    errors.newpassword = "Password should be 6 to 30 characters long";
  }
  if(validate.isEmpty(data.newpassword)){
    errors.newpassword = "New Password is a required field"
  }

    return {
        errors,
        isValid: isEmpty(errors)           //isValid when errors isEmpty
    };
}
module.exports = {
    changepwdvalidate
}
