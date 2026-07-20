const mapCertification=(certification)=>{

    if(!certification){
        return null;
    }

    return{
        id:certification._id,
        owner:certification.owner,
        title:certification.title,
        organization:certification.organization,
        credentialId:certification.credentialId,
        credentialUrl:certification.credentialUrl,
        issueDate:certification.issueDate,
        expiryDate:certification.expiryDate,
        skills:certification.skills,
        description:certification.description,
        isVerified:certification.isVerified,
        verifiedBy:certification.verifiedBy,
        verifiedAt:certification.verifiedAt,
        isActive:certification.isActive,
        createdAt:certification.createdAt,
        updatedAt:certification.updatedAt
    };

};

module.exports={
    mapCertification
};