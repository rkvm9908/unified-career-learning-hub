const asyncHandler=require("../utils/asyncHandler");
const ApiResponse=require("../utils/ApiResponse");
const RESPONSE_MESSAGES=require("../constants/responseMessages");

const{
    searchAll
}=require("../services/search.service");

/**
 * Global Search
 */
const searchController=asyncHandler(async(req,res)=>{

    const{
        q,
        type
    }=req.query;

    const result=await searchAll(
        q,
        type
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.SEARCH_RESULTS_FETCHED,
            result
        )
    );

});

module.exports={
    searchController
};