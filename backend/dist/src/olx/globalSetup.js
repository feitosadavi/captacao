"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// global-setup.ts
const test_1 = require("@playwright/test");
async function globalSetup(config) {
    const browser = await test_1.chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://conta.olx.com.br/acesso');
    await page.getByLabel('Email').fill('capitalveiculos07@gmail.com');
    await page.getByLabel('Senha').fill('CV204060');
    await page.getByText('Entrar').click();
    // Save signed-in state to 'storageState.json'.
    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}
exports.default = globalSetup;
