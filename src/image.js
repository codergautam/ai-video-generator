import { Configuration, OpenAIApi } from "openai";
import { promises as fs } from "fs";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function generateImages(imagePrompts) {
    for (let i = 0; i < imagePrompts.length; i++) {
        console.log(`Generating image ${i}/${imagePrompts.length}...`);
        await downloadImage(
            await generateImage(imagePrompts[i]),
            `/workspaces/ai-video-generator/src/images/image${i}.png`
        );
    }
}
export const downloadImage = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("Writing image to ", path, buffer);
    await fs.writeFile(path, buffer);
};

export const generateImage = async (prompt) => {
    console.log("Generate");
    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "512x512",
    });
    console.log(response.data.data[0].url);
    return response.data.data[0].url;
};