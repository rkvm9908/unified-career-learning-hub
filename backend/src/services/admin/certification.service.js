const Certification=require("../../models/Certification.model");
const ApiError=require("../../utils/ApiError");
const RESPONSE_MESSAGES=require("../../constants/responseMessages");

const{
    mapCertification
}=require("../../mappers/certification.mapper");

/**
 * Get All Certifications
 */
const getAllCertificationsAdmin=async(query)=>{

    const{
        page=1,
        limit=10,
        search,
        verified,
        sort="latest"
    }=query;

    const filter={};

    if(search){
        filter.$or=[
            {
                title:{
                    $regex:search,
                    $options:"i"
                }
            },
            {
                organization:{
                    $regex:search,
                    $options:"i"
                }
            }
        ];
    }

    if(verified!==undefined){
        filter.isVerified=verified==="true";
    }

    const sortOption=sort==="oldest"
        ?{createdAt:1}
        :{createdAt:-1};

    const skip=(Number(page)-1)*Number(limit);

    const certifications=await Certification.find(filter)
        .populate(
            "owner",
            "firstName lastName username email profileImage"
        )
        .populate(
            "skills",
            "name category"
        )
        .populate(
            "verifiedBy",
            "firstName lastName username"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total=await Certification.countDocuments(filter);

    return{
        certifications:certifications.map(mapCertification),
        pagination:{
            total,
            page:Number(page),
            limit:Number(limit),
            totalPages:Math.ceil(total/Number(limit))
        }
    };

};

/**
 * Get Certification By Id
 */
const getCertificationByIdAdmin=async(certificationId)=>{

    const certification=await Certification.findById(certificationId)
        .populate(
            "owner",
            "firstName lastName username email profileImage"
        )
        .populate(
            "skills",
            "name category"
        )
        .populate(
            "verifiedBy",
            "firstName lastName username"
        );

    if(!certification){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    return mapCertification(certification);

};

/**
 * Verify Certification
 */
const verifyCertificationAdmin=async(
    certificationId,
    adminId
)=>{

    const certification=await Certification.findById(certificationId);

    if(!certification){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    certification.isVerified=true;
    certification.verifiedBy=adminId;
    certification.verifiedAt=new Date();

    await certification.save();

    return mapCertification(certification);

};

/**
 * Delete Certification
 */
const deleteCertificationAdmin=async(certificationId)=>{

    const certification=await Certification.findById(certificationId);

    if(!certification){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    certification.isActive=false;

    await certification.save();

    return mapCertification(certification);

};

/**
 * Restore Certification
 */
const restoreCertificationAdmin=async(certificationId)=>{

    const certification=await Certification.findById(certificationId);

    if(!certification){
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.CERTIFICATION_NOT_FOUND
        );
    }

    certification.isActive=true;

    await certification.save();

    return mapCertification(certification);

};

module.exports={
    getAllCertificationsAdmin,
    getCertificationByIdAdmin,
    verifyCertificationAdmin,
    deleteCertificationAdmin,
    restoreCertificationAdmin
};