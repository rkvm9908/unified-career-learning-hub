const express=require("express");

const{
    getAllApplicationsAdminController,
    getApplicationByIdAdminController
}=require("../../controllers/admin/application.controller");

const{
    protect
}=require("../../middleware/auth.middleware");

const{
    authorize
}=require("../../middleware/role.middleware");

const ROLES=require("../../constants/roles");

const router=express.Router();

router.use(
    protect,
    authorize(ROLES.ADMIN)
);

router.get(
    "/",
    getAllApplicationsAdminController
);

router.get(
    "/:id",
    getApplicationByIdAdminController
);

module.exports=router; 