const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");
const { uploadToCloudinary } = require("../config/cloudinary");

const {
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getAllProjects,
    uploadProjectImage,
    toggleFeaturedProject,
    getFeaturedProjects,
    toggleLikeProject
} = require("../services/project.service");

/**
 * Create Project
 */
const createNewProject = asyncHandler(async (req, res) => {

    const project = await createProject(
        req.user.id,
        req.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            RESPONSE_MESSAGES.PROJECT_CREATED,
            project
        )
    );
});

/**
 * Get My Projects
 */
const getMyProjectsController = asyncHandler(async (req, res) => {

    const projects = await getMyProjects(req.user.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECTS_FETCHED,
            projects
        )
    );
});

/**
 * Get Project By ID
 */
const getProjectByIdController = asyncHandler(async (req, res) => {

    const project = await getProjectById(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_FETCHED,
            project
        )
    );
});

/**
 * Update Project
 */
const updateProjectController = asyncHandler(async (req, res) => {

    const project = await updateProject(
        req.params.id,
        req.user.id,
        req.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_UPDATED,
            project
        )
    );
});

/**
 * Delete Project
 */
const deleteProjectController = asyncHandler(async (req, res) => {

    await deleteProject(
        req.params.id,
        req.user.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_DELETED
        )
    );
});

/**
 * Get All Projects
 */
const getAllProjectsController =
asyncHandler(async (req, res) => {

    const result =
        await getAllProjects(
            req.query,
            req.user?._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECTS_FETCHED,
            result
        )
    );
});

/**
 * Upload Project Image
 */
const uploadProjectImageController =
asyncHandler(async (req, res) => {

    if (!req.file) {
        throw new ApiError(
            400,
            RESPONSE_MESSAGES.IMAGE_REQUIRED
        );
    }

    const uploadedImage =
        await uploadToCloudinary(
            req.file.path,
            "projects"
        );

    const project =
        await uploadProjectImage(
            req.params.id,
            req.user.id,
            uploadedImage
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_IMAGE_UPDATED,
            project
        )
    );
});

/**
 * Toggle Featured Project
 */
const toggleFeaturedProjectController =
asyncHandler(async (req, res) => {

    const project =
        await toggleFeaturedProject(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_FEATURE_UPDATED,
            project
        )
    );
});

/**
 * Get Featured Projects
 */
const getFeaturedProjectsController =
asyncHandler(async (req, res) => {

    const projects =
        await getFeaturedProjects();

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.FEATURED_PROJECTS_FETCHED,
            projects
        )
    );
});

/**
 * Toggle Like Project
 */
const toggleLikeProjectController =
asyncHandler(async (req, res) => {

    const { liked, likesCount } =
        await toggleLikeProject(
            req.params.id,
            req.user.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            RESPONSE_MESSAGES.PROJECT_LIKE_TOGGLED,
            { liked, likesCount }
        )
    );
});

module.exports = {
    createNewProject,
    getMyProjectsController,
    getProjectByIdController,
    updateProjectController,
    deleteProjectController,
    getAllProjectsController,
    uploadProjectImageController,
    toggleFeaturedProjectController,
    getFeaturedProjectsController,
    toggleLikeProjectController
};