import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatOllama } from '@langchain/ollama'
import { TFile } from "obsidian";
import { Settings } from "./Settings";
import { z } from "zod";

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful teach assistant that created flashcards, based on markdown content",
    ],
    [
        "human",
        "Based on this markdown content {markdown_content}, generate a few flashcards about the most important content in that document."
    ],
]);

const cardsSchema = z.object({
    flashcards: z.array(z.object({
        question: z.string().describe("Question for a flashcard"),
        answer: z.string().describe("Answer for a flashcard"),
        reference: z.string().describe("Reference to the source material for a flashcard")
    }))
}).describe("Flashcards for the user")

type Cards = z.infer<typeof cardsSchema>

export default class CardGenerator {

    private llm: ChatOllama;

    constructor(settings: Settings) {
        this.llm = new ChatOllama({
            model: settings.model, temperature: 0
        })
    }

    public async test() {
        const joke = z.object({
            setup: z.string().describe("The setup of the joke"),
            punchline: z.string().describe("The punchline to the joke"),
            rating: z.number().optional().describe("How funny the joke is, from 1 to 10"),
        });

        const structuredLlm = this.llm.withStructuredOutput(joke);

        const output = await structuredLlm.invoke("Tell me a joke about cats");
        console.log(output)
    }

    public async generateCards(content: string): Promise<Cards> {
        const structured = this.llm.withStructuredOutput(cardsSchema)
        const chain = prompt.pipe(structured)
        return await chain.invoke({ markdown_content: content });
    }
}

