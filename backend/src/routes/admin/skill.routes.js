const express=require("express");

const{
    getAllSkillsAdminController,
    getSkillByIdAdminController,
    verifySkillAdminController,
    deleteSkillAdminController,
    restoreSkillAdminController
}=require("../../controllers/admin/skill.controller");

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

router.get("/",getAllSkillsAdminController);

router.get("/:id",getSkillByIdAdminController);

router.patch("/:id/verify",verifySkillAdminController);

router.delete("/:id",deleteSkillAdminController);

router.patch("/:id/restore",restoreSkillAdminController);

module.exports=router;