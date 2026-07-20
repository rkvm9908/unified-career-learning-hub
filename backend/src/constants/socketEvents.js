const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

let io;
/**
 * Online Users
 *
 * userId -> socketId
 */
const onlineUsers =
    new Map();
/**
 * Initialize Socket.IO
 */
const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: process.env.CLIENT_URL,

            credentials: true

        }

    });
    /**
 * Socket Authentication
 */
io.use(async (socket, next) => {

    try {

        const token =
            socket.handshake.auth.token;

        if (!token) {

            return next(
                new Error("Authentication failed.")
            );

        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        const user =
            await User.findById(decoded.id);

        if (!user || !user.isActive) {

            return next(
                new Error("User not found.")
            );

        }

        socket.user = user;

        next();

    // eslint-disable-next-line no-unused-vars
    } catch (error) {

        next(
            new Error("Authentication failed.")
        );

    }

});
    io.on("connection", (socket) => {

        console.log(
            `${socket.user.username} connected`
        );
        onlineUsers.set(
            socket.user._id.toString(),
            socket.id
        );
        socket.broadcast.emit(
            "user:online",
            {
                userId: socket.user._id
            }
        );
        io.emit(
            "online-users",
            Array.from(
                onlineUsers.keys()
            )
        );
        
        /**
         * Join Conversation
         */
        socket.on(
            "join-conversation",
            (conversationId) => {

                socket.join(
                    `conversation_${conversationId}`
                );

                console.log(
                    `${socket.user.username} joined conversation ${conversationId}`
                );

            }
        );

        /**
         * Leave Conversation
         */
        socket.on(
            "leave-conversation",
            (conversationId) => {

                socket.leave(
                    `conversation_${conversationId}`
                );

                console.log(
                    `${socket.user.username} left conversation ${conversationId}`
                );

            }
        );
        /**
         * Typing Started
         */
        socket.on(
            "typing:start",
            ({ conversationId }) => {

                socket.to(
                    `conversation_${conversationId}`
                ).emit(
                    "typing:start",
                    {
                        conversationId,
                        userId: socket.user._id,
                        username: socket.user.username
                    }
                );

            }
        );

        /**
         * Typing Stopped
         */
        socket.on(
            "typing:stop",
            ({ conversationId }) => {

                socket.to(
                    `conversation_${conversationId}`
                ).emit(
                    "typing:stop",
                    {
                        conversationId,
                        userId: socket.user._id
                    }
                );

            }
        );
        /**
         * Message Read
         */
        socket.on(
            "message:read",
            ({ conversationId, messageId }) => {

                socket.to(
                    `conversation_${conversationId}`
                ).emit(
                    "message:read",
                    {
                        conversationId,
                        messageId,
                        userId: socket.user._id
                    }
                );

            }
        );
        socket.on("disconnect", () => {
            onlineUsers.delete(
                socket.user._id.toString()
            );
            socket.broadcast.emit(
                "user:offline",
                {
                    userId: socket.user._id
                }
            );
            io.emit(
                "online-users",
                Array.from(
                    onlineUsers.keys()
                )
            );
            console.log(
                `${socket.user.username} disconnected`
            );
        });
    });
    return io;
};

/**
 * Get Socket Instance
 */
const getIO = () => {

    if (!io) {
        throw new Error(
            "Socket.IO has not been initialized."
        );
    }
    return io;
};

/**
 * Get User Socket
 */
const getUserSocket = (
    userId
) => {

    return onlineUsers.get(
        userId.toString()
    );

};

/**
 * Check User Online
 */
const isUserOnline = (
    userId
) => {

    return onlineUsers.has(
        userId.toString()
    );

};
/**
 * Emit Message To Conversation
 */
const emitToConversation = (
    conversationId,
    event,
    payload
) => {

    if (!io) {

        return;

    }

    io.to(
        `conversation_${conversationId}`
    ).emit(
        event,
        payload
    );

};
module.exports = {
    initializeSocket,
    getIO,
    getUserSocket,
    isUserOnline,
    emitToConversation
};