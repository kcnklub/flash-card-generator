import { ItemView, Plugin, TFile, WorkspaceLeaf } from "obsidian"
import { CardGenerator } from "./CardGenerator"
import { buildFile, createFlashCardFilePath } from "./BuilderUtils";
import { Settings, SettingsTab } from "./ui/Settings";
import { ExampleView, MAIN_VIEW_PANEL } from "./ui/PanelView";

export default class FCGPlugin extends Plugin {

    public cardGenerator: CardGenerator;
    public settings: Settings;

    async onload(): Promise<void> {
        this.registerView(
            MAIN_VIEW_PANEL,
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
        const leaves = workspace.getLeavesOfType(MAIN_VIEW_PANEL);

        if (leaves.length > 0) {
            // A leaf with our view already exists, use that
            leaf = leaves[0];
        } else {
            // Our view could not be found in the workspace, create a new leaf
            // in the right sidebar for it
            leaf = workspace.getRightLeaf(false);
            await leaf.setViewState({ type: MAIN_VIEW_PANEL, active: true });
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

    async makeFlashCard(f: TFile) {
        const noteContent = await f.vault.read(f)
        const cards = await this.cardGenerator.generateCards(noteContent)

        const content = buildFile(cards)
        const newFileName = createFlashCardFilePath(f.path)

        await f.vault.create(newFileName, content)
    }
}
