module.exports = {
    ...require("./dashboard.service"),
    ...require("./user.service"),
    ...require("./recruiter.service"),
    ...require("./job.service"),
    ...require("./application.service"),
    ...require("./course.service"),
    ...require("./skill.service"),
    ...require("./certification.service")
};