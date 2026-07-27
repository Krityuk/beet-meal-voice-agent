import { useState } from "react";
import MealList from "./components/MealList";
import VoiceAssistant from "./components/VoiceAssistant";
import { dispatchAgent, getLiveKitToken } from "./api/meals";
import { VoiceAssistantStatus, type VoiceAssistantStatus as VoiceAssistantStatusType, } from "./enums/VoiceAssistantStatus";

export default function App() {

    const [token, setToken] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<VoiceAssistantStatusType>(VoiceAssistantStatus.IDLE);
    const [room, setRoom] = useState("");

    async function connectVoiceAssistant() {
        setStatus(VoiceAssistantStatus.CONNECTING);

        const response = await getLiveKitToken();

        setToken(response.token);
        setUrl(response.url);
        setRoom(response.room);
    }
    return (
        <div style={{ maxWidth: "700px", margin: "40px auto" }}>
            <h1>Beet Meal Tracker</h1>

            <button
                onClick={connectVoiceAssistant}
                disabled={status !== VoiceAssistantStatus.IDLE}
                style={{
                    marginBottom: "20px",
                    padding: "10px 20px",
                    cursor: status !== "idle" ? "not-allowed" : "pointer",
                }}
            >
                {status === VoiceAssistantStatus.IDLE && "Start Voice Assistant"}

                {status === VoiceAssistantStatus.CONNECTING && "Connecting..."}

                {status === VoiceAssistantStatus.READY && "Voice Assistant Ready"}
            </button>

            {token && (
                <VoiceAssistant
                    token={token}
                    serverUrl={url}
                    onConnected={async () => {
                        await dispatchAgent(room); // when connected to room, dispatch agent into room and set status=ready
                        setStatus(VoiceAssistantStatus.READY)}}
                />
            )}

            <MealList />
        </div>
    );
}