import { ChatPromptTemplate } from "@langchain/core/prompts"
import { ChatOllama } from '@langchain/ollama'

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        "You are a helpful teach assistant that created flashcards, based on markdown content",
    ],
    ["human", "Based on this markdown content {markdown_content}, generate a few flashcards about the most important content in that document."],
]);

export default class CardGenerator {

    private llm: ChatOllama;

    constructor() {
        // make this configurable so that you can use a larger number of models depending on preference.
        this.llm = new ChatOllama({
            model: "llama3.1"
        })
    }


    public async generateCards(): Promise<void> {
        const chain = prompt.pipe(this.llm);
        const output = await chain.invoke({
            markdown_content: "content"
        })

        console.log(output.content)
    }

}
