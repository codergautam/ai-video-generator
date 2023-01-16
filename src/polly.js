import {
    PollyClient,
    DeleteLexiconCommand,
    SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";
import { Readable } from "stream";
import fs from "fs";
import generateVideo from "./video.js";
const client = new PollyClient({ region: "us-west-1" });

export default async function polly(text, output) {
    const command = new SynthesizeSpeechCommand({
        VoiceId: "Joanna",
        Text: text,
        OutputFormat: "mp3",
    });
    try {
        const data = await client.send(command);
        await console.log("Sent");

        if (data.AudioStream instanceof Readable) {
            console.log("Readable");
            await data.AudioStream.pipe(fs.createWriteStream("./audio.mp3")).on(
                "finish",
                () => {
                    generateVideo(output);
                }
            );
        } else {
            console.log("Not readable");
        }
    } catch (error) {
        console.log("An error has occurred: ", error);
    }
}