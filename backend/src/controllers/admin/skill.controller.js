const asyncHandler=require("../../utils/asyncHandler");
const ApiResponse=require("../../utils/ApiResponse");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    getAllSkillsAdmin,
    getSkillByIdAdmin,
    verifySkillAdmin,
    deleteSkillAdmin,
    restoreSkillAdmin
}=require("../../services/admin/skill.service");

/**
 * Get All Skills
 */
const getAllSkillsAdminController=asyncHandler(async(req,res)=>{

    const result=await getAllSkillsAdmin(req.query);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILLS_FETCHED,
            result
        )
    );

});

/**
 * Get Skill By Id
 */
const getSkillByIdAdminController=asyncHandler(async(req,res)=>{

    const skill=await getSkillByIdAdmin(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_FETCHED,
            skill
        )
    );

});

/**
 * Verify Skill
 */
const verifySkillAdminController=asyncHandler(async(req,res)=>{

    const skill=await verifySkillAdmin(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_VERIFIED,
            skill
        )
    );

});

/**
 * Delete Skill
 */
const deleteSkillAdminController=asyncHandler(async(req,res)=>{

    const skill=await deleteSkillAdmin(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_DELETED,
            skill
        )
    );

});

/**
 * Restore Skill
 */
const restoreSkillAdminController=asyncHandler(async(req,res)=>{

    const skill=await restoreSkillAdmin(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SKILL_RESTORED,
            skill
        )
    );

});

module.exports={
    getAllSkillsAdminController,
    getSkillByIdAdminController,
    verifySkillAdminController,
    deleteSkillAdminController,
    restoreSkillAdminController
};