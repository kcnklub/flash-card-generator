import { ItemView, WorkspaceLeaf } from "obsidian";
import FCGPlugin from "src/main";

export const MAIN_VIEW_PANEL = 'main-view-panel';

export class ExampleView extends ItemView {

    private plugin: FCGPlugin;

    constructor(leaf: WorkspaceLeaf, plugin: FCGPlugin) {
        super(leaf);
        this.plugin = plugin;
    }

    getViewType() {
        return MAIN_VIEW_PANEL;
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
            this.plugin.cardGenerator.test()
        })

        const files = this.plugin.app.vault.getMarkdownFiles();
        for (const f of files) {
            const fileContainer = container.createDiv();
            fileContainer.createEl("p", { "text": f.name })
            const generator = fileContainer.createEl("button", { "text": ">Gen<" })
            generator.addEventListener("click", async () => {
                this.plugin.makeFlashCard(f)
            })

            const deletor = fileContainer.createEl("button", { "text": ">Delete<" })
            deletor.addEventListener("click", async () => {
                // TODO delete the flash card file is it exists
                const newFileName = f.path.replace(".md", "-flashcards.md");

                const flashCardFile = f.vault.getFileByPath(newFileName);

                if (flashCardFile) {
                    await f.vault.delete(flashCardFile, true)
                }
            })
        }
    }

    async onClose() {
        // Nothing to clean up.
    }
}
