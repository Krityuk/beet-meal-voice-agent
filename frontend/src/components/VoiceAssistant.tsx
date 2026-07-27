import { LiveKitRoom, RoomAudioRenderer, StartAudio, VideoConference, } from "@livekit/components-react";

interface Props {
    token: string;
    serverUrl: string;
    onConnected: ()=>void;
}

export default function VoiceAssistant({ token, serverUrl, onConnected }: Props) {
    return (
        <LiveKitRoom
            token={token}
            serverUrl={serverUrl}
            connect={true}
            audio={true}
            video={true}
            onConnected={onConnected}
        >
            <VideoConference />
            <RoomAudioRenderer />
            <StartAudio label="Enable Audio" />
        </LiveKitRoom>
    );
}