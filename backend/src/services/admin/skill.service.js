const Skill=require("../../models/Skill.model");
const ApiError=require("../../utils/ApiError");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    mapSkill
}=require("../../mappers/skill.mapper");

const getAllSkillsAdmin=async(query)=>{

    const{
        page=1,
        limit=10,
        search,
        category,
        verified,
        sort="latest"
    }=query;

    const filter={};

    if(search){
        filter.name={
            $regex:search,
            $options:"i"
        };
    }

    if(category){
        filter.category=category;
    }

    if(verified!==undefined){
        filter.isVerified=verified==="true";
    }

    const sortOption=
        sort==="oldest"
            ?{createdAt:1}
            :{createdAt:-1};

    const skip=(Number(page)-1)*Number(limit);

    const skills=await Skill.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total=await Skill.countDocuments(filter);

    return{
        skills:skills.map(mapSkill),
        pagination:{
            total,
            page:Number(page),
            limit:Number(limit),
            totalPages:Math.ceil(total/Number(limit))
        }
    };

};

const getSkillByIdAdmin=async(skillId)=>{

    const skill=await Skill.findById(skillId);

    if(!skill){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    return mapSkill(skill);

};

const verifySkillAdmin=async(skillId)=>{

    const skill=await Skill.findById(skillId);

    if(!skill){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    skill.isVerified=true;

    await skill.save();

    return mapSkill(skill);

};

const deleteSkillAdmin=async(skillId)=>{

    const skill=await Skill.findById(skillId);

    if(!skill){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    skill.isActive=false;
    await skill.save();
    return mapSkill(skill);

};

const restoreSkillAdmin=async(skillId)=>{

    const skill=await Skill.findById(skillId);

    if(!skill){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.SKILL_NOT_FOUND
        );
    }

    skill.isActive=true;

    await skill.save();

    return mapSkill(skill);

};

module.exports={
    getAllSkillsAdmin,
    getSkillByIdAdmin,
    verifySkillAdmin,
    deleteSkillAdmin,
    restoreSkillAdmin
};