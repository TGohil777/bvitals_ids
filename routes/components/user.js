const models = require('../../models');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    extended: true
});

const creatingUser = ( urlEncoded, async  (req) => {
    let data = {};
    let errors = {};
const {firstname, lastname, email, roleid } = req.body
try {
    const salt = await bcrypt.genSalt(10)     
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const existingEmail = await models.auth.findOne({             //checking if email ID exists in auth table
        where: {
            email: email
        }
    });
    if (existingEmail) {
            errors.message = "User with email already exists"
    } else{
        const added = await models.auth.create({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        console.log(added);
        
        const roleAdded = await models.authrole.create({
            authid: added.authid,
            roleid: roleid
        });
        if(added && roleAdded){
            data.message = "User succesfully added"
        }
    }
}catch (err) {                                               
         errors.message = err.message
}
    return {
        errors,
        data
    }
})
module.exports = {
    creatingUser
}

