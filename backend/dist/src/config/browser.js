"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browser = void 0;
const test_1 = require("@playwright/test");
class Browser {
    constructor() {
        this.browser = test_1.chromium.launch({ headless: false });
    }
    async getBrowser() {
        if (this.browser instanceof Promise) {
            this.browser = await this.browser;
        }
        return this.browser;
    }
}
const browser = new Browser();
exports.browser = browser;
