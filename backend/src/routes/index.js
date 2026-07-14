const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");
const skillRoutes = require("./skill.routes");
const applicationRoutes = require("./application.routes");
const certificationRoutes = require("./certification.routes");
const courseRoutes = require("./course.routes");
const jobRoutes = require("./job.routes");
const notificationRoutes = require("./notification.routes");
const resumeRoutes = require("./resume.routes");
const adminRoutes = require("./admin.routes");
const healthRoutes = require("./health.routes");
const commentRoutes = require("./comment.routes");
const bookmarkRoutes = require("./bookmark.routes");


router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/project", projectRoutes);
router.use("/skill", skillRoutes);
router.use("/application", applicationRoutes);
router.use("/certification", certificationRoutes);
router.use("/course", courseRoutes);
router.use("/job", jobRoutes);
router.use("/notification", notificationRoutes);
router.use("/resume", resumeRoutes);
router.use("/admin", adminRoutes);
router.use("/health", healthRoutes);
router.use("/api/comment", commentRoutes);
router.use("/bookmarks", bookmarkRoutes);

module.exports = router;