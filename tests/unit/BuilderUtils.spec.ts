import { buildFile, createFlashCardFilePath } from "src/BuilderUtils"
import { Cards } from "src/CardGenerator"

test("input empty list", () => {
    const input: Cards = {
        flashcards: []
    }

    const output = buildFile(input);

    expect(output).toBe("#flashcards\n")
})

test("singleton list of cards", () => {
    const input: Cards = {
        flashcards: [
            { question: "question", answer: "answer" }
        ]
    }

    const output = buildFile(input);

    expect(output).toBe("#flashcards\nquestion::answer\n\n")
})


test("Multiple cards list of cards", () => {
    const input: Cards = {
        flashcards: [
            { question: "question", answer: "answer" },
            { question: "question1", answer: "answer1" }
        ]
    }

    const output = buildFile(input);

    expect(output).toBe("#flashcards\nquestion::answer\n\nquestion1::answer1\n\n")
})

test("Generate flash card file name", () => {
    const input = "note.md"

    expect(createFlashCardFilePath(input))
        .toBe("note-flashcards.md")
})
