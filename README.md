# auto-cli

A command line interface (CLI) to create short AI generated story videos.

# Usage

To create a short AI generated story video, first configure .env in the project directory that contains OPENAI_API_KEY. It uses Amazon Polly by default, but has code for Microsoft Azure Text-to-Speech as well (see src/text-to-speech.js). For Amazon Polly, you need to have the AWS cli installed and configured.

You can also use your own TTS service by modifying the code.

Then run the following command in the project directory:

```
node src/index.js -p "<Enter prompt>" -o "<Enter output.mp4>"
```

# Options

-p: The prompt for the AI to use as inspiration for the story.<br>
-o: The name and location for the output video file.

# Examples

Create a short AI generated story video using the prompt "A day in the life of a superhero":

```
node src/index.js -p "A day in the life of a superhero" -o "superhero.mp4"
```

Create a short AI generated story video using the prompt "A romantic dinner for two on a beach":

```
auto-cli -p "A romantic dinner for two on a beach" -o "beach-dinner.mp4"
```
