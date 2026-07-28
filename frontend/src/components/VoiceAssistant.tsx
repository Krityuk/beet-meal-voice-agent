import { LiveKitRoom, RoomAudioRenderer, StartAudio, VideoConference, } from "@livekit/components-react";
import { dispatchAgent } from "../api/meals";
import { VoiceAssistantStatus } from "../enums/VoiceAssistantStatus";

interface Props {
    token: string;
    serverUrl: string;
    room: string;
    setStatus: React.Dispatch<React.SetStateAction<VoiceAssistantStatus>>
}

export default function VoiceAssistant({ token, serverUrl, room, setStatus }: Props) {
    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
            audio={true}
            video={true}
            onConnected={async () => {
                await dispatchAgent(room);
                setStatus(VoiceAssistantStatus.READY);
            }}
        >
            <VideoConference />
            <RoomAudioRenderer />
            <StartAudio label="Enable Audio" />
        </LiveKitRoom>
    );
}