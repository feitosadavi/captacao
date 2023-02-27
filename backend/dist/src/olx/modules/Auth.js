"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.authOptions = void 0;
async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.authOptions = {
    'olx': {
        url: 'https://conta.olx.com.br/acesso',
        email: 'powerfulveiculosdf@gmail.com',
        password: 'Power-1414'
    },
    'webmotors': {
        // url: 'capitalveiculos07@gmail.com',
        // password: '40028922dD$'
        email: 'davifeitosa.trab@gmail.com',
        phone: '61992258925',
        name: 'Davi Feitosa'
    }
};
class EmailAndPasswordStrategy {
    constructor(page) {
        this.page = page;
    }
    async authenticateWithEmailAndPassword(target) {
        try {
            const { url, email, password } = exports.authOptions[target];
            await this.page.goto(url, { waitUntil: 'commit' });
            await this.page.type("input[type='email']", email);
            await this.page.type("input[type='password']", password);
            await this.page.getByText(/^Entrar$/).click();
            await delay(1500);
            // Save signed-in state to 'storageState.json'.
            // await this.page.context().storageState({ path: './storageState.json' });
        }
        catch (error) {
            console.log('JÁ ESTÁ AUTENTICADO');
        }
    }
}
class Auth extends EmailAndPasswordStrategy {
    super(page) {
        this.super(page);
    }
}
exports.Auth = Auth;
