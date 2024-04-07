/**
 * POST localhost:8888/ecomm/api/v1/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controllers/auth.controller")
const authMiddlewares = require("../middlewares/auth.mw")

// here when some one requist URI (/ecomm/api/v1/auth/signup) it will handover to controller for signup(authController.signup)
// and  for request body validation it will handover auth middlewares(authMiddlewares.varifySignUpBody)
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup", [authMiddlewares.varifySignUpBody], authController.signup)

    /** 
 * route for Signin-
 * POST localhost:8888/ecomm/api/v1/auth/signin
 */
app.post("/ecomm/api/v1/auth/signin",[authMiddlewares.varifySignInBody],authController.signin)
}

