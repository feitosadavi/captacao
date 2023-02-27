"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBrowser = void 0;
const test_1 = require("@playwright/test");
const path_1 = __importDefault(require("path"));
const Auth_1 = require("../olx/modules/Auth");
async function initBrowser(options) {
    return new Promise(async (resolve, reject) => {
        try {
            const storageStatePath = path_1.default.resolve(__dirname, './storageState.json');
            const browser = await test_1.chromium.launch({ headless: false });
            const width = options?.viewport?.width ?? 500;
            const height = options?.viewport?.height ?? 1200;
            const ctx = await browser.newContext({ viewport: { width, height }, storageState: storageStatePath });
            const page = await ctx.newPage();
            if (options?.auth) {
                const auth = new Auth_1.Auth(page);
                await auth.authenticateWithEmailAndPassword(options.target);
                // Save signed-in state to 'storageState.json'.
                await page.context().storageState({ path: storageStatePath });
            }
            resolve(page);
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.initBrowser = initBrowser;
