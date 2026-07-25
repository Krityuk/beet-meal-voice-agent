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

        dispatchAgent(room);

    } catch (error) {
        console.error("Error generating token:", error);

        res.status(500).json({
            success: false,
            message: "Failed to generate LiveKit token",
        });
    }
};

const dispatchAgent = async (room) => {
    const dispatchClient = new AgentDispatchClient(
        process.env.LIVEKIT_URL,
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET
    );

    const timeout = 10_000;
    const retryInterval = 1000;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        try {
            await dispatchClient.createDispatch(
                room,
                "my-agent"
            );

            console.log("✅ Agent dispatched successfully");
            return;

        } catch (err) {
            if (
                err?.message?.includes("room does not exist") ||
                err?.message?.includes("requested room does not exist")
            ) {
                console.log("⏳ Room not ready. Retrying...");

                await new Promise(resolve =>
                    setTimeout(resolve, retryInterval)
                );
                continue;
            }

            console.error("❌ Dispatch failed:", err);
            return;
        }
    }

    console.error(
        "❌ Failed to dispatch agent within 10 seconds"
    );
};

export { createToken };