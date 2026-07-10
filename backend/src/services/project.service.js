const Project = require("../models/Project.model");
const ApiError = require("../utils/ApiError");
const RESPONSE_MESSAGES = require("../constants/responseMessages");

/**
 * Safe Project Response
 */
const getSafeProject = (
    project,
    currentUserId = null
) => {

    const owner = project.owner;

    const isLiked =
        currentUserId &&
        project.likes
            ? project.likes.some(
                like =>
                    like.toString() ===
                    currentUserId.toString()
            )
            : false;

    return {
        id: project._id,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        image: project.image,

        owner: owner
            ? {
                id: owner._id,
                firstName: owner.firstName,
                lastName: owner.lastName,
                username: owner.username,
                profileImage: owner.profileImage
            }
            : null,

        likesCount: project.likesCount,
        isLiked,
        isBookmarked: true,   
        isFeatured: project.isFeatured,

        createdAt: project.createdAt,
        updatedAt: project.updatedAt
    };
};

/**
 * Create Project
 */
const createProject = async (userId, projectData) => {

    const project = await Project.create({
        ...projectData,
        owner: userId
    });

    return getSafeProject(project);
};

/**
 * Get My Projects
 */
const getMyProjects = async (userId) => {

    const projects = await Project.find({
        owner: userId,
        isActive: true
    })
    .sort({
        createdAt: -1
    });

    return projects.map(getSafeProject);
};

/**
 * Get Project By ID
 */
const getProjectById = async (projectId, currentUserId = null) => {

    const project = await Project.findOne({
        _id: projectId,
        isActive: true
    })
        .populate(
            "owner",
            "firstName lastName username profileImage"
        );

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    return getSafeProject(project, currentUserId);
};

/**
 * Update Project
 */
const updateProject = async (
    projectId,
    userId,
    projectData
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    // Check Ownership
    if (project.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    Object.assign(project, projectData);

    await project.save();

    return getSafeProject(project);
};

/**
 * Delete Project
 */
const deleteProject = async (
    projectId,
    userId
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    // Check Ownership
    if (project.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    // Soft Delete
    project.isActive = false;

    await project.save();

    return;
};

/**
 * Get All Projects
 */
const getAllProjects = async (
    query,
    currentUserId = null
) => {

    const {
        page = 1,
        limit = 10,
        search,
        technology,
        sort = "latest"
    } = query;

    const filter = {
        isActive: true
    };

    if (search) {
        filter.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    if (technology) {
        filter.technologies = {
            $in: [technology]
        };
    }

    const sortOption =
        sort === "oldest"
            ? { createdAt: 1 }
            : { createdAt: -1 };

    const skip =
        (Number(page) - 1) * Number(limit);

    const projects = await Project.find(filter)
        .populate(
            "owner",
            "firstName lastName username profileImage"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total = await Project.countDocuments(filter);

    return {
        projects: projects.map((project) => getSafeProject(project, currentUserId)),
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

/**
 * Upload Project Image
 */
const uploadProjectImage = async (
    projectId,
    userId,
    uploadedImage
) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    if (project.owner.toString() !== userId) {
        throw new ApiError(
            403,
            RESPONSE_MESSAGES.FORBIDDEN
        );
    }

    project.image = {
        url: uploadedImage.secure_url,
        publicId: uploadedImage.public_id
    };

    await project.save();

    return getSafeProject(project);
};

/**
 * Toggle Featured Project
 */
const toggleFeaturedProject = async (projectId) => {

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    project.isFeatured = !project.isFeatured;

    await project.save();

    return getSafeProject(project);
};

/**
 * Get Featured Projects
 */
const getFeaturedProjects = async () => {

    const projects = await Project.find({
        isFeatured: true,
        isActive: true
    })
    .populate(
        "owner",
        "firstName lastName username profileImage"
    )
    .sort({
        createdAt: -1
    });

    return projects.map((project) => getSafeProject(project, null));
};
/**
 * Toggle Like Project
 */
const toggleLikeProject = async (
    projectId,
    userId
) => {

    const project = await Project.findById(projectId);

    if (!project || !project.isActive) {
        throw new ApiError(
            404,
            RESPONSE_MESSAGES.PROJECT_NOT_FOUND
        );
    }

    const alreadyLiked =
        project.likes.some(
            id => id.toString() === userId
        );

    if (alreadyLiked) {

        project.likes =
            project.likes.filter(
                id => id.toString() !== userId
            );

    } else {

        project.likes.push(userId);

    }

    project.likesCount =
        project.likes.length;

    await project.save();

    return {
        liked: !alreadyLiked,
        likesCount: project.likesCount
    };
};


module.exports = {
    createProject,
    getMyProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getAllProjects,
    getSafeProject,
    uploadProjectImage,
    toggleFeaturedProject,
    getFeaturedProjects,
    toggleLikeProject
};