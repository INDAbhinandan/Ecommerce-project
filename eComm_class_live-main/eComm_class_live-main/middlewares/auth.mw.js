/** 
 * create a middlewares will check request body is proper correct
 * means validate the entire request body
 */

const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const auth_config = require("../configs/auth.config")
const varifySignUpBody = async (req, res, next) => {

    try {
        // check for the name is available
        if (!req.body.name) {
            return res.status(400).send({
                message: "Failed! Name was not provided in request body"
            })
        }
        // check for the email is available
        if (!req.body.email) {
            return res.status(400).send({
                message: "Failed! email was not provided in request body"
            })
        }
        // check for the userID is available
        if (!req.body.userId) {
            return res.status(400).send({
                message: "Failed! UserId was not provided in request body"
            })
        }
        // check if the user with the same userId is already present
        const user = await user_model.findOne({ userId: req.body.userId })
        if (user) {
            return res.status(400).send({
                message: "Failed! User with same userId is already present"
            })
        }
        next()
    } catch (err) {
        console.log("Error while Varify the SignUpBody", err);
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}


/** define the midleware for the Sign in */
const varifySignInBody = async (req, res, next) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed! UserId is not provided"
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed! password is not provided"
        })
    }
    next();
}

/**
 * Define the mmiddleware for the varify the Access Token 
 */

const varifyToken = (req, res, next) => {
    // (1) Check if the Token is present in the header
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(403).send({
            message: "No Token found :Unautherized User"
        })
    }
    //(2) check if it is a valid token
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        // we check deccoded error here
        if (err) {
            return res.status(401).send({
                message: "Provided Token is not valid"
            })
        }
        // After decoded =>here i check which users have this token.I use the userId becouse at jwt creation i  take the userId data.
        const user = await user_model.findOne({ userId: decoded.id })
        if (!user) {
            return res.status(400).send({
                message: "UnAutherized ! :User is not Exist With this Token"
            })
        }

        // set the user info in the req body
        req.user = user
        // (3) Then move to the next step
        next()
    })

}


/**
 * to check user should be only admin for the category creation 
 */
const VerifyisAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.userType == 'ADMIN') {
        next()
    } else {
        res.status(403).send({
            message: "Unautherized !: You are not ADMIN"
        })
    }
}



module.exports = {
    varifySignUpBody: varifySignUpBody,
    varifySignInBody: varifySignInBody,
    varifyToken: varifyToken,
    VerifyisAdmin: VerifyisAdmin
}


