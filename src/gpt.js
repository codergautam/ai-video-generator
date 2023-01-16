import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function getStory(prompt, number) {
    console.log(number);
    console.log("Prompt, ", prompt);
    let fullStory = ``;
    let fullPrompts = [];
    let summary = null;
    for (let i = 0; i < number; i++) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generate(prompt, summary),
            temperature: 0.6,
            max_tokens: 1024,
        });
        const story = await {
            text: response.data.choices[0].text,
        };

        const filteredResult = extractBracketedStrings(story.text);
        summary = await summarize(filteredResult.text);
        await console.log("Result, ", filteredResult.text);
        const imagePrompts = filteredResult.imagePrompts;
        fullPrompts = [...fullPrompts, ...imagePrompts];
        fullStory = `${fullStory} ${filteredResult.text}`;
    }

    return { text: fullStory, imagePrompts: fullPrompts };
}

async function summarize(story) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: summaryPrompt(story),
        temperature: 0.7,
        max_tokens: 512,
    });
    const data = response.data.choices[0].text;
    console.log("Summary, ", data);
    return data;
}
const summaryPrompt = (story) => {
    return `"${story}". Summarize this in a brief 1-2 sentences: `;
};
const generate = (prompt, summary) => {
    return summary
        ? `"${summary}" Generate/continue an imaginative story video transcript based on this prompt. For each paragraph, create a text to photo generation prompt to create photorealistic images alongside the story (in square brackets) ex: [A photo of ] Make sure to not use any character names, but make sure the photos have context for the setting of the story. The more descriptive, the better.`
        : `"${prompt}" Generate/continue an imaginative story video transcript based on this prompt. For each paragraph, create a text to photo generation prompt to create photorealistic images alongside the story (in square brackets) ex: [A photo of ] Make sure to not use any character names, but make sure the photos have context for the setting of the story. The more descriptive, the better.`;
};

function extractBracketedStrings(input) {
    let output = [];
    let startIndex = -1;
    let endIndex = -1;
    let isOpenBracket = false;
    for (let i = 0; i < input.length; i++) {
        if (input[i] === "[") {
            startIndex = i;
            isOpenBracket = true;
        } else if (input[i] === "]") {
            endIndex = i;
            isOpenBracket = false;
            output.push(input.substring(startIndex + 1, endIndex));
            input =
                input.substring(0, startIndex) + input.substring(endIndex + 1);
            i -= endIndex - startIndex + 1;
            startIndex = -1;
            endIndex = -1;
        }
    }
    return { imagePrompts: output, text: input };
}

export async function generateTitle(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `"${prompt}" A single 3-4 word clickbait title/hook for a youtube thumbnail based on this:`,
        temperature: 0.6,
        max_tokens: 256,
    });

    return response.data.choices[0].text;
}