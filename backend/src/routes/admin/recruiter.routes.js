const express=require("express");

const {
    getAllRecruitersController,
    approveRecruiterController,
    rejectRecruiterController,
}=require("../../controllers/admin/recruiter.controller");

const {
    protect
}=require("../../middleware/auth.middleware");

const {
    authorize
}=require("../../middleware/role.middleware");

const ROLES=require("../../constants/roles");

const router=express.Router();

router.use(
    protect,
    authorize(ROLES.ADMIN)
);

router.get("/",getAllRecruitersController);

router.patch("/:id/approve",approveRecruiterController);

router.patch("/:id/reject",rejectRecruiterController);


module.exports=router;