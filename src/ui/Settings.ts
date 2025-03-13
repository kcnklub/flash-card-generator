import { App, PluginSettingTab, Setting } from "obsidian"
import ollama from "ollama";

import FCGPlugin from "./main";

export interface Settings {
    model: string;
}

export class SettingsTab extends PluginSettingTab {

    private plugin: FCGPlugin;

    constructor(app: App, plugin: FCGPlugin) {
        super(app, plugin)
        this.plugin = plugin
    }

    display(): void {
        let { containerEl } = this;

        containerEl.empty()

        containerEl.createEl("h4", {
            text: "Flash Card Generator",
        });

        new Setting(containerEl)
            .setName('Model')
            .setDesc('Select which model that you would like to use.')
            .addDropdown(async (dropDown) => {
                let models = await ollama.list()
                for (const m of models.models) {
                    dropDown.addOption(m.name, m.model)
                }
                dropDown.onChange(async (v) => {
                    this.plugin.settings.model = v
                    await this.plugin.saveSettings()
                })
            })
    }
}
