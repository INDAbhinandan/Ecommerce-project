/**
 * create router for category
 * 
 * POST localhost:8888/ecomm/api/v1/categories
 */
category_controller=require("../controllers/category.controller")
auth_mw=require("../middlewares/auth.mw")

// here i create route for create the new category
module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.varifyToken,auth_mw.VerifyisAdmin],category_controller.createNewCategory)
}