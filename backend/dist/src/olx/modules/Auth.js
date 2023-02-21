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
exports.Auth = void 0;
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
class EmailAndPasswordStrategy {
    constructor(page) {
        this.page = page;
    }
    authenticateWithEmailAndPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.page.goto('https://conta.olx.com.br/acesso', { waitUntil: 'commit' });
                yield this.page.type("input[type='email']", 'capitalveiculos07@gmail.com');
                yield this.page.type("input[type='password']", 'CV204060');
                yield this.page.getByText(/^Entrar$/).click();
                yield delay(1500);
                // Save signed-in state to 'storageState.json'.
                // await this.page.context().storageState({ path: './storageState.json' });
            }
            catch (error) {
                console.log('JÁ ESTÁ AUTENTICADO');
            }
        });
    }
}
class Auth extends EmailAndPasswordStrategy {
    super(page) {
        this.super(page);
    }
}
exports.Auth = Auth;
