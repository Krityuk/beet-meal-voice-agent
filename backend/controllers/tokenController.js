import { AccessToken, AgentDispatchClient, } from "livekit-server-sdk";

const createToken = async (req, res) => {
    try {
        const identity = req.query.identity || `user-${Date.now()}`;

        const room = req.query.room || "beet-room";

        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity,
            }
        );

        token.addGrant({
            roomJoin: true,
            room,
            canPublish: true,
            canSubscribe: true,
        });

        const jwt = await token.toJwt();

        res.json({
            success: true,
            token: jwt,
            url: process.env.LIVEKIT_URL,
            room,
        });

        // dispatchAgent(room);

    } catch (error) {
        console.error("Error generating token:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate LiveKit token",
        });
    }
};

export { createToken };