import { Plugin } from "obsidian"
import CardGenerator from "./CardGenerator"
import { Settings, SettingsTab } from "./Settings";

export default class FCGPlugin extends Plugin {

    private cardGenerator: CardGenerator;
    public settings: Settings;

    async onload(): Promise<void> {
        await this.loadPluginData();

        this.addSettingTab(new SettingsTab(this.app, this))

        this.app.workspace.onLayoutReady(async () => {
            this.cardGenerator = new CardGenerator(this.settings);
        })
    }

    async loadPluginData(): Promise<any> {
        const loadedData = await this.loadData();
        this.settings = Object.assign({}, loadedData);
    }

    async saveSettings(): Promise<void> {
        console.log("saving: " + this.settings)
        await this.saveData(this.settings);
    }
}
