import { createCanvas, loadImage } from "canvas";
import fs from "fs";

export default function generateThumbnail(text) {
    const canvas = createCanvas(1280, 720);
    const ctx = canvas.getContext("2d");

    // Write "Awesome!"

    // Draw line under text

    // Draw cat with lime helmet
    loadImage("/workspaces/ai-video-generator/src/thumbnail.png").then((image) => {
        ctx.drawImage(image, 0, 128, 512, 218, 0, 0, 1280, 720);
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.lineWidth = 3;
        ctx.font = "bold 80px Ubuntu";
        ctx.fillText(text, 6, 64);
        ctx.strokeText(text, 6, 64);
        ctx.stroke();
    });

    const out = fs.createWriteStream("/workspaces/ai-video-generator/src/finalThumbnail.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
}