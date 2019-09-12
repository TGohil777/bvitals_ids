const express = require('express');
const authRouter = express.Router();

const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

  module.exports = isEmpty;

const {creatingUser} = require ('./components/user')
authRouter.post("/create-user", async (req, res) => {
    const {errors, data} = await creatingUser(req);
    if (!isEmpty(errors)) {
        return res.status(401).send(errors)
    } else if (errors.message) {
        return res.status(401).send(errors)
    } else {
        return res.status(200).send(data)
    }
})

module.exports=authRouter