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
exports.browser = void 0;
const test_1 = require("@playwright/test");
class Browser {
    constructor() {
        this.browser = test_1.chromium.launch({ headless: false });
    }
    getBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser instanceof Promise) {
                this.browser = yield this.browser;
            }
            return this.browser;
        });
    }
}
const browser = new Browser();
exports.browser = browser;