import sdk from "microsoft-cognitiveservices-speech-sdk";
import generateVideo from "./video.js";

export default async function generateSpeech(text, output) {
    let audioFile = "/workspaces/ai-video-generator/src/audio.wav";

    const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.SPEECH_KEY,
        process.env.SPEECH_REGION
    );
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    // Start the synthesizer and wait for a result.

    // Start the synthesizer and wait for a result.
    await synthesizer.speakTextAsync(
        text,
        (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("Voice synthesis finished.");
            } else {
                console.error(
                    "Speech synthesis canceled, " +
                        result.errorDetails +
                        "\nDid you set the speech resource key and region values?"
                );
            }
            synthesizer.close();
            synthesizer = null;
        },
        (err) => {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = null;
        }
    );
    console.log("Now synthesizing to: " + audioFile);
}