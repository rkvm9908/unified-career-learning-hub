const express=require("express");

const{
    getAllCoursesAdminController,
    getCourseByIdAdminController,
    updateCourseStatusController,
    deleteCourseAdminController,
    restoreCourseAdminController
}=require("../../controllers/admin/course.controller");

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
    getAllCoursesAdminController
);

router.get(
    "/:id",
    getCourseByIdAdminController
);

router.patch(
    "/:id/status",
    updateCourseStatusController
);

router.delete(
    "/:id",
    deleteCourseAdminController
);

router.patch(
    "/:id/restore",
    restoreCourseAdminController
);

module.exports=router;