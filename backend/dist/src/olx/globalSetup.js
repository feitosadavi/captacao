"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// global-setup.ts
const test_1 = require("@playwright/test");
function globalSetup(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield test_1.chromium.launch();
        const page = yield browser.newPage();
        yield page.goto('https://conta.olx.com.br/acesso');
        yield page.getByLabel('Email').fill('capitalveiculos07@gmail.com');
        yield page.getByLabel('Senha').fill('CV204060');
        yield page.getByText('Entrar').click();
        // Save signed-in state to 'storageState.json'.
        yield page.context().storageState({ path: 'storageState.json' });
        yield browser.close();
    });
}
exports.default = globalSetup;
