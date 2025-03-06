
import { Plugin } from "obsidian"
import CardGenerator from "./CardGenerator"

export default class FCGPlugin extends Plugin {


    private cardGenerator: CardGenerator;


    async onload(): Promise<void> {
        console.log("Plugin Loading")
        this.cardGenerator = new CardGenerator();
    }

    async onunload(): Promise<void> {
        console.log("Todo build the application!")
    }

}
