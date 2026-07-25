export const VoiceAssistantStatus = {
    IDLE: "idle",
    CONNECTING: "connecting",
    READY: "ready",
} as const;

export type VoiceAssistantStatus =
(typeof VoiceAssistantStatus)[keyof typeof VoiceAssistantStatus];