const models = require('../../models');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    extended: true
});
const verifyingUser = async (req) => {
    let data = {};
    let errors = {};
    const {email, password} = req.body;
    try{
        const user = await models.auth.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const authrole = await models.authrole.findOne({
                    where: {
                        authid: user.authid
                    }
                });
                const role = await models.role.findOne({
                    where: {
                        roleid: authrole.roleid
                    }
                })
                data.email = user.email;
                data.role = role.name;
            } else {
                errors.message = "Password is invalid"
            }
        } else {
            errors.message = `User with email ${email} does not exists`
        }
    }catch(err){
        errors.message = err.message
    }

    return {
        errors,
        data
    }
}

const changePassword = ( urlEncoded, async  (req) => {
    let data = {};
    let errors = {};
    const {email, password} = req.body
    try{
        const user = await models.auth.findOne({
            where: {
                email: email
            }
        });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch){
                const salt = await bcrypt.genSalt(10)     
                const newhashedPassword = await bcrypt.hash(req.body.password, salt);
                const pwd = await models.auth.update({
                    password:  newhashedPassword
                        },
                        { where: { email: email
                        } 
                    })
                if(pwd){
                    data.message = "Password changed sucessfully"
                }
                else{
                    errors.message  
                }
            }
        }
    }catch(err){
        errors.message = err.message
    }
return {
    data,
    errors
}
})
module.exports ={
    verifyingUser,
    changePassword
}
