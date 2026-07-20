const express = require("express");

const router = express.Router();

router.use("/dashboard",require("./dashboard.routes"));
router.use("/users",require("./user.routes"));
router.use("/recruiters",require("./recruiter.routes"));
router.use("/jobs",require("./job.routes"));
router.use("/applications",require("./application.routes"));
router.use("/courses",require("./course.routes"));
router.use("/skills",require("./skill.routes"));
router.use("/certifications",require("./certification.routes"));


module.exports=router;