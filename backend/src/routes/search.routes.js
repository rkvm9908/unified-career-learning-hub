const express=require("express");

const{
    searchController
}=require("../controllers/search.controller");

const validate=require("../middleware/validate.middleware");

const{
    searchSchema
}=require("../validators/search.validator");
const{
    optionalAuth
}=require("../middleware/auth.middleware");

const router=express.Router();

/**
 * Search
 * GET /api/search?q=keyword&type=users|jobs|courses|skills
 */
router.get(
    "/",
    optionalAuth,
    validate(searchSchema,"query"),
    searchController
);
module.exports=router;