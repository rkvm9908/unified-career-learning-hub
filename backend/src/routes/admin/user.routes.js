const express=require("express");

const {
    getAllUsersController,
    getUserByIdController,
    updateUserStatusController,
    deleteUserController,
}=require("../../controllers/admin/user.controller");

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

router.get("/",getAllUsersController);

router.get("/:id",getUserByIdController);

router.patch("/:id/status",updateUserStatusController);

router.delete("/:id",deleteUserController);

module.exports=router;