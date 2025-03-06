
import { Plugin } from "obsidian"
import CardGenerator from "./CardGenerator"
import Settings from "./Settings";

export default class FCGPlugin extends Plugin {

    private cardGenerator: CardGenerator;
    public settings: any;

    async onload(): Promise<void> {
        console.log("Plugin Loading")
        this.cardGenerator = new CardGenerator();

        this.addSettingTab(new Settings(this.app, this))
    }

    async loadData(): Promise<any> {
        this.settings = Object.assign({}, await this.loadData())
    }

    async onunload(): Promise<void> {
        console.log("Todo build the application!")
    }

}
