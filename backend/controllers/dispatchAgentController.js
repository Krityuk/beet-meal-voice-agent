import { AgentDispatchClient } from "livekit-server-sdk";


async function dispatchAgent(req, res) {
    const dispatchClient = new AgentDispatchClient(
        process.env.LIVEKIT_URL,
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET
    );
    try {
        const { room } = req.body;

        await dispatchClient.createDispatch(
            room,
            "my-agent"
        );

        res.status(200).json({
            success: true,
            message: "Agent dispatched successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to dispatch agent",
        });
    }
}

export { dispatchAgent };