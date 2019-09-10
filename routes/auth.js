const express = require('express');
const authRouter = express.Router();
const { verifyingUser } = require('./components/auth');
const {changePassword} = require ('./components/auth')


const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

  module.exports = isEmpty;

authRouter.post("/verify-user", async (req, res) => {
    const {errors, data} = await verifyingUser(req);
    if (!isEmpty(errors)) {
        console.log("Errors", JSON.stringify(errors, null, 3));
        return res.status(401).send(errors)
    } else if (errors.message) {
        return res.status(401).send(errors)
    } else {
        return res.status(200).send(data)
    }
})

authRouter.post("/change-password", async (req, res) => {
    const {errors, data} = await changePassword(req);
    if (!isEmpty(errors)) {
        return res.status(401).send(errors)
    } else if (errors.message) {
        return res.status(401).send(errors)
    } else {
        return res.status(200).send(data)
    }
})

module.exports = authRouter