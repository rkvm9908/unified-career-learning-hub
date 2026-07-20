const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

const validate=(schema,source="body")=>{

    return(req,res,next)=>{

        try{

            const validatedData=schema.parse(
                req[source]
            );

            req[source]=validatedData;

            next();

        }catch(error){

            const errors=
                error.issues?.map(issue=>({
                    field:issue.path.join("."),
                    message:issue.message
                }))||[];

            return next(
                new ApiError(
                    400,
                    RESPONSE_MESSAGES.VALIDATION_FAILED,
                    errors
                )
            );

        }

    };

};

module.exports=validate;