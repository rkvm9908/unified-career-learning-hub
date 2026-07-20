const mapSkill=(skill)=>{

    if(!skill){
        return null;
    }

    return{
        id:skill._id,
        name:skill.name,
        category:skill.category,
        description:skill.description,
        isVerified:skill.isVerified,
        isActive:skill.isActive,
        createdAt:skill.createdAt,
        updatedAt:skill.updatedAt
    };

};

module.exports={
    mapSkill
};