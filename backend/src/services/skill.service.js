const Skill = require("../models/skill.model");

const ApiError = require("../utils/ApiError");

const RESPONSE_MESSAGES =
    require("../constants/responseMessages");

/**
 * Create Skill
 */
const createSkill = async (
    skillData
) => {

    const existingSkill =
        await Skill.findOne({

            name: {
                $regex: new RegExp(
                    `^${skillData.name}$`,
                    "i"
                )
            }
        });

    if (existingSkill) {

        throw new ApiError(
            409,
            RESPONSE_MESSAGES.SKILL_ALREADY_EXISTS
        );
    }

    const skill =
        await Skill.create(
            skillData
        );
    return skill;

};

/**
 * Get All Skills
 */
const getAllSkills = async (
    query
) => {

    const {
        search = "",
        category
    } = query;
    const filter = {
        isActive: true
    };

    if (search) {
        filter.name = {
            $regex: search,
            $options: "i"
        };

    }

    if (category) {
        filter.category =
            category;
    }

    const skills =
        await Skill.find(filter)
            .sort({
                name: 1
            });

    return skills;

};

/**
 * Get Skill By ID
 */
const getSkillById = async (
    skillId
) => {

    const skill =
        await Skill.findOne({
            _id: skillId,
            isActive: true
        });

    if (!skill) {

        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    return skill;

};

/**
 * Update Skill
 */
const updateSkill = async (
    skillId,
    updateData
) => {

    const skill =
        await Skill.findOne({
            _id: skillId,
            isActive: true
        });

    if (!skill) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    Object.assign(
        skill,
        updateData
    );

    await skill.save();
    return skill;

};

/**
 * Delete Skill
 */
const deleteSkill = async (
    skillId
) => {

    const skill =
        await Skill.findOne({
            _id: skillId,
            isActive: true
        });

    if (!skill) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    skill.isActive = false;
    await skill.save();

};

/**
 * Search Skills
 */
const searchSkills = async (
    keyword
) => {

    return await Skill.find({
        isActive: true,
        name: {
            $regex: keyword,
            $options: "i"
        }

    })
        .limit(10)
        .sort({
            name: 1
        });

};

module.exports = {

    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
    searchSkills

};