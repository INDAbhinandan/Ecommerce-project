/**
 * I need to write the controller / logic to register a user
 */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")

exports.signup = async (req, res) => {
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {

        const user_created = await user_model.create(userObj)
        /**
         * Return this user
         */

        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updateAt
        }
        // here we can response directly user_created but we create res_obj and customize value only return
        res.status(201).send(res_obj)

    } catch (err) {
        console.log("Error while registering the user", err)
        res.status(500).send({
            message: "Some error happened while registering the user"
        })
    }

    //3. Return the response back to the user

}
/** *************************DAY 2******************************************** */
//logic for the signin by the request body
exports.signin = async (req, res) => {

    //(1):- check if the user is present in the system
    const user = await user_model.findOne({ userId: req.body.userId })  //here controler check reqbody's userId is present in DB or not

    if (user == null) {
        return res.status(400).send({
            message: "userId passed is not valid"
        })
    }

    //(2):- check password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password) //here firstly req.body password will be encript after that compare to the user.body password wich is already store in DB

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Wrong password passed by the user"
        })
    }

    //(3):-using JWT we will create Access Token with a given TTL(Time to live) and return 
    // sign():- create a token on userId data
    // Abhisakhhu secret:-it is a secret code
    // 128:-token will be expired in 128 sec
    const token = jwt.sign({ id: user.userId }, secret.secret, {
        expiresIn: 128
    })
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}