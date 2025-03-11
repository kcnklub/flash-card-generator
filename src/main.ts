import { ItemView, Plugin, WorkspaceLeaf } from "obsidian"
import CardGenerator from "./CardGenerator"
import { Settings, SettingsTab } from "./Settings";


export default class FCGPlugin extends Plugin {

    private cardGenerator: CardGenerator;
    public settings: Settings;

    async onload(): Promise<void> {
        this.registerView(
            VIEW_TYPE_EXAMPLE,
            (leaf) => new ExampleView(leaf, this)
        );

        this.addRibbonIcon('dice', 'Activate view', () => {
            this.activateView();
        });

        await this.loadPluginData();

        this.addSettingTab(new SettingsTab(this.app, this))

        this.app.workspace.onLayoutReady(async () => {
            this.cardGenerator = new CardGenerator(this.settings);
        })
    }

    async activateView() {
        const { workspace } = this.app;

        let leaf: WorkspaceLeaf | null = null;
        const leaves = workspace.getLeavesOfType(VIEW_TYPE_EXAMPLE);

        if (leaves.length > 0) {
            // A leaf with our view already exists, use that
            leaf = leaves[0];
        } else {
            // Our view could not be found in the workspace, create a new leaf
            // in the right sidebar for it
            leaf = workspace.getRightLeaf(false);
            await leaf.setViewState({ type: VIEW_TYPE_EXAMPLE, active: true });
        }

        // "Reveal" the leaf in case it is in a collapsed sidebar
        workspace.revealLeaf(leaf);
    }

    async loadPluginData(): Promise<any> {
        const loadedData = await this.loadData();
        this.settings = Object.assign({}, loadedData);
    }

    async saveSettings(): Promise<void> {
        await this.saveData(this.settings);
    }


}

const VIEW_TYPE_EXAMPLE = 'example-view';


class ExampleView extends ItemView {

    private plugin: FCGPlugin;

    constructor(leaf: WorkspaceLeaf, plugin: FCGPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return VIEW_TYPE_EXAMPLE;
    }

    getDisplayText() {
        return 'Example view';
    }

    async onOpen() {
        const container = this.containerEl.children[1];
        container.empty();
        const header = container.createEl('h4', { text: 'Example view' });
        header.addEventListener("click", () => {
            console.log("you clicked the listener")
        })

        const files = this.plugin.app.vault.getMarkdownFiles();
        for (const f of files) {
            container.createEl("p", { "text": f.name })
        }
    }

    async onClose() {
        // Nothing to clean up.
    }
}
