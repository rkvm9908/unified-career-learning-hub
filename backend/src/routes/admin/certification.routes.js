const express=require("express");

const{
    getAllCertificationsAdminController,
    getCertificationByIdAdminController,
    verifyCertificationAdminController,
    deleteCertificationAdminController,
    restoreCertificationAdminController
}=require("../../controllers/admin/certification.controller");

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

router.get("/",getAllCertificationsAdminController);

router.get("/:id",getCertificationByIdAdminController);

router.patch("/:id/verify",verifyCertificationAdminController);

router.delete("/:id",deleteCertificationAdminController);

router.patch("/:id/restore",restoreCertificationAdminController);

module.exports=router;