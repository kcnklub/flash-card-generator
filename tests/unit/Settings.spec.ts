import test, { describe } from "node:test";
import Settings from "src/Settings";


describe("Settings tests", () => {

    test("Creating a settings class", () => {
        const settings = new Settings(undefined, undefined);
        settings.display();
    })

})
