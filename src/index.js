#! /usr/bin/env node

import { Command } from "commander";
import getStory, { generateTitle } from "./gpt.js";
import generateImages, { generateImage, downloadImage } from "./image.js";
import polly from "./polly.js";
import generateSpeech from "./text-to-speech.js";
import generateThumbnail from "./thumbnailText.js";
import generateVideo from "./video.js";

const program = new Command();
program
    .option("-p, --prompt <prompt>", "Story prompt")
    .option("-o, --output, <output>", "Output file")
    .option("-n, --number, <number>", "Number of generations");

program.parse(process.argv);

const options = program.opts();
const main = async () => {
    // console.log("Generating story...");
    // const story = await getStory(options.prompt, options.number ?? 1);
    // console.log(story.text);
    // console.log("Generating images...");
    // await generateImages(story.imagePrompts);
    // console.log("Generating speech...");
    // await polly(story.text, options.output);

    // const title = await generateTitle("a story about a gnome");
    // await generateThumbnail(title.toUpperCase().replace(/\"/g, ""));

    await generateVideo(options.output);
};
main();