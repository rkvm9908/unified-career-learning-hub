const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const RESPONSE_MESSAGES = require("../constants/responseMessages");

const {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
    searchSkills
} = require("../services/skill.service");

/**
 * Create Skill
 */
const createSkillController = asyncHandler(async (req, res) => {
    const skill = await createSkill(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.SKILL_CREATED,
            skill
        )
    );
});

/**
 * Get All Skills
 */
const getAllSkillsController = asyncHandler(async (req, res) => {
    const skills = await getAllSkills(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILLS_FETCHED,
            skills
        )
    );
});

/**
 * Get Skill By ID
 */
const getSkillByIdController = asyncHandler(async (req, res) => {
    const skill = await getSkillById(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_FETCHED,
            skill
        )
    );
});

/**
 * Update Skill
 */
const updateSkillController = asyncHandler(async (req, res) => {
    const skill = await updateSkill(
        req.params.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_UPDATED,
            skill
        )
    );
});

/**
 * Delete Skill
 */
const deleteSkillController = asyncHandler(async (req, res) => {
    await deleteSkill(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_DELETED
        )
    );
});

/**
 * Search Skills
 */
const searchSkillsController = asyncHandler(async (req, res) => {
    const skills = await searchSkills(req.query.keyword || "");

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILLS_FETCHED,
            skills
        )
    );
});

module.exports = {
    createSkillController,
    getAllSkillsController,
    getSkillByIdController,
    updateSkillController,
    deleteSkillController,
    searchSkillsController
};