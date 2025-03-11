import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatOllama } from '@langchain/ollama'
import { Settings } from "./Settings";

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful teach assistant that created flashcards, based on markdown content",
    ],
    ["human", "Based on this markdown content {markdown_content}, generate a few flashcards about the most important content in that document."],
]);

export default class CardGenerator {

    private llm: ChatOllama;

    constructor(settings: Settings) {
        this.llm = new ChatOllama({
            model: settings.model
        })
    }

    public async test() {
        console.log("test")
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "You are a helpful assistant that translates {input_language} to {output_language}.",
            ],
            ["human", "{input}"],
        ]);

        const chain = prompt.pipe(this.llm);
        const message = await chain.invoke({
            input_language: "English",
            output_language: "German",
            input: "I love programming.",
        });

        console.log(message)
    }


    public async generateCards(): Promise<void> {
        const chain = prompt.pipe(this.llm);
        const output = await chain.invoke({
            markdown_content: "content"
        })

        console.log(output.content)
    }

}
