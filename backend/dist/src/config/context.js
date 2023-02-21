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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBrowser = void 0;
const test_1 = require("@playwright/test");
const path_1 = __importDefault(require("path"));
const Auth_1 = require("../olx/modules/Auth");
function initBrowser(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const storageStatePath = path_1.default.resolve(__dirname, './storageState.json');
                const browser = yield test_1.chromium.launch({ headless: false });
                const width = (_b = (_a = options === null || options === void 0 ? void 0 : options.viewport) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 500;
                const height = (_d = (_c = options === null || options === void 0 ? void 0 : options.viewport) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 1200;
                const ctx = yield browser.newContext({ viewport: { width, height }, storageState: storageStatePath });
                const page = yield ctx.newPage();
                if (options === null || options === void 0 ? void 0 : options.auth) {
                    const auth = new Auth_1.Auth(page);
                    yield auth.authenticateWithEmailAndPassword();
                    // Save signed-in state to 'storageState.json'.
                    yield page.context().storageState({ path: storageStatePath });
                }
                resolve(page);
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.initBrowser = initBrowser;
