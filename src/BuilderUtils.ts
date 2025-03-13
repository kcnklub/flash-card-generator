import { Cards } from "./CardGenerator"

export function buildFile(cards: Cards): string {
    var newFileContent = ""

    // This is the default setting for spaced reps plugin. 
    newFileContent += "#flashcards\n"

    for (const card of cards.flashcards) {
        newFileContent += card.question
        newFileContent += "::"
        newFileContent += card.answer
        newFileContent += "\n\n"
    }

    console.log(newFileContent);

    return newFileContent;
}

export function createFlashCardFilePath(path: string): string {
    return path.replace(".md", "-flashcards.md");
}
